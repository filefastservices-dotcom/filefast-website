// Staging-only experiment. Use server-side assignment before any production test.
(() => {
  const key = 'ffg_hero_exp'; let variant;
  try { variant = localStorage.getItem(key); if (!['A','B'].includes(variant)) { variant = Math.random() < 0.5 ? 'A' : 'B'; localStorage.setItem(key, variant); } }
  catch (_) { variant = 'A'; }
  document.documentElement.dataset.heroExp = variant;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:'hero_experiment_assigned',experiment:'hero_motion_vs_static',variant});
  if (variant === 'B') { const container = document.getElementById('hero-lottie'); const image = container && container.querySelector('.fallback'); if (image) image.src = '/assets/hero-static.svg'; if (container) delete container.dataset.lottieSrc; }
  document.querySelectorAll('[data-track="cta-start"]').forEach(button => button.addEventListener('click', () => window.dataLayer.push({event:'cta_click',cta:'start',experiment:'hero_motion_vs_static',variant})));
})();
