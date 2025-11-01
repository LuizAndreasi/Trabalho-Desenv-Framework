// register.ts
// compile com: tsc register.ts

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário.');
      }

      const result = await response.json();
      alert(`Usuário ${result.nome || data.nome} cadastrado com sucesso!`);
      window.location.href = '../login/login.html';
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  });
}
