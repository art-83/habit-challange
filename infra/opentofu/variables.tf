variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "Conteúdo da chave pública SSH"
  type        = string
}

variable "ssh_private_key_path" {
  description = "Caminho da chave privada SSH local"
  type        = string
}

variable "region" {
  description = "Região do Droplet"
  type        = string
  default     = "nyc3"
}

variable "size" {
  description = "Tamanho do Droplet"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "git_repo_url" {
  description = "URL do repositório Git"
  type        = string
}

variable "git_branch" {
  description = "Branch do repositório"
  type        = string
  default     = "main"
}
