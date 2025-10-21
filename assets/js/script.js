// Intro inicial: mostrar hasta que la página termine de cargar
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const landingEl = document.getElementById('landing');
  let introHidden = false;

  function hideIntroImmediate() {
    if (introHidden) return;
    introHidden = true;
    intro.style.display = 'none';
    landingEl.classList.add('visible');
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    hideIntroImmediate();
    return;
  }

  // Fade out suave
  intro.classList.add('fade-out');
  intro.addEventListener('animationend', hideIntroImmediate, { once: true });
  // Fallback
  setTimeout(hideIntroImmediate, 1500);
});

// Transición entre secciones
const landing = document.getElementById('landing');
const transition = document.getElementById('transition');
const presskit = document.getElementById('presskitContent');
const historia = document.getElementById('historiaContent');
const volverFloating = document.getElementById('volverFloating');
const siteFooter = document.getElementById('siteFooter');

function setContentUIVisible(visible) {
  volverFloating.classList.toggle('hidden', !visible);
  siteFooter.classList.toggle('hidden', !visible);
}

function showTransition(callback) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  transition.classList.remove('hidden'); // .glitch-screen usa display: grid

  if (reduceMotion) {
    transition.classList.add('hidden');
    callback();
    return;
  }

  setTimeout(() => { transition.classList.add('fade-out'); }, 2000);
  transition.addEventListener('animationend', () => {
    transition.classList.add('hidden');
    transition.classList.remove('fade-out');
    callback();
  }, { once: true });
}

document.getElementById('btnPresskit').addEventListener('click', () => {
  landing.classList.remove('visible');
  showTransition(() => { presskit.classList.add('visible'); setContentUIVisible(true); });
});

document.getElementById('btnHistoria').addEventListener('click', () => {
  landing.classList.remove('visible');
  showTransition(() => { historia.classList.add('visible'); setContentUIVisible(true); });
});

function volverInicio() {
  presskit.classList.remove('visible');
  historia.classList.remove('visible');
  setTimeout(() => {
    landing.style.display = 'flex';
    setTimeout(() => landing.classList.add('visible'), 50);
  }, 500);
  setContentUIVisible(false);
}
window.volverInicio = volverInicio;

// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function closeMenu() {
  mainNav.classList.remove('active');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('active');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    closeMenu();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});
