import { Plugin } from 'vite';
import { generateCspHeaderString, generateCspMetaTag } from './contentSecurityPolicy';
import type { IncomingMessage, ServerResponse } from 'http';

export default function securityHeaders(): Plugin {
  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
        // Set security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        
        // Content Security Policy
        res.setHeader('Content-Security-Policy', generateCspHeaderString());
        
        // Strict Transport Security (when deployed with HTTPS)
        if (req.headers && req.headers['x-forwarded-proto'] === 'https') {
          res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }
        
        next();
      });
    },
    transformIndexHtml(html) {
      // Add meta tags for security
      return html.replace(
        /<head>/i,
        `<head>
          <meta http-equiv="Content-Security-Policy" content="${generateCspMetaTag()}">
          <meta http-equiv="X-Content-Type-Options" content="nosniff">
          <meta http-equiv="X-Frame-Options" content="DENY">
          <meta http-equiv="X-XSS-Protection" content="1; mode=block">
          <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
          <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()">
        `
      );
    },
  };
}
