export const API_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : process.env.NEXT_PUBLIC_API_URL;
