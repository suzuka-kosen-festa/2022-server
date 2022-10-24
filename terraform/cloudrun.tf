resource "google_cloud_run_service" "default" {
  name     = "server"
  location = var.region

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "3"
        "autoscaling.knative.dev/minScale"      = "1"
        "run.googleapis.com/cpu-throttling"     = false
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.database.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }

    spec {
      containers {
        image = "us-west1-docker.pkg.dev/kosen-festa-server/my-repository/server-image"
        resources {
          limits = { "memory" : "0.5Gi", "cpu" : "1" }
        }

        ports {
          container_port = "7000"
        }

        env {
          name  = "DB_NAME"
          value = google_sql_database.mydb.name
        }
        env {
          name  = "DB_USER"
          value = google_sql_user.users.name
        }
        env {
          name  = "DB_PASS"
          value = google_sql_user.users.password
        }

        env {
          name  = "INSTANCE_UNIX_SOCKET"
          value = "/cloudsql/kosen-festa-server:us-west1:main"
        }

        env {
          name  = "INSTANCE_CONNECTION_NAME"
          value = "kosen-festa-server:us-west1:main"
        }

        env {
          name = "JWT_SEACRET_KEY"
          value = var.jwt_seacret_key
        }

        env {
          name = "PASSWORD"
          value = var.password
        }
        env {
          name  = "DATABASE_URL"
          value = var.database_url
        }
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.default.location
  project     = google_cloud_run_service.default.project
  service     = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
