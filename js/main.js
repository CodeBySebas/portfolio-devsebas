/* ================================
   HAMBURGER MENU
   ================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('ti-menu-2');
  icon.classList.toggle('ti-x');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('ti-menu-2');
    icon.classList.remove('ti-x');
  });
});

/* ================================
   NAVBAR BLUR AL SCROLL
   ================================ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.borderBottomColor = 'rgba(0,255,148,0.15)';
  } else {
    navbar.style.borderBottomColor = '';
  }
});

/* ================================
   TYPEWRITER EFFECT
   ================================ */
const roles = [
  'Full Stack Developer',
  'Backend Developer',
  'Python Developer',
  'SQL Developer',
];

const typewriterEl = document.getElementById('typewriter');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let isPausing   = false;

function type() {
  const currentRole = roles[roleIndex];

  if (isPausing) return;

  if (!isDeleting) {
    // Escribiendo
    typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      // Terminó de escribir → pausa antes de borrar
      isPausing = true;
      setTimeout(() => {
        isPausing  = false;
        isDeleting = true;
      }, 1800);
    }
  } else {
    // Borrando
    typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Terminó de borrar → siguiente rol
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }
}

// Velocidad de escritura y borrado
setInterval(() => {
  type();
}, isDeleting ? 60 : 100);

// Fix: la velocidad cambia dinámicamente
setInterval(type, 80);

/* ================================
   SCROLL REVEAL
   ================================ */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
/* ================================
   SCROLL PROGRESS BAR
   ================================ */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});
/* ================================
   CURSOR PERSONALIZADO
   ================================ */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

window.addEventListener('mousemove', (e) => {
  cursor.style.left         = e.clientX + 'px';
  cursor.style.top          = e.clientY + 'px';
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top  = e.clientY + 'px';
});

// Efecto hover en links y botones
const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card');

hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-dot--hover');
    cursorFollower.classList.add('cursor-follower--hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-dot--hover');
    cursorFollower.classList.remove('cursor-follower--hover');
  });
});
/* ================================
   BARRAS DE IDIOMAS ANIMADAS
   ================================ */
const langBars = document.querySelectorAll('.language-card__fill');

const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      entry.target.style.width = width + '%';
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

langBars.forEach(bar => langObserver.observe(bar));

// ===== HERO MATRIX =====
const canvas = document.getElementById('heroMatrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01アイウエオカキクケコ{}[]<>/\\;def return import class const let var SELECT FROM WHERE';
const charArr = chars.split('');
const fontSize = 13;
const cols = Math.floor(canvas.width / fontSize);
const drops = Array(cols).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 15, 30, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff94';
  ctx.font = fontSize + 'px Fira Code, monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = charArr[Math.floor(Math.random() * charArr.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 45);