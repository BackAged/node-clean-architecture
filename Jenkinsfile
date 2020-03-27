slackResponse = null
appName = "user"

pipeline {
  agent any

  environment {
    GIT_COMMIT_MESSAGE = """${sh(
              returnStdout: true,
              script: "git --no-pager show -s --format='%s' ${GIT_COMMIT}"
        )}"""
  }

  stages {

    stage("Initial Notification") {
      agent { node { label "master" } }

      steps {
        script {
          env.ecrURL = "094697208586.dkr.ecr.ap-southeast-1.amazonaws.com"
          env.imageRepoURL = "${env.ecrURL}/user"
          env.tag = "latest"
          env.applicationType = "B2C"

          if (env.GIT_BRANCH == "origin/dev") {
              env.tag = "dev"
              env.applicationType = "Development"
          }

          slackResponse = slackSend(channel: "jenkins-update", message: "${appName} ${env.applicationType}: Commit info - ${env.GIT_COMMIT_MESSAGE}")
        }
      }
    }

    stage("Building image") {
      agent { node { label "master" } }
      steps {
        sh "docker build -t ${env.imageRepoURL}:${env.tag} ."
        sh 'echo "Build successful."'
      }
    }

    stage("Build Successful Notification") {
      agent { node { label "master" } }
      steps {
        script {
          slackSend(channel: slackResponse.threadId, message: "${appName} ${env.applicationType}: Build successful. Trying to publishing image.")
        }
      }
    }

    stage("Publish Image") {
      agent { node { label 'master' } }
      steps {
        script {
          docker.withRegistry("https://${env.ecrURL}", "ecr:ap-southeast-1:AWS_CREDENTIAL") {
            docker.image("${env.imageRepoURL}:${env.tag}").push()
          }

          slackSend(channel: slackResponse.threadId, message: "${appName} ${env.applicationType}: Published successfully.")
          sh "docker rmi -f \$(docker images ${env.imageRepoURL}:${env.tag} -a -q)"
        }
      }
    }

    stage("Update Services") {
      agent { node { label 'master' } }

      steps {
        script {
          if (env.GIT_BRANCH == "origin/master") {
              sh 'aws ecs update-service --cli-input-json file://update-service.json'
          }
        }
        
        slackSend(channel: slackResponse.threadId, message: "${appName} ${env.applicationType}: System will be updated shortly.")
      }
    }

  }

  post {
    failure {
      slackSend(channel: slackResponse.threadId, message: "${appName} ${env.applicationType}: Operation failed.")
    }
  }
}
