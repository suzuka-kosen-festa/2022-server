resource "google_sql_database_instance" "database" {
  name             = "main-instance"
  database_version = "POSTGRES_14"
  region           = var.region

  settings {
    tier      = "db-custom-1-3840"
    disk_size = 10
    disk_type = "PD_HDD"

    backup_configuration {
      enabled                        = true
      start_time                     = "15:00"
      point_in_time_recovery_enabled = true
    }
  }
}

resource "google_sql_database" "mydb" {
  name     = var.db_name
  instance = google_sql_database_instance.database.name
}

resource "google_sql_user" "users" {
  name     = "user"
  password = var.user_password
  instance = google_sql_database_instance.database.name
}