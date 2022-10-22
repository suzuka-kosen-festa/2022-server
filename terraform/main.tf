provider "google" {
  project     = var.project_id
  credentials = file("./gcp_key.json")
}

provider "google-beta" {
  project     = var.project_id
  credentials = file("./gcp_key.json")
}

module "registory" {
  source = "./modules/registry"
  region = var.region
}

module "db" {
  source = "./modules/db"
  region = var.region
  db_name = var.db_name
  user_password = var.user_password
}

module "cloudruns" {
  source = "./modules/cloudrun"
  region = var.region
  database_url = var.database_url
}

module "cloudbuild" {
  source = "./modules/cloudbuild"
  region = var.region
}