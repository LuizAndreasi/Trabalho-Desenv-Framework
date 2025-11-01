document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (!form) {
    console.error('Formulário de login não encontrado!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('username');
    const senhaInput = document.getElementById('password');
    const identifier = emailInput?.value.trim();
    const senha = senhaInput?.value.trim();

    if (!identifier || !senha) {
      alert('Preencha usuário e senha!');
      return;
    }

    try {
      const data = await apiFetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, senha })
      });

      if (!data || !data.token) {
        throw new Error(data?.message || 'Erro ao logar');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      window.location.href = '../app/nav.html';
    } catch (err) {
      alert(err.message || 'Erro de login');
    }
  });
});
