pipeline {
    agent {
        label 'MAVENBUILDER'
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        // ansiColor('xterm')
    }

    environment {
        APP_NAME = 'jenkins-lab5-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'node --version'
                sh 'npm install --no-audit --no-fund'
            }
        }

        stage('Quality Gates') {
            parallel {
                stage('Unit Tests') {
                    steps { sh 'npm run test:unit' }
                }
                stage('Integration Tests') {
                    steps { sh 'npm run test:integration' }
                }
                stage('Lint') {
                    steps { sh 'npm run lint' }
                }
            }
            post {
                always {
                    junit 'reports/*.xml'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                }
            }
        }

        stage('Approve Deploy') {
            when { branch 'lab5_claude' }
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    input message: 'Deploy to production?', ok: 'Deploy'
                }
            }
        }

        stage('Deploy') {
            when { branch 'lab5_claude' }
            steps {
                withCredentials([string(credentialsId: 'deploy-token',
                                        variable: 'DEPLOY_TOKEN')]) {
                    sh '''
                        echo "Deploying $APP_NAME..."
                        # In real life: curl -H "Authorization: Bearer $DEPLOY_TOKEN" ...
                        echo "Token length: ${#DEPLOY_TOKEN}"   # never echo $DEPLOY_TOKEN itself
                        echo "Deploy complete."
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline succeeded — branch ${env.BRANCH_NAME ?: 'lab5_claude'}, build #${env.BUILD_NUMBER}"
        }
        failure {
            echo "❌ Pipeline failed"
        }
        unstable {
            echo "⚠️  Pipeline is unstable (some tests failed)"
        }
        always {
            echo "Final status: ${currentBuild.currentResult}"
        }
    }
}