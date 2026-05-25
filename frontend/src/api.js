// Central API base URL — reads from Vite env var in production, falls back to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE;
