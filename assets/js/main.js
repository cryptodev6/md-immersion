/* =========================
  Tabs controller (vanilla JS)
  - keeps ARIA updated
========================= */
(function(){
  const root = document.querySelector('[data-tabs]');
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

  function activate(tab){
    const id = tab.getAttribute('data-tab');

    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.setAttribute('tabindex', active ? '0' : '-1');
    });

    panels.forEach(p => {
      const active = p.id === id;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t)));

  // Keyboard nav (left/right)
  root.addEventListener('keydown', (e) => {
    if(!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    const current = tabs.findIndex(t => t.classList.contains('is-active'));
    const next = e.key === 'ArrowRight' ? current + 1 : current - 1;
    const index = (next + tabs.length) % tabs.length;
    tabs[index].focus();
    activate(tabs[index]);
  });
})();
