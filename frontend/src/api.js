// Central API base URL — reads from Vite env var in production, falls back to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'https://catechism-website-brown.vercel.app';

export default API_BASE;
