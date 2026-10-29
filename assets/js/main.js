/**
 * SUPERHEAT - Official Website JavaScript
 * Interactive behaviors, YouTube facades, flyer lightbox, and booking flow
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initVideoFacades();
  initLightbox();
  initBookingForm();
  initSmoothScroll();
});

/**
 * Header sticky effect on scroll
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !header) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * High-performance YouTube Video Facades
 * Loads video only when the user clicks play, saving CPU & bandwidth
 */
function initVideoFacades() {
  const facades = document.querySelectorAll('.video-facade');

  facades.forEach(facade => {
    facade.addEventListener('click', () => {
      const videoId = facade.getAttribute('data-video-id');
      const title = facade.getAttribute('data-title') || 'Superheat Video';
      if (!videoId) return;

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
      iframe.setAttribute('title', title);
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');

      const parent = facade.parentElement;
      parent.innerHTML = '';
      parent.appendChild(iframe);
    });
  });
}

/**
 * Native Dialog Lightbox for Flyers and Stage Map
 */
function initLightbox() {
  const dialog = document.getElementById('lightbox-dialog');
  const dialogImg = document.getElementById('dialog-img');
  const dialogCaption = document.getElementById('dialog-caption');
  const closeBtn = document.getElementById('dialog-close');

  if (!dialog || !dialogImg) return;

  // Open modal for flyer cards
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const imgSrc = el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src;
      const caption = el.getAttribute('data-lightbox-caption') || el.querySelector('img')?.alt || '';

      if (imgSrc) {
        dialogImg.src = imgSrc;
        dialogImg.alt = caption;
        if (dialogCaption) dialogCaption.textContent = caption;
        dialog.showModal();
      }
    });
  });

  // Close button
  closeBtn?.addEventListener('click', () => dialog.close());

  // Click outside to close (light dismiss)
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      dialog.close();
    }
  });
}

/**
 * Booking form handler
 * Prepares direct mailto and WhatsApp options
 */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#booking-name')?.value || '';
    const email = form.querySelector('#booking-email')?.value || '';
    const phone = form.querySelector('#booking-phone')?.value || '';
    const city = form.querySelector('#booking-city')?.value || '';
    const type = form.querySelector('#booking-type')?.value || 'Show';
    const message = form.querySelector('#booking-message')?.value || '';

    const subject = encodeURIComponent(`[Booking Superheat] Proposta de Show - ${city || name}`);
    const body = encodeURIComponent(
      `Olá banda Superheat!\n\n` +
      `Gostaria de solicitar uma proposta para apresentação.\n\n` +
      `Nome/Produtor: ${name}\n` +
      `Email: ${email}\n` +
      `Telefone/WhatsApp: ${phone}\n` +
      `Cidade / Local: ${city}\n` +
      `Tipo de Evento: ${type}\n` +
      `Mensagem:\n${message}\n\n` +
      `Enviado através do site oficial superheat.com.br`
    );

    // Open mailto
    window.location.href = `mailto:contato@superheat.com.br?subject=${subject}&body=${body}`;

    if (statusEl) {
      statusEl.className = 'form-status success';
      statusEl.textContent = 'Mensagem preparada no seu cliente de e-mail! Ou envie direto para contato@superheat.com.br';
      statusEl.style.display = 'block';
    }
  });
}

/**
 * Smooth active link spy
 */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
}
