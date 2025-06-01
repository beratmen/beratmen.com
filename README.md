# Berat MEN - Personal Portfolio & Blog

A modern, responsive personal portfolio and blog website built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### Portfolio
- 🎨 Modern and responsive design
- 🌓 Dark/Light mode support
- 📱 Mobile-first approach
- 🎯 Sections for About, Projects, and Contact
- 💼 Interactive project showcase
- 🔄 Smooth scrolling and animations
- 🔒 Comprehensive security infrastructure

### Blog System
- ✍️ Full-featured blog with admin panel
- 📝 Markdown support for writing posts
- 💾 Draft system for work in progress
- 👀 Live preview while writing
- 🏷️ Categories and tags support
- ⏱️ Reading time estimation
- 🔗 Featured links section
- 🖼️ Cover image support
- 📱 Responsive blog layout
- 🔍 Search functionality
- 🔒 Secure admin authentication

## 🛠️ Technologies

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Markdown**: React Markdown
- **Icons**: React Icons
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Environment Setup

For admin blog access, you need to create a `.env.local` file in the root directory with the following variables:

```bash
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_secure_password
```

> **IMPORTANT:** Never commit your `.env.local` file to version control!

### Deployment with Environment Variables

When deploying your website, you'll need to set up environment variables on your hosting platform:

- **Netlify**: Configure environment variables in the Netlify dashboard under Site settings > Build & deploy > Environment
- **Vercel**: Add environment variables in the Vercel project settings
- **GitHub Pages**: For GitHub Pages, you need to set environment variables during the build process in your GitHub Actions workflow:

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

Make sure to add your secrets in GitHub repository settings.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/beratmen/beratmen.github.io.git
cd beratmen.github.io
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## 📝 Blog Usage

### Admin Access
1. Navigate to `/admin/blog`
2. Log in with admin credentials
3. Create, edit, or manage blog posts

### Blog Features
- Create and manage blog posts
- Save drafts for later
- Preview posts before publishing
- Add categories and tags
- Set custom reading time
- Add featured links
- Upload cover images
- Format content with Markdown

## 🎨 Customization

### Theme
The site uses Tailwind CSS for styling. You can customize the theme by modifying:
- `tailwind.config.js` for theme settings
- `src/index.css` for global styles

### Content
Update your personal information in:
- `src/components/Home.tsx` for main content
- `src/components/About.tsx` for about section
- `src/components/Projects.tsx` for project showcase
- `src/components/Footer.tsx` for contact information

## 📱 Responsive Design

The site is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens
- Large displays

## 🔒 Security

This project implements comprehensive security measures to protect against common web vulnerabilities:

- Content Security Policy (CSP)
- Secure HTTP headers
- XSS protection
- CSRF prevention
- Secure authentication
- Data sanitization
- Rate limiting

For detailed information about the security implementation, see [SECURITY.md](./SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Berat MEN**
- Website: [beratmen.github.io](https://beratmen.github.io)
- GitHub: [@beratmen](https://github.com/beratmen)
- LinkedIn: [Berat MEN](https://linkedin.com/in/beratmen)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!