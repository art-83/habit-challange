# Deploy simples com OpenTofu (DigitalOcean)

Este setup cria uma VM (Droplet) na DigitalOcean, instala Docker + Compose e sobe seu app com o docker-compose que já existe no repositório.

Requisitos:
- Conta na DigitalOcean e um token de API (da empresa do teste)
- Uma chave SSH (par público/privado) na sua máquina
- OpenTofu instalado (comando `tofu`)

## Variáveis necessárias
- do_token: token da DigitalOcean (sensível)
- ssh_public_key: conteúdo da sua chave pública (ex: `~/.ssh/id_rsa.pub`)
- ssh_private_key_path: caminho da sua chave privada (ex: `~/.ssh/id_rsa`)
- git_repo_url: URL do repositório Git deste projeto (https)
- git_branch: Branch a ser usado (padrão: `main`)

## Como usar

1) Exporte as variáveis (ajuste caminhos/URL):

```bash
export TF_VAR_do_token="SEU_TOKEN_DO"
export TF_VAR_ssh_public_key="$(cat ~/.ssh/id_rsa.pub)"
export TF_VAR_ssh_private_key_path="$HOME/.ssh/id_rsa"
export TF_VAR_git_repo_url="https://github.com/sua-org/selective-habit.git"
export TF_VAR_git_branch="main"
```

2) Rode o OpenTofu:

```bash
cd infra/opentofu
(tofu init || true)
tofu apply -auto-approve
```

3) No final, veja o IP de saída e acesse:
- Frontend: `http://SEU_IP:5173`
- API: `http://SEU_IP:3000`

Notas:
- Os `.env` do backend e frontend são escritos no servidor com os endereços certos (CORS e VITE_API_URL) e o `docker compose up -d --build` é executado.
- Setup mínimo, sem firewall/volumes. Produção real exige hardening (firewall, backup, logs, etc.).
