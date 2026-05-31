gsap.registerPlugin(ScrollTrigger);

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

ScrollTrigger.create({
  trigger: document.body,
  start: 'top -60px',
  onEnter: () => nav?.classList.add('scrolled'),
  onLeaveBack: () => nav?.classList.remove('scrolled'),
});

const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTimeline
  .from('.eyebrow', { opacity: 0, y: 18, duration: 0.45 })
  .from('.hero-copy h1', { opacity: 0, y: 26, duration: 0.55 }, '-=0.15')
  .from('.hero-desc', { opacity: 0, y: 18, duration: 0.45 }, '-=0.25')
  .from('.hero-actions', { opacity: 0, y: 18, duration: 0.4 }, '-=0.2')
  .from('.hero-command-panel', { opacity: 0, y: 22, duration: 0.45 }, '-=0.2')
  .from('.hero-meta-card', { opacity: 0, y: 18, stagger: 0.08, duration: 0.35 }, '-=0.2')
  .from('.terminal-window', { opacity: 0, x: 24, duration: 0.55 }, '-=0.45')
  .from('.mini-card', { opacity: 0, y: 18, stagger: 0.08, duration: 0.35 }, '-=0.2');

document.querySelectorAll('.reveal-card').forEach((card, index) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    delay: index % 3 * 0.04,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 86%',
      once: true,
    },
  });
});

document.querySelectorAll('.command-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.commandTab;
    document.querySelectorAll('.command-tab').forEach(node => node.classList.remove('active'));
    document.querySelectorAll('.command-line').forEach(node => node.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`command-${target}`)?.classList.add('active');
  });
});

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      const original = button.textContent;
      button.textContent = '已复制';
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch (_) {
      button.textContent = '复制失败';
      setTimeout(() => {
        button.textContent = '复制';
      }, 1400);
    }
  });
});

const docsData = window.__WEBSITE_DOCS__;
const docsSidebar = document.getElementById('docsSidebar');
const docsPanelTitle = document.getElementById('docsPanelTitle');
const docsPanelSource = document.getElementById('docsPanelSource');
const docsPanelBody = document.getElementById('docsPanelBody');
const docsReferenceGrid = document.getElementById('docsReferenceGrid');

function renderDocTab(tab) {
  if (!docsPanelTitle || !docsPanelSource || !docsPanelBody) return;
  docsPanelTitle.textContent = tab.title;
  docsPanelSource.textContent = `来源: ${tab.source}`;
  docsPanelBody.innerHTML = tab.html;
}

if (docsData && docsSidebar && docsReferenceGrid) {
  docsSidebar.innerHTML = docsData.tabs
    .map(
      (tab, index) =>
        `<button class="docs-tab${index === 0 ? ' active' : ''}" data-doc-id="${tab.id}">${tab.label}</button>`
    )
    .join('');

  docsReferenceGrid.innerHTML = docsData.references
    .map(
      ref =>
        `<a href="${ref.url}" target="_blank" class="reference-card"><strong>${ref.title}</strong><span>${ref.description}</span></a>`
    )
    .join('');

  renderDocTab(docsData.tabs[0]);

  docsSidebar.querySelectorAll('.docs-tab').forEach(button => {
    button.addEventListener('click', () => {
      const { docId } = button.dataset;
      const selected = docsData.tabs.find(tab => tab.id === docId);
      if (!selected) return;
      docsSidebar.querySelectorAll('.docs-tab').forEach(node => node.classList.remove('active'));
      button.classList.add('active');
      renderDocTab(selected);
    });
  });
}

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const open = item?.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(node => node.classList.remove('open'));
    if (!open) item?.classList.add('open');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
