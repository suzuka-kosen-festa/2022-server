variable "region" {
  type = string
}

resource "google_artifact_registry_repository" "my-repo" {
  location      = vars.region
  repository_id = "my-repository"
  description   = "server docker repository"
  format        = "DOCKER"
}