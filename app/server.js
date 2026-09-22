// ---------------------------------------------------------------------------
// MedConnect — mini "IntraMed" para practicar QA. Solo Node nativo, sin deps.
// Sirve páginas estáticas y expone una API JSON. Todo en memoria.
// El objetivo NO es que sea bonito, sino tener un blanco de pruebas estable.
// ---------------------------------------------------------------------------
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// "Base de datos" en memoria -------------------------------------------------
const USERS = [
  {
    email: 'dra.rivas@medconnect.test',
    password: 'Salud2024!',
    name: 'Dra. Ana Rivas',
    specialty: 'Cardiología',
    license: 'MP-12345',
  },
];

const PUBLICATIONS = [
  { id: 1, title: 'Nuevas guías de hipertensión 2024', author: 'Dra. Ana Rivas', specialty: 'Cardiología' },
  { id: 2, title: 'Manejo de diabetes tipo 2 en atención primaria', author: 'Dr. Luis Gómez', specialty: 'Endocrinología' },
  { id: 3, title: 'Actualización en antibioticoterapia', author: 'Dra. Marta Sosa', specialty: 'Infectología' },
];

const TOKEN = 'fake-jwt-token-medconnect';

// Helpers --------------------------------------------------------------------
function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => (raw += chunk));
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function serveStatic(res, fileName) {
  const filePath = path.join(PUBLIC_DIR, fileName);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
}

// Servidor -------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  // ---- API ----
  if (url === '/api/login' && method === 'POST') {
    const body = await readBody(req);
    const user = USERS.find(
      (u) => u.email === body.email && u.password === body.password
    );
    if (!user) {
      return sendJSON(res, 401, { error: 'Credenciales inválidas' });
    }
    return sendJSON(res, 200, {
      token: TOKEN,
      user: { name: user.name, specialty: user.specialty },
    });
  }

  if (url === '/api/publications' && method === 'GET') {
    // Endpoint público de lectura (feed de publicaciones).
    return sendJSON(res, 200, { publications: PUBLICATIONS });
  }

  if (url === '/api/profile' && method === 'GET') {
    // Endpoint protegido: exige el header Authorization.
    const auth = req.headers['authorization'];
    if (auth !== `Bearer ${TOKEN}`) {
      return sendJSON(res, 401, { error: 'No autorizado' });
    }
    const user = USERS[0];
    return sendJSON(res, 200, {
      name: user.name,
      specialty: user.specialty,
      license: user.license,
    });
  }

  // ---- Páginas ----
  if (url === '/' || url === '/login') return serveStatic(res, 'login.html');
  if (url.startsWith('/feed')) return serveStatic(res, 'feed.html');
  if (url.startsWith('/profile')) return serveStatic(res, 'profile.html');

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`MedConnect demo escuchando en http://localhost:${PORT}`);
});
