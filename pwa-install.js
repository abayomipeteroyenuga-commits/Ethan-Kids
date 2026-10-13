(() => {
  let deferredPrompt = null;
  const installed = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const makeButton = () => {
    if (!document.body || document.getElementById('ethanKidsInstallButton')) return;
    const button = document.createElement('button');
    button.id = 'ethanKidsInstallButton';
    button.type = 'button';
    button.setAttribute('aria-label', 'Install Ethan Kids on this device');
    button.textContent = '⬇ Install Ethan Kids';
    Object.assign(button.style, {
      position: 'fixed', right: '14px', bottom: 'max(14px, env(safe-area-inset-bottom))', zIndex: '2147483647',
      border: '0', borderRadius: '999px', padding: '12px 16px', background: '#1264c5', color: '#fff',
      font: '800 14px/1.2 system-ui, sans-serif', boxShadow: '0 8px 24px rgba(9, 44, 94, .28)',
      cursor: 'pointer', maxWidth: 'calc(100vw - 28px)'
    });
    if (installed()) button.style.display = 'none';
    button.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try {
          const choice = await deferredPrompt.userChoice;
          if (choice && choice.outcome === 'accepted') button.style.display = 'none';
        } catch (_) {}
        deferredPrompt = null;
        return;
      }
      const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      alert(isiOS
        ? 'To install Ethan Kids: tap Share in Safari, then choose “Add to Home Screen”.'
        : 'To install Ethan Kids: open your browser menu and choose “Install app” or “Add to Home Screen”. If that option is missing, check that this site is deployed over HTTPS.');
    });
    document.body.appendChild(button);
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    makeButton();
  });
  window.addEventListener('appinstalled', () => {
    const button = document.getElementById('ethanKidsInstallButton');
    if (button) button.style.display = 'none';
    deferredPrompt = null;
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', makeButton, { once: true });
  else makeButton();
})();
