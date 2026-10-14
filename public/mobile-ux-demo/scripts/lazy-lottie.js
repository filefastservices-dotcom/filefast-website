const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
async function loadPlayer() {
  const module = await import('https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js');
  return module.default || window.lottie;
}
function observeHero() {
  const container = document.getElementById('hero-lottie');
  if (!container || reducedMotion || !container.dataset.lottieSrc) return;
  let started = false;
  const load = async () => {
    if (started) return;
    started = true;
    try {
      const player = await loadPlayer();
      if (!player || !player.loadAnimation) return;
      const fallback = container.querySelector('.fallback');
      const animation = player.loadAnimation({container,renderer:'svg',loop:true,autoplay:true,path:container.dataset.lottieSrc});
      animation.addEventListener('DOMLoaded', () => { if (fallback) fallback.hidden = true; });
      animation.addEventListener('data_failed', () => animation.destroy());
    } catch (error) { console.warn('Lottie unavailable; static fallback remains.', error); }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); void load(); } }, {threshold:0.15});
    observer.observe(container);
  } else void load();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeHero, {once:true}); else observeHero();
