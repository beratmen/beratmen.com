# Berat MEN – Personal Portfolio & Blog 🚀

A modern, secure, and responsive personal portfolio and blog website built with React, TypeScript, and Tailwind CSS.

<p align="center">
  <img src="public/preview.png" alt="Project Preview" width="80%"/>
</p>

---

## 📺 Live Demo

> 🌐 **Try it live:** [beratmen.github.io](https://beratmen.github.io)

---

## 📚 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables & Security](#-environment-variables--security)
- [💻 Development & Deployment](#-development--deployment)
- [📝 Blog System Usage](#-blog-system-usage)
- [🎨 Customization](#-customization)
- [📱 Responsive Design](#-responsive-design)
- [🛡️ Security Practices](#-security-practices)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## ✨ Features

### Portfolio
- 🎨 **Modern, Responsive Design:** Clean, mobile-first UI with dark/light mode.
- 🧩 **Sections:** About, Projects, Contact, and interactive project showcase.
- 🌀 **Smooth UX:** Smooth scrolling, subtle animations, and accessibility best practices.
- 🛡️ **Security:** Comprehensive security infrastructure ([see below](#-security-practices)).

### Blog System
- 🔑 **Admin Panel:** Secure admin authentication for blog management.
- 📝 **Markdown Support:** Write posts in Markdown with live preview.
- 💾 **Drafts & Publishing:** Save drafts, preview, and publish posts.
- 🏷️ **Categories & Tags:** Organize posts for easy navigation.
- ⏱️ **Reading Time:** Automatic or custom reading time estimation.
- 🔗 **Featured Links:** Highlight important resources per post.
- 🖼️ **Cover Images:** Add visual appeal to posts.
- 🔍 **Search:** Full-text search for posts.

---

## 🛠️ Tech Stack
- ⚛️ **Frontend:** React (TypeScript)
- 🎨 **Styling:** Tailwind CSS
- 🗺️ **Routing:** React Router
- 📄 **Markdown Rendering:** React Markdown
- 🖼️ **Icons:** React Icons
- ⚡ **Build Tool:** Vite
- 🚀 **Deployment:** GitHub Pages (with support for Netlify, Vercel)

---

## 🚀 Getting Started

### Prerequisites
- 🟢 Node.js (v14 or higher)
- 📦 npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/beratmen/beratmen.github.io.git
   cd beratmen.github.io
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
yarn dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   # or
yarn build
   ```

---

## 🔐 Environment Variables & Security

For admin blog access, create a `.env.local` file in the project root:

```env
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_secure_password
```

> ⚠️ **Important:** Never commit `.env.local` to version control. Add it to `.gitignore`.

### Deployment Environment Variables
- **Netlify:** Set variables in Site settings > Build & deploy > Environment.
- **Vercel:** Set variables in Project Settings > Environment Variables.
- **GitHub Pages:** Use GitHub Actions and repository secrets:

```yaml
jobs:
  build-and-deploy:
    steps:
      - name: Build
        env:
          VITE_ADMIN_USERNAME: ${{ secrets.VITE_ADMIN_USERNAME }}
          VITE_ADMIN_PASSWORD: ${{ secrets.VITE_ADMIN_PASSWORD }}
        run: npm run build
```

---

## 💻 Development & Deployment

- **Development:**
  - Run `npm run dev` or `yarn dev` for local development.
  - Access the site at `http://localhost:5173` (default Vite port).
- **Production Build:**
  - Run `npm run build` or `yarn build`.
  - Deploy the `dist/` folder to your preferred hosting provider.

---

## 📝 Blog System Usage

### Admin Access
- Go to `/admin/blog` in your browser.
- Log in with your admin credentials.
- Create, edit, preview, or delete blog posts.

### Blog Features
- 💾 **Drafts:** Save posts as drafts for later editing.
- 👀 **Live Preview:** See Markdown-rendered content as you write.
- 🏷️ **Categories & Tags:** Organize posts for discoverability.
- ⏱️ **Custom Reading Time:** Override automatic estimation if needed.
- 🔗 **Featured Links:** Add related or external resources.
- 🖼️ **Cover Images:** Upload or link to images for each post.
- 🔍 **Search:** Quickly find posts by title, tag, or content.

---

## 🎨 Customization

### Theme & Styles
- **Tailwind CSS:**
  - Edit `tailwind.config.js` for theme settings.
  - Edit `src/index.css` for global styles.

### Content
- **Personal Info:**
  - `src/components/Home.tsx` – Main landing content
  - `src/components/About.tsx` – About section
  - `src/components/Projects.tsx` – Project showcase
  - `src/components/Footer.tsx` – Contact info

---

## 📱 Responsive Design

- Fully responsive for mobile, tablet, desktop, and large displays.
- Mobile-first approach with accessibility in mind.

---

## 🛡️ Security Practices

This project implements strong security measures:
- 🛡️ **Content Security Policy (CSP)**
- 🧾 **Secure HTTP Headers**
- 🦠 **XSS Protection**
- 🛑 **CSRF Prevention**
- 🔐 **Secure Authentication**
- 🧹 **Data Sanitization**
- 🚦 **Rate Limiting**

For details, see [SECURITY.md](./SECURITY.md).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Berat MEN**
- 🌐 Website: [beratmen.github.io](https://beratmen.github.io)
- 🐙 GitHub: [@beratmen](https://github.com/beratmen)
- 💼 LinkedIn: [Berat MEN](https://linkedin.com/in/beratmen)