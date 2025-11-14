/**
 * Content Security Policy Configuration
 * 
 * This file defines a comprehensive Content Security Policy to protect against:
 * - Cross-Site Scripting (XSS) attacks
 * - Clickjacking
 * - Code injection
 * - Data theft via unauthorized sources
 */

// CSP Directives
export const cspDirectives = {
  // Only allow scripts from same origin and trusted CDNs
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for React development
    "https://cdn.jsdelivr.net",
    "https://unpkg.com"
  ],
  
  // Only allow styles from same origin and trusted sources
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for styled-components and inline styles
    "https://fonts.googleapis.com"
  ],
  
  // Only allow images from these sources
  'img-src': [
    "'self'",
    "data:",
    "https://avatars.githubusercontent.com",
    "https://api.github.com",
    "https://raw.githubusercontent.com",
    "https://placehold.co"
  ],
  
  // Only allow fonts from these sources
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  
  // Only allow connections to these sources
  'connect-src': [
    "'self'",
    "https://api.github.com",
    "https://www.google.com"
  ],
  
  // Allow embedding from trusted sources (Google Maps)
  'frame-src': [
    "'self'",
    "https://www.google.com"
  ],
  
  // Disallow embedding in frames (prevents clickjacking)
  'frame-ancestors': ["'none'"],
  
  // Only allow forms to submit to same origin
  'form-action': ["'self'"],
  
  // Base URI restrictions
  'base-uri': ["'self'"],
  
  // Default fallback for any unspecified directive
  'default-src': ["'self'"]
};

// Generate CSP header string
export const generateCspHeaderString = (): string => {
  const directives = [];
  
  for (const [directive, sources] of Object.entries(cspDirectives)) {
    // Convert camelCase to kebab-case if needed (though your keys are already kebab-case)
    directives.push(`${directive} ${sources.join(' ')}`);
  }
  
  // Add upgrade-insecure-requests and block-all-mixed-content
  directives.push('upgrade-insecure-requests');
  directives.push('block-all-mixed-content');
  
  return directives.join('; ');
};

// Generate CSP meta tag content
export const generateCspMetaTag = (): string => {
  return generateCspHeaderString();
};
