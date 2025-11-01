(
  async function(){
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;
  try {
    const possible = ['../app/nav.html','../../app/nav.html','../../../app/nav.html','./app/nav.html'];
    let res, url;
    for (const p of possible) {
      try {
        res = await fetch(p);
        if (res && res.ok) { url = new URL(p, location.href); break; }
      } catch(e){}
    }
    if (!res || !res.ok) {
      console.error('nav.html não encontrado em caminhos esperados.');
      return;
    }
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    Array.from(doc.querySelectorAll('link[rel="stylesheet"]')).forEach(link => {
      const href = link.getAttribute('href') || '';
      if (!href.match(/^https?:\/\//)) {
        try {
          const resolved = new URL(href, url).href;

          if (![...document.head.querySelectorAll('link')].some(l=>l.href===resolved)) {
            const l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = resolved;
            document.head.appendChild(l);
          }
        } catch(e){}
      } else {

        if (![...document.head.querySelectorAll('link')].some(l=>l.href===href)) {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = href;
          document.head.appendChild(l);
        }
      }
      link.remove();
    });

    const scripts = Array.from(doc.querySelectorAll('script'));
    scripts.forEach(s => {
      const src = s.getAttribute('src');
      const type = s.getAttribute('type') || '';
      if (src) {
        try {
          const resolved = new URL(src, url).href;
          if (resolved.endsWith('nav-loader.js')) {
            s.remove();
            return;
          }
          if (![...document.querySelectorAll('script')].some(sc=>sc.src===resolved)) {
            const ns = document.createElement('script');
            if (type) ns.type = type;
            ns.src = resolved;
            document.body.appendChild(ns);
          }
        } catch(e){}
      } else {
        const ns = document.createElement('script');
        ns.text = s.textContent;
        document.body.appendChild(ns);
      }
      s.remove();
    });

    placeholder.innerHTML = doc.body.innerHTML;

    const p = location.pathname.replace(/\\/g, '/');
    const idx = p.indexOf('/screens/');
    const base = idx >= 0 ? p.slice(0, idx) : p.slice(0, p.lastIndexOf('/'));

    Array.from(placeholder.querySelectorAll('[data-page]')).forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        const page = el.getAttribute('data-page') || '';
        const candidates = [
          base + '/screens/FrontEnd/src/' + page,
          base + '/screens/FrontEnd/src/' + page.replace(/^\//,''),
          './' + page,
          '../' + page
        ];
        window.location.href = candidates[0];
      });
    });

    const meusDados = placeholder.querySelector('[data-action="meusDados"]');
    if (meusDados) meusDados.addEventListener('click', (e)=>{ e.preventDefault(); alert('Meus dados - ainda não implementado'); });

    const sair = placeholder.querySelector('[data-action="sair"]');
    if (sair) sair.addEventListener('click', (e) => { e.preventDefault(); localStorage.clear(); location.href = (base + '/screens/FrontEnd/src/login/login.html'); });

    // ativa a nav-link cujo data-page corresponde ao arquivo atual
    const current = p.substring(p.lastIndexOf('/')+1);
    Array.from(placeholder.querySelectorAll('[data-page]')).forEach(function(el) {
      const dp = el.getAttribute('data-page') || '';
      if (dp.endsWith(current)) el.classList.add('active');
    });

  } catch (err) {
    console.error('Erro carregando nav:', err);
  }
})();
