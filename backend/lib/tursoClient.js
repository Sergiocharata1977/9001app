const { createClient } = require('@libsql/client');

// Configuración de la base de datos 9001app-v2 (VERSIÓN EXPERIMENTAL)
const tursoClient = createClient({
  url: 'libsql://9001app-v2-sergiocharata1977.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTYwMzI1MjIsImlkIjoiOTQ3M2M5NWItMWE3OC00MWYwLTgyMDItMmMyM2Q4MmQyMjM2IiwicmlkIjoiYzIyOGMwODItZTNjZC00MTJmLWIxMWQtNWU1NjRjM2RmNzRiIn0.x4EI9uRwsvnpJzwoUJZDecbiBT4wr0Z9IhRgvwRZIIhh6AqlG5cVw9xu-P6ZAnhN-kAnjmSFyYfiG9iGlHFtBg'
});

module.exports = tursoClient;
