// VORTEX PRIMUS — interações leves: reveal on scroll + pausar vídeos fora da tela

document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.hero-body, .section .container > *, .virada-grid, .entrega-grid, .incluso-grid'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));

  // Pausa vídeos fora da viewport para economizar recursos
  const videos = document.querySelectorAll('video');
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  videos.forEach((video) => videoObserver.observe(video));
});
