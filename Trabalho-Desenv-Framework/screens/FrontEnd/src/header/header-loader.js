// header-loader.js - carrega header.html e insere no header-placeholder
(async function(){
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  const possible = ['../header/header.html','../../header/header.html','../../../header/header.html','./header/header.html'];
  let res, url;
  for (const p of possible) {
    try {
      res = await fetch(p);
      if (res && res.ok) { url = new URL(p, location.href); break; }
    } catch(e){}
  }
  if (!res || !res.ok) {
    console.error('header.html não encontrado.');
    return;
  }

  try {
    const html = await res.text();
    placeholder.innerHTML = html;

    try {
      const cssUrl = new URL('../header/header.css', url).href;
      if (![...document.head.querySelectorAll('link')].some(l=>l.href===cssUrl)) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = cssUrl;
        document.head.appendChild(l);
      }
    } catch(e){}
  } catch (err) {
    console.error('Erro carregando header:', err);
  }
})();
