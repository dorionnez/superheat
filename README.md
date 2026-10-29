# 🎸 Superheat - Site Oficial

Site oficial da banda paulista **Superheat** (Punk Rock com Saxofone).  
Reconstruído com código moderno, responsivo, performático e independente (sem as limitações do construtor de sites antigo).

---

## ⚡ Estrutura do Projeto

```
superheat/
├── index.html              # Página principal completa (Hero, Sobre, Agenda, Clipes, Singles, Flyers, Rider, Contato)
├── about.html              # Redirecionamento amigável para #sobre (compatibilidade com links antigos)
├── shows-passados.html     # Redirecionamento amigável para #shows-passados
├── mapa-e-rider.html       # Redirecionamento amigável para #rider
├── .htaccess               # Configuração Apache / Hostinger (Gzip, Cache, Rotas limpas)
├── .gitignore              # Ignora arquivos de sistema e temporários
├── assets/
│   ├── css/
│   │   └── style.css       # Design System completo (Dark mode, estética punk, animações)
│   ├── js/
│   │   └── main.js         # Interações, facade de vídeos YouTube, lightbox nativo e formulário
│   ├── downloads/
│   │   ├── superheat-mapa-de-palco.pdf
│   │   └── superheat-rider-tecnico.pdf
│   └── images/
│       ├── logo_superheat_laranja.png
│       ├── banner_desktop.png
│       ├── banner_mobile.png
│       ├── band_photo_hero.png
│       ├── bandeira_superheat.png
│       ├── mapa_palco.png
│       ├── members/        # Fotos dos 5 integrantes
│       ├── flyers/         # 8 cartazes de shows passados
│       └── singles/        # Capas de singles
```

---

## 🚀 Como testar localmente

No terminal, dentro da pasta `superheat`:

```bash
# Opção 1: Usando Python
python3 -m http.server 8080

# Opção 2: Usando Node / npx
npx -y serve .
```

Acesse no navegador: `http://localhost:8080`

---

## 📦 Como subir para o GitHub

1. Crie um novo repositório no seu GitHub chamado `superheat` (pode ser público ou privado).
2. No terminal, execute os comandos:

```bash
cd /Users/brunalima/Documents/Antigravity/superheat
git add .
git commit -m "feat: site oficial superheat reconstruido"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/superheat.git
git push -u origin main
```

---

## 🌐 Como configurar o Deploy Automático na Hostinger

Para que cada `git push` atualize o site `https://superheat.com.br/` automaticamente:

1. Acesse o **hPanel da Hostinger** (`hpanel.hostinger.com`).
2. Vá em **Sites** e clique em **Gerenciar** no domínio `superheat.com.br`.
3. Na barra lateral esquerda ou na busca, procure por **Git** (fica na seção *Avançado*).
4. Em **Criar um novo repositório**:
   - **Repositório**: Cole o link do seu GitHub (ex.: `https://github.com/SEU-USUARIO/superheat.git`);
   - **Branch**: Selecione `main`;
   - **Instalar o diretório**: Deixe `public_html` (ou se for subpasta, selecione o diretório do site).
5. Clique em **Criar**.
6. A Hostinger irá clonar o site e exibirá uma **URL de Webhook** (Webhook URL).
7. Vá no seu repositório no **GitHub**:
   - Clique em **Settings** > **Webhooks** > **Add webhook**;
   - Cole a **Payload URL** que a Hostinger forneceu;
   - Content type: `application/json`;
   - Eventos: `Just the push event`;
   - Clique em **Add webhook**.

🎉 **Pronto!** A partir desse momento, qualquer alteração que você fizer e der `git push`, a Hostinger atualiza o site no ar em segundos!
