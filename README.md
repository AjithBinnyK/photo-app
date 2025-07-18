# 📸 Photo App

A simple, fast, and serverless photo-sharing app built with **React + Vite**, hosted on **Amazon S3** and delivered via **CloudFront**. Automatically deployed using **GitHub Actions**.

🟢 Live Demo: [https://www.ajithbinny.com/photo-app/](https://www.ajithbinny.com/photo-app/)

---

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Hosting**: AWS S3 (Static Website Hosting)
- **CDN**: AWS CloudFront
- **CI/CD**: GitHub Actions
- **Build Tool**: Vite
- **Storage**: S3 (`ajith-photo-app` bucket under `/photo-app/` prefix)

---


## 🔨 Build & Deploy

### 🔧 Local Development
- npm install
- npm run dev
### 🏗 Production Build
- npm run build
- Output goes to the dist/ folder with relative paths (configured via base: './' in vite.config.js).

  
---


## 📦 Deployment (CI/CD via GitHub Actions)
This app is automatically deployed to:

- S3 bucket: ajith-photo-app

- Path: /photo-app/

- CDN: CloudFront distribution for https://www.ajithbinny.com/photo-app/

---


## ⚙️ Deployment Trigger
Pushes to the main branch trigger:

- React build via Vite

- Sync to S3 under photo-app/

- CloudFront cache invalidation for /photo-app/*


---


## 🔐 Required GitHub Secrets
- **AWS_ACCESS_KEY_ID**	From IAM user with S3 + CloudFront permissions
  
- **AWS_SECRET_ACCESS_KEY**	IAM secret access key
  
- **CLOUDFRONT_DISTRIBUTION_ID**	ID of your CloudFront distribution


---


## 📄 License
This project is licensed under the [MIT License](LICENSE).
