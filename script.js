// ================= NAVBAR TOGGLE =================
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  const btn = document.getElementById('menuToggle');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

function closeMenu() {
  const menu = document.getElementById('navMenu');
  const btn = document.getElementById('menuToggle');
  menu.classList.remove('open');
  btn.classList.remove('open');
}

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for blur effect
  if (currentScroll > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ================= ACTIVE NAV LINK =================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observerNav.observe(section));

// ================= REVEAL ANIMATION =================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position in parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let idx = Array.from(siblings).indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ================= TAB SWITCHER =================
function showTab(tabId) {
  // Remove active from all tabs and buttons
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Activate selected
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
    // Activate corresponding button
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.getAttribute('onclick') === `showTab('${tabId}')`) {
        btn.classList.add('active');
      }
    });
  }
}

// ================= SHARE WEBSITE =================
function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: 'Justice in Motion — Edukasi Hukum Digital',
      text: 'Platform edukasi hukum mengenai child grooming dan perlindungan anak di Indonesia.',
      url: window.location.href
    }).catch(err => {
      if (err.name !== 'AbortError') copyToClipboard();
    });
  } else {
    copyToClipboard();
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Link berhasil disalin!');
  }).catch(() => {
    showToast('Salin link dari address bar browser Anda.');
  });
}

// ================= TOAST NOTIFICATION =================
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 28px;
    background: #0C1F3F;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    z-index: 9999;
    animation: toastIn 0.3s ease;
    border-left: 3px solid #3B9EE8;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ================= SMOOTH CLOSE MENU ON OUTSIDE CLICK =================
document.addEventListener('click', (e) => {
  const menu = document.getElementById('navMenu');
  const btn = document.getElementById('menuToggle');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
    btn.classList.remove('open');
  }
});
