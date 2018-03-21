//To increase rate limits you can provide client-id and client-secret
export const CLIENT_ID = 'e7d3f4ff49e37a4037d2';
export const CLIENT_SECRET = '3194e739dd98743fed8ec3ae160bf9ee8f6db6df';

export const API_BASE_URL = 'https://api.github.com';
export const API_OAUTH = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
export const API_GISTS_URL = `${API_BASE_URL}/users/{username}/gists${API_OAUTH}`;