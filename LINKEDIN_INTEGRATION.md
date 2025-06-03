# LinkedIn Integration for Portfolio

This document explains how to keep your About Me section and profile picture synchronized with your LinkedIn profile.

## Overview

The portfolio website automatically fetches your LinkedIn profile data to display:
- Profile picture
- Headline
- Summary
- Skills
- Work experience
- Education

## Setup Instructions

### Prerequisites
- LinkedIn account with public profile
- Backend server with Node.js (for the proxy service)

### Backend Setup

1. **Install required packages**
   ```bash
   cd server
   npm install express cors axios cheerio
   ```

2. **Configure the LinkedIn proxy service**
   The proxy service (`server/routes/linkedin.js`) is already set up to fetch your LinkedIn data.

3. **Environment variables**
   Create a `.env` file in the server directory with your LinkedIn credentials (if you're using LinkedIn API):
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   ```

### Frontend Integration

1. The frontend is already configured to fetch data from the backend proxy service.

2. The LinkedIn data is automatically refreshed when:
   - The user visits the page
   - The cached data is older than 24 hours
   - The user clicks the refresh button on the profile picture

## Manual Refresh

You can manually refresh your LinkedIn data by:
1. Clicking the refresh icon on your profile picture
2. The data will be fetched from LinkedIn and updated in real-time

## Troubleshooting

If LinkedIn data isn't displaying correctly:

1. **Check network requests**:
   - Open browser dev tools
   - Look for requests to `/api/linkedin/profile/{username}`
   - Check for any error responses

2. **Verify backend proxy**:
   - Ensure the LinkedIn proxy service is running
   - Check server logs for any errors when fetching LinkedIn data

3. **Fallback mechanisms**:
   - If LinkedIn data cannot be fetched, the system will fall back to GitHub profile data
   - If both fail, default placeholder content will be displayed

## Future Improvements

- Implement OAuth authentication for more reliable LinkedIn API access
- Add caching on the server to reduce API calls
- Implement webhooks to automatically update when LinkedIn profile changes

## Disclaimer

Web scraping LinkedIn is against their terms of service. The proper way to access LinkedIn data is through their official API with proper authentication. This implementation is for educational purposes only.
