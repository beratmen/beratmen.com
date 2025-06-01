import { describe, it, expect, vi } from 'vitest';
import { sanitize, validateCredentials } from './security';

describe('Security Utils', () => {

  it('should sanitize content properly', () => {
    const unsafeContent = '<script>alert("XSS")</script><p>Hello World</p>';
    const safeContent = sanitize(unsafeContent);
    expect(safeContent).not.toContain('<script>');
    expect(safeContent).toContain('<p>Hello World</p>');
  });

  it('should validate credentials correctly with hashed credentials', () => {
    const username = 'admin';
    const password = 'password123';
    const hashedCredentials = btoa(`${username}:${password}`);
    
    expect(validateCredentials(username, password, hashedCredentials)).toBe(true);
    expect(validateCredentials(username, 'wrongpassword', hashedCredentials)).toBe(false);
  });
  
  it('should validate credentials using environment variables', () => {
    const mockEnv = {
      VITE_ADMIN_USERNAME: 'beratmen',
      VITE_ADMIN_PASSWORD: '!@NB281109#!',
    };
    expect(validateCredentials('beratmen', '!@NB281109#!', undefined, mockEnv)).toBe(true);
    expect(validateCredentials('wrong_user', '!@NB281109#!', undefined, mockEnv)).toBe(false);
    expect(validateCredentials('beratmen', 'wrong_password', undefined, mockEnv)).toBe(false);
  });
});