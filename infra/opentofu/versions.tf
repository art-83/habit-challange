terraform {
  required_version = ">= 1.6.0"
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = ">= 2.39.2"
    }
    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = ">= 2.3.4"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}