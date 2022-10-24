provider "google" {
  project     = var.project_id
  credentials = file("./gcp_key.json")
}

provider "google-beta" {
  project     = var.project_id
  credentials = file("./gcp_key.json")
}