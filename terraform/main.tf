provider "google" {
  project     = "kosen-festa-server"
  credentials = file("./gcp_key.json")
  zone    = "us-central1-c"
}