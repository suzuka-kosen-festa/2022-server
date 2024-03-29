resource "google_cloudbuild_worker_pool" "pool" {
  name     = "my-pool"
  location = "us-central1"
  worker_config {
    disk_size_gb = 100
    machine_type = "e2-standard-2"
  }
}

resource "google_cloudbuild_trigger" "include-build-logs-trigger" {
  location = "us-central1"
  name     = "container-builder"
  filename = "./terraform/cloudbuild.yaml"

  github {
    owner = "suzuka-kosen-festa"
    name  = "2022-server"
    push {
      branch = "^main$"
    }
  }

  include_build_logs = "INCLUDE_BUILD_LOGS_WITH_STATUS"
}