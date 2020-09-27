pipeline {
    environment {
        DOCKER_REGISTRY = "puuuudding/puuuudding.com-server"
        DOCKER_REGISTRY_URL = credentials("80259f3c-4355-4ea2-8e9a-5639a5ea2e18")
        DOCKER_REGISTRY_CRED = "4f030acb-c26c-4f65-9cca-ee51edeac2fd"
        DOCKER_IMAGE = ""
    }
    agent any
    stages {
        stage("Build image") {
            steps {
                script {
                    DOCKER_IMAGE = docker.build DOCKER_REGISTRY
                }
            }
        }
        stage("Deploy image") {
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY_URL, DOCKER_REGISTRY_CRED) {
                        DOCKER_IMAGE.push "latest"
                    }
                }
            }
        }
        stage("Clean up") {
            steps {
                sh "docker rmi $DOCKER_REGISTRY"
            }
        }
        stage("Update container") {
            environment {
                SSH_CRED = credentials("825d8d0b-0077-45f1-b93a-6637efc93f2d")
                HOST = credentials("e1b8c7ef-72ae-4e74-92ca-a70807588156")
            }
            steps {
                script {
                    def remote = [:]
                    remote.name = "puuuudding"
                    remote.allowAnyHosts = true
                    remote.host = HOST
                    remote.user = SSH_CRED_USR
                    remote.identityFile = SSH_CRED
                    sshCommand remote: remote, command: "cd /home/${SSH_CRED_USR}/puuuudding.com-server && git pull && docker-compose pull && docker-compose up -d --build --no-deps"
                }
            }
        }
    }
}
