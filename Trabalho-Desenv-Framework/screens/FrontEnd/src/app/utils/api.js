async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`http://127.0.0.1:3000${endpoint}`, {
    ...options,
    headers
  });

  if (res.status === 401 || res.status === 403) {
    alert('Sessão expirada. Faça login novamente.');
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
    return;
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch(e) {
    return text;
  }
}

window.apiFetch = apiFetch;
