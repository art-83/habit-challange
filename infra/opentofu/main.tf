locals {
  droplet_name = "selective-habit-app"
}

resource "digitalocean_ssh_key" "deployer" {
  name       = "selective-habit-deployer"
  public_key = var.ssh_public_key
}

# cloud-init script
data "template_cloudinit_config" "user_data" {
  gzip          = false
  base64_encode = false

  part {
    filename     = "init.cfg"
    content_type = "text/cloud-config"
    content      = <<-EOT
#cloud-config
package_update: true
packages:
  - git
  - ca-certificates
runcmd:
  - |
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y
    apt-get install -y docker.io docker-compose-plugin
  - usermod -aG docker root
  - mkdir -p /opt/app
  - cd /opt/app
  - git clone --branch ${var.git_branch} ${var.git_repo_url} repo
  - cd repo
  - PUBLIC_IP=$(curl -s ifconfig.me)
  - echo "VITE_API_URL=http://$PUBLIC_IP:3000" > .env || true
  - echo "API_PORT=3000" >> .env
  - echo "PG_HOST=database" >> .env
  - echo "PG_USERNAME=postgres" >> .env
  - echo "PG_PASSWORD=123456789" >> .env
  - echo "PG_DATASOURCE=habit_names_db" >> .env
  - echo "FRONTEND_URL=http://$PUBLIC_IP:5173" >> .env
  - cp .env backend/.env
  - cp .env frontend/.env
  - docker compose -f docker-compose.yml -f backend/docker-compose.yml -f frontend/docker-compose.yml up -d --build
    EOT
  }
}

resource "digitalocean_droplet" "app" {
  name     = local.droplet_name
  region   = var.region
  size     = var.size
  image    = "ubuntu-22-04-x64"
  ssh_keys = [digitalocean_ssh_key.deployer.fingerprint]

  user_data = data.template_cloudinit_config.user_data.rendered

  lifecycle {
    create_before_destroy = true
  }
}

output "droplet_ip" {
  description = "IP público do droplet"
  value       = digitalocean_droplet.app.ipv4_address
}
