pipeline {
    agent {
        label 'MAVENBUILDER'
    }

    options {
        timeout(time: 10, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    parameters {
        string(name: 'BUILD_LABEL', defaultValue: 'dev', description: 'Label for this build')
    }

    environment {
        APP_NAME = 'jenkins-lab3-app'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Building ${env.APP_NAME} with label ${params.BUILD_LABEL}"
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'ls -la dist/'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Pipeline finished with status: ${currentBuild.currentResult}"
        }
        success {
            echo "✅ Build succeeded for label ${params.BUILD_LABEL}"
        }
        failure {
            echo "❌ Build failed — check the logs above"
        }
    }
}