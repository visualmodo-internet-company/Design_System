'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const data = JSON.parse($('fixture').textContent);
  document.querySelectorAll('[data-fixture]').forEach((element) => { element.textContent = String(data[element.dataset.fixture] ?? ''); });
  let toastTimer;
  const notify = (message) => { clearTimeout(toastTimer); $('notification-text').textContent = message; $('notification').hidden = false; toastTimer = setTimeout(() => { $('notification').hidden = true; }, 6000); };
  const closeMenus = () => document.querySelectorAll('[popover]:popover-open').forEach((menu) => menu.hidePopover());
  const openDialog = (id) => { closeMenus(); if ($('mobile-sidebar').open && id !== 'mobile-sidebar') $('mobile-sidebar').close(); $(id).showModal(); };
  const navItems = [...document.querySelector('.ds-sidebar-nav').querySelectorAll('[data-nav]')].map((link) => link.dataset.nav);
  function searchDestinations() {
    const query = $('destination-search').value.toLowerCase();
    $('destination-results').replaceChildren();
    navItems.filter((label) => label.toLowerCase().includes(query)).forEach((label) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'ds-nav-link'; button.textContent = label;
      button.addEventListener('click', () => { $('find-dialog').close(); if (label !== 'Overview') notify(`${label}: a future page pattern. The foundation preview remains on Overview.`); });
      $('destination-results').append(button);
    });
    if (!$('destination-results').children.length) { const message = document.createElement('p'); message.className = 'ds-muted ds-pad'; message.textContent = 'No destinations match your search.'; $('destination-results').append(message); }
  }
  $('destination-search').addEventListener('input', searchDestinations); searchDestinations();
  document.addEventListener('click', (event) => {
    const element = event.target.closest('button,a'); if (!element) return;
    if (element.hasAttribute('data-message')) { closeMenus(); notify(element.dataset.message); }
    if (element.hasAttribute('data-search-open')) openDialog('find-dialog');
    if (element.hasAttribute('data-rollback-open')) openDialog('rollback-dialog');
    if (element.hasAttribute('data-close')) $(element.dataset.close).close();
    if (element.hasAttribute('data-nav')) { event.preventDefault(); if ($('mobile-sidebar').open) $('mobile-sidebar').close(); if (element.dataset.nav !== 'Overview') notify(`${element.dataset.nav}: a future page pattern. The foundation preview remains on Overview.`); }
    if (element.hasAttribute('data-theme-value')) { applyTheme(element.dataset.themeValue); closeMenus(); }
    if (element.hasAttribute('data-filter')) { filter = element.dataset.filter; $('filter-label').textContent = filter === 'all' ? 'All' : filter === 'ready' ? 'Ready' : 'Draft'; updateBranches(); closeMenus(); }
    if (element.hasAttribute('data-checklist')) { const checked = element.getAttribute('aria-pressed') !== 'true'; element.setAttribute('aria-pressed', String(checked)); $('checklist-count').textContent = `${document.querySelectorAll('[data-checklist][aria-pressed="true"]').length}/${data.checklist.length}`; }
  });
  document.querySelectorAll('[popovertarget]').forEach((trigger) => trigger.addEventListener('click', () => {
    const menu = $(trigger.getAttribute('popovertarget')); const rect = trigger.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - 256))}px`;
    menu.style.top = `${rect.bottom + 8}px`;
    menu.addEventListener('toggle', () => { if (menu.matches(':popover-open')) { const bounds = menu.getBoundingClientRect(); if (bounds.bottom > innerHeight - 8) menu.style.top = `${Math.max(8, rect.top - bounds.height - 8)}px`; menu.querySelector('button')?.focus(); } }, { once: true });
  }));
  document.querySelectorAll('[popover]').forEach((menu) => menu.addEventListener('keydown', (event) => {
    const buttons = [...menu.querySelectorAll('button')]; const index = buttons.indexOf(document.activeElement);
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length; buttons[next]?.focus(); }
  }));
  document.addEventListener('keydown', (event) => {
    if (event.target.closest('input,textarea,select,[contenteditable="true"]') || document.querySelector('dialog[open]')) return;
    if ((event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.metaKey && !event.altKey) || (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey))) { event.preventDefault(); openDialog('find-dialog'); }
  });
  $('rollback-confirm').addEventListener('click', () => { $('rollback-dialog').close(); notify('Rollback preview confirmed. No deployment was changed.'); });
  $('notification-close').addEventListener('click', () => { $('notification').hidden = true; });
  $('settings-toggle').addEventListener('click', () => { const open = $('settings-toggle').getAttribute('aria-expanded') !== 'true'; $('settings-toggle').setAttribute('aria-expanded', String(open)); $('deployment-settings').hidden = !open; });
  let filter = 'all';
  function updateBranches() { const matches = data.branch.toLowerCase().includes($('branch-search').value.toLowerCase()) && filter !== 'draft'; $('branch-row').hidden = !matches; $('branch-empty').hidden = matches; $('branch-results').textContent = matches ? '1 matching branch' : 'No matching branches'; }
  $('branch-search').addEventListener('input', updateBranches);
  $('clear-filters').addEventListener('click', () => { filter = 'all'; $('filter-label').textContent = 'All'; $('branch-search').value = ''; updateBranches(); $('branch-search').focus(); });
  $('analytics-toggle').addEventListener('click', () => { const enabled = $('analytics-toggle').getAttribute('aria-pressed') !== 'true'; $('analytics-toggle').setAttribute('aria-pressed', String(enabled)); $('analytics-toggle').textContent = enabled ? 'Disable example' : 'Enable analytics'; $('analytics-title').textContent = enabled ? '1,284 example visitors' : 'Track visitors and page views'; $('analytics-description').textContent = enabled ? 'Illustrative data only. No tracking script is running.' : 'See traffic, top pages, and audience trends.'; });
  const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* file: mode or blocked storage remains usable */ } } };
  let selectedTheme = storage.get('design-system.reference.theme') || 'dark';
  function applyTheme(value) { selectedTheme = value; document.documentElement.dataset.theme = value === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : value; storage.set('design-system.reference.theme', value); }
  applyTheme(selectedTheme); matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (selectedTheme === 'system') applyTheme('system'); });
  let width = Number(storage.get('design-system.reference.sidebar-width')) || 256;
  function setWidth(value) { width = Math.max(240, Math.min(400, value)); $('shell').style.setProperty('--ds-sidebar-width', `${width}px`); $('sidebar-resizer').setAttribute('aria-valuenow', String(width)); storage.set('design-system.reference.sidebar-width', String(width)); }
  setWidth(width);
  $('sidebar-collapse').addEventListener('click', () => { $('shell').dataset.collapsed = 'true'; $('sidebar-open').focus(); });
  $('sidebar-open').addEventListener('click', () => { if (innerWidth >= 961) $('shell').dataset.collapsed = 'false'; else openDialog('mobile-sidebar'); });
  $('sidebar-resizer').addEventListener('keydown', (event) => { if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault(); setWidth(event.key === 'Home' ? 240 : event.key === 'End' ? 400 : width + (event.key === 'ArrowRight' ? 16 : -16)); } });
  $('sidebar-resizer').addEventListener('pointerdown', (event) => { event.currentTarget.setPointerCapture(event.pointerId); });
  $('sidebar-resizer').addEventListener('pointermove', (event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) setWidth(event.clientX); });
})();
