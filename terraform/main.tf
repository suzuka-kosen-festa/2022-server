provider "google" {
  project     = "kosen-festa-server"
  credentials = file("./gcp_key.json")
}

provider "google-beta" {
  project     = "kosen-festa-server"
  credentials = file("./gcp_key.json")
}