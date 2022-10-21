resource "google_cloud_run_service" "default" {
  name     = "server"
  location = "us-west1"

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "3"
        "autoscaling.knative.dev/minScale" = "1"
        # If true, garbage-collect CPU when once a request finishes
        # https://cloud.google.com/run/docs/configuring/cpu-allocation
        "run.googleapis.com/cpu-throttling" = false
      }
    }

    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
        resources {
          limits = { "memory" : "0.5Gi", "cpu": "1" }
        }

        ports {
          container_port = "7000"
        }
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_artifact_registry_repository" "my-repo" {
  location      = "us-west1"
  repository_id = "my-repository"
  description   = "server docker repository"
  format        = "DOCKER"
}

resource "google_sql_database_instance" "postgres" {
  name             = "maindatabase"
  database_version = "POSTGRES_14"
  region           = "us-west1"

  settings {
    tier = "db-custom-1-3840"
    disk_size = 10
    disk_type = "PD_HDD"

    backup_configuration {
      enabled = true
      start_time = "15:00"
      point_in_time_recovery_enabled = true
    }
  }
}

resource "google_cloudbuild_worker_pool" "pool" {
  name = "my-pool"
  location = "us-west1"
  worker_config {
    machine_type = "e2-standard-2"
  }
}

resource "google_cloudbuild_trigger" "include-build-logs-trigger" {
  location = "us-west1"
  name     = "include-build-logs-trigger"
  filename = "cloudbuild.yaml"

  github {
    owner = "hashicorp"
    name  = "terraform-provider-google-beta"
    push {
      branch = "^main$"
    }
  }

  include_build_logs = "INCLUDE_BUILD_LOGS_WITH_STATUS"
}