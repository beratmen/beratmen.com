import { describe, it, expect } from 'vitest';
import { generateCspHeaderString, generateCspMetaTag, cspDirectives } from './contentSecurityPolicy';

describe('Content Security Policy', () => {
  it('should generate a valid CSP header string', () => {
    const cspHeader = generateCspHeaderString();
    
    // Check that all directives are included
    Object.keys(cspDirectives).forEach(directive => {
      expect(cspHeader).toContain(directive);
    });
    
    // Check for required directives
    expect(cspHeader).toContain('upgrade-insecure-requests');
    expect(cspHeader).toContain('block-all-mixed-content');
  });
  
  it('should generate a valid CSP meta tag', () => {
    const metaTag = generateCspMetaTag();
    expect(metaTag).toBe(generateCspHeaderString());
  });
});