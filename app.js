/* ═══════════════════════════════════════════════════════════════
   app.js — Motor de renderizado universal
   Lee la configuración y construye toda la página dinámicamente
   ═══════════════════════════════════════════════════════════════ */

'use strict';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.warn('Service Worker omitido en entorno de desarrollo local:', err));
  });
}

// ─── INMUNIDAD CONTRA VECTORES XSS ──────────────────────────────
function escapeHTML(str) {
  return String(str || '').replace(/[&<>"'/]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'})[m]);
}

// ─── 1. INICIALIZACIÓN ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const C = typeof CONFIG !== 'undefined' ? CONFIG : getMergedConfig();
  init(C);
});

function init(C) {
  applyMeta(C);
  applyThemeAndTypo(C);
  applyPremiumTemplates(C);
  applyHeroBg(C);
  renderNavbar(C);
  renderHero(C);
  if (C.sections.about)        renderAbout(C);
  if (C.sections.services)     renderServices(C);
  if (C.sections.portfolio)    renderPortfolio(C);
  if (C.sections.products)     renderProducts(C);
  if (C.sections.digital)      renderDigital(C);
  if (C.sections.testimonials) renderTestimonials(C);
  if (C.sections.faq)          renderFaq(C);
  if (C.sections.contact)      renderContact(C);
  renderFooter(C);
  renderFloatingButtons(C);
  if (C.sections.music && C.music?.enabled) renderMusicPlayer(C);
  initCartSidebar(C);
  initScrollEffects(C);
  initAdminShortcut(C);
  hideSections(C);
}

// ─── 2. META / SEO ─────────────────────────────────────────────
function applyMeta(C) {
  const seo = C.seo || {};
  document.title = seo.title || `${C.businessName} — ${C.businessSlogan}`;
  setMeta('description', seo.description || C.businessDescription);
  setMeta('keywords', seo.keywords || '');
  setOg('title', seo.title || C.businessName);
  setOg('description', seo.description || C.businessDescription);
  if (seo.ogImage) setOg('image', seo.ogImage);
  document.documentElement.lang = seo.lang || C.language || 'es';
  if (C.favicon) {
    const link = document.createElement('link');
    link.rel = 'icon'; link.href = C.favicon;
    document.head.appendChild(link);
  }
}
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}
function setOg(prop, content) {
  let el = document.querySelector(`meta[property="og:${prop}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', `og:${prop}`); document.head.appendChild(el); }
  el.content = content;
}

function applyLivePalette(palette) {
  const root = document.documentElement;
  const presets = {
    "default": { primary: "#00d4ff", primaryRgb: "0, 212, 255" },
    "cyber-pink": { primary: "#ff007f", primaryRgb: "255, 0, 127" },
    "emerald-matrix": { primary: "#00ff66", primaryRgb: "0, 255, 102" },
    "gold-luxury": { primary: "#d4af37", primaryRgb: "212, 175, 55" }
  };
  const active = presets[palette] || presets["default"];
  root.style.setProperty('--theme-primary', active.primary);
  root.style.setProperty('--c-primary', active.primary);
  root.style.setProperty('--c-primary-rgb', active.primaryRgb);
}

// ─── 3. TEMA Y TIPOGRAFÍA ───────────────────────────────────────
function applyThemeAndTypo(C) {
  const themeName = C.theme || 'midnight-gold';
  if (themeName === 'custom') {
    applyTheme('midnight-gold');
    applyTheme('custom', C.customColors || {});
  } else {
    applyTheme(themeName);
  }
  applyLivePalette(C.premiumTemplates?.activePaletteCatalog);
  const t = C.typography || {};
  applyTypography(t.fontHeading, t.fontBody, t.fontSize, t.fontWeightHeading);
  const root = document.documentElement;
  if (t.letterSpacing !== undefined) root.style.setProperty('--ls-normal', t.letterSpacing + 'em');
  if (t.lineHeight)     root.style.setProperty('--lh-body', t.lineHeight);
  if (C.effects && !C.effects.animations) document.body.classList.add('no-animations');
}

// ─── 4. FONDO DEL HERO ─────────────────────────────────────────
function applyHeroBg(C) {
  const bg = C.heroBg || {};
  const hero = document.getElementById('hero-section');
  const btype = bg.type || 'gradient';

  // Limpiar contenedor
  let bgEl = document.getElementById('hero-bg-container');
  if (!bgEl) { bgEl = document.createElement('div'); bgEl.id = 'hero-bg-container'; hero.prepend(bgEl); }
  bgEl.innerHTML = '';

  if (btype === 'gradient') {
    bgEl.innerHTML = '<div class="hero-bg-gradient"></div>';
  } else if (btype === 'solid') {
    hero.style.background = bg.color || 'var(--c-bg)';
  } else if (btype === 'image' && bg.imageUrl) {
    bgEl.innerHTML = `
      <img class="hero-bg-image" src="${bg.imageUrl}" alt="" aria-hidden="true" loading="eager">
      <div class="hero-bg-overlay" style="background:rgba(10,10,15,${bg.imageOverlay ?? 0.6})"></div>`;
  } else if (btype === 'video' && bg.videoUrl) {
    bgEl.innerHTML = `
      <video class="hero-bg-video" src="${bg.videoUrl}"
        autoplay ${bg.videoLoop ? 'loop' : ''} ${bg.videoMuted ? 'muted' : ''}
        playsinline preload="auto" aria-hidden="true">
      </video>
      <div class="hero-bg-overlay" style="background:rgba(10,10,15,${bg.videoOverlay ?? 0.7})"></div>`;
  } else {
    bgEl.innerHTML = '<div class="hero-bg-gradient"></div>';
  }
}

// ─── 5. NAVBAR ─────────────────────────────────────────────────
function renderNavbar(C) {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('nav-logo');
  const links = document.getElementById('nav-links');
  const toggle = document.getElementById('nav-toggle');

  // Logo
  if (C.logo) {
    logo.innerHTML = `<img src="${C.logo}" alt="${C.businessName}" onerror="this.parentElement.textContent='${C.businessName}'">`;
  } else {
    logo.textContent = C.businessName;
  }

  // Links según secciones activas
  const navItems = [];
  if (C.sections.about)       navItems.push({ href: '#about-section',        label: 'Nosotros' });
  if (C.sections.services)    navItems.push({ href: '#services-section',      label: 'Servicios' });
  if (C.sections.portfolio)   navItems.push({ href: '#portfolio-section',     label: 'Proyectos' });
  if (C.sections.products)    navItems.push({ href: '#products-section',      label: 'Productos' });
  if (C.sections.digital)     navItems.push({ href: '#digital-section',       label: 'Digitales' });
  if (C.sections.testimonials)navItems.push({ href: '#testimonials-section',  label: 'Reseñas' });
  if (C.sections.faq)         navItems.push({ href: '#faq-section',           label: 'FAQ' });
  if (C.sections.contact)     navItems.push({ href: '#contact-section',       label: 'Contacto' });

  const ctaLink = C.whatsapp || (typeof CONFIG !== 'undefined' ? CONFIG.whatsapp : 'https://wa.me/teredicrom?s=t');

  links.innerHTML = navItems.map(item =>
    `<li><a href="${item.href}">${item.label}</a></li>`
  ).join('') + `
  ${C.sections.products ? `<li class="cart-icon" id="nav-cart-icon" title="Ver carrito">
      <img src="./logos de botones para redes sociales/BOTON-CARRITO-DE-COMPRA.webp" alt="Carrito" id="nav-cart-img" style="width:28px;height:28px;object-fit:contain;">
      <span class="cart-badge" id="cart-badge">0</span>
    </li>` : ''}
  <li class="nav-cta"><a href="${ctaLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-invert btn-sm" id="nav-cta-btn">Contactar</a></li>`;

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Cart icon click
  const cartIcon = document.getElementById('nav-cart-icon');
  if (cartIcon) cartIcon.addEventListener('click', openCart);

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ─── 6. HERO ───────────────────────────────────────────────────
function renderHero(C) {
  const section = document.getElementById('hero-section');
  const hasCart = C.sections.products && C.products?.showCart;
  const ttype = C.templateType;

  if (ttype === 'professional') {
    renderHeroProfessional(C, section);
  } else if (ttype === 'digital') {
    renderHeroDigital(C, section);
  } else {
    renderHeroStore(C, section);
  }

  const titleEl = section.querySelector('.hero-title');
  if (titleEl) {
    const heroTitle = C.businessName || "LANDIRIANOS SITE";
    const formattedTitle = heroTitle.split('').map((char, index) => {
      if(char === ' ') return '<span style="display:inline-block; width: var(--space-sm, 12px);">&nbsp;</span>';
      return `<span class="elastic-letter" style="--letter-index: ${index}; display: inline-block;">${char}</span>`;
    }).join('');
    titleEl.innerHTML = formattedTitle + (C.businessSlogan ? `<br><span class="gradient-text" style="font-size:0.55em;font-weight:600;">${C.businessSlogan}</span>` : '');
  }
}

function renderHeroStore(C, section) {
  section.classList.add('hero-store');
  const whatsappUrl = waUrl(C);
  section.innerHTML += `
  <div class="hero-content">
    <div class="container">
      <div class="hero-text">
        <div class="hero-badge">${C.businessSlogan || 'Bienvenidos'}</div>
        <h1 class="hero-title">
          ${C.businessName.split(' ').slice(0,2).join(' ')}<br>
          <span class="gradient-text">${C.businessName.split(' ').slice(2).join(' ') || C.businessSlogan}</span>
        </h1>
        <p class="hero-description">${C.businessDescription || 'Tu descripción del negocio aquí.'}</p>
        <div class="hero-actions">
          <a href="#products-section" class="btn btn-primary btn-invert btn-lg" id="hero-cta-productos">Ver Productos</a>
          <a href="${whatsappUrl}" target="_blank" class="btn btn-ghost btn-invert btn-lg" id="hero-cta-whatsapp">WhatsApp</a>
        </div>
        <div class="hero-stats">
          ${(C.about?.stats || []).map(s => `
            <div class="hero-stat">
              <span class="hero-stat-number">${s.number}</span>
              <span class="hero-stat-label">${s.label}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-image-wrap">
          <img src="${C.about?.image || 'https://placehold.co/600x500/1E1E2E/D4AF37?text=' + encodeURIComponent(C.businessName)}"
               alt="${C.businessName}" loading="eager">
        </div>
        <div class="hero-floating-card card-1">✦ ${C.about?.highlights?.[0]?.label || 'Calidad Premium'}</div>
        <div class="hero-floating-card card-2">⭐ ${C.about?.stats?.[1]?.number || '4.9'} ${C.about?.stats?.[1]?.label || 'Calificación'}</div>
      </div>
    </div>
  </div>`;
}

function renderHeroProfessional(C, section) {
  section.classList.add('hero-professional');
  const whatsappUrl = waUrl(C);
  const socials = buildSocialLinks(C.social, 'hero');
  const hasImage = !!C.about?.image;

  section.innerHTML += `
  <div class="hero-content">
    <div class="container" ${!hasImage ? 'style="display:flex;justify-content:center;"' : ''}>
      ${hasImage ? `
      <div class="hero-visual">
        <img class="hero-profile-image reveal"
          src="${C.about.image}"
          alt="${C.businessName}" loading="eager">
      </div>` : ''}
      <div class="hero-text" ${!hasImage ? 'style="text-align:center;max-width:800px;"' : ''}>
        ${C.heroBadgeText ? `<div class="hero-profession-tag">${C.heroBadgeText}</div>` : ''}
        <h1 class="hero-title">
          ${C.businessName}<br>
          <span class="gradient-text" style="font-size:0.55em;font-weight:600;">${C.businessSlogan}</span>
        </h1>
        <p class="hero-description">${C.businessDescription || ''}</p>
        <div class="hero-actions" ${!hasImage ? 'style="justify-content:center;"' : ''}>
          <a href="${whatsappUrl}" target="_blank" class="btn btn-primary btn-invert btn-lg" id="hero-cta-agendar">${C.heroCTAText || 'Solicitar Cotización'}</a>
          ${C.sections.services ? `<a href="#services-section" class="btn btn-ghost btn-invert btn-lg" id="hero-cta-servicios">Ver Servicios</a>` : ''}
        </div>
        ${socials ? `<div class="hero-social-links" ${!hasImage ? 'style="justify-content:center;"' : ''}>${socials}</div>` : ''}
        <div class="hero-stats" ${!hasImage ? 'style="justify-content:center;"' : ''}>
          ${(C.about?.stats || []).map(s => `
            <div class="hero-stat">
              <span class="hero-stat-number">${s.number}</span>
              <span class="hero-stat-label">${s.label}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function renderHeroDigital(C, section) {
  section.classList.add('hero-digital');
  const firstProduct = C.digital?.items?.[0];
  const whatsappUrl = waUrl(C, `Hola! Quiero comprar: ${firstProduct?.name || 'el producto digital'}`);
  section.innerHTML += `
  <div class="hero-content">
    <div class="container">
      <div class="hero-badge">Producto Digital Exclusivo</div>
      <h1 class="hero-title">${C.businessName}<br><span class="gradient-text">${C.businessSlogan}</span></h1>
      <p class="hero-description">${C.businessDescription || ''}</p>
      <div class="hero-actions" style="justify-content:center;">
        ${firstProduct ? `<a href="#digital-section" class="btn btn-primary btn-invert btn-lg" id="hero-cta-digital">Ver Producto — ${C.currencySymbol}${firstProduct.price}</a>` : ''}
        <a href="${whatsappUrl}" target="_blank" class="btn btn-ghost btn-invert btn-lg" id="hero-cta-whatsapp-digital">Consultar</a>
      </div>
      ${firstProduct?.mockupImage ? `
      <div class="hero-mockup">
        <img src="${firstProduct.mockupImage}" alt="${firstProduct.name}" loading="eager">
      </div>` : ''}
    </div>
  </div>`;
}

// ─── 7. ABOUT ──────────────────────────────────────────────────
function renderAbout(C) {
  const section = document.getElementById('about-section');
  const a = C.about;
  if (!a) return;

  // ── Construir el bloque de imagen/carrusel ──────────────────
  let visualBlock = '';
  if (a.carousel && a.carousel.length > 0) {
    // Duplicamos las imágenes para lograr el loop infinito sin saltos
    const imgs = [...a.carousel, ...a.carousel];
    const slideCount = a.carousel.length;
    const slideWidth = 220; // 200px slide + 20px gap — coincide con CSS retrato
    const totalWidth = slideWidth * slideCount;
    visualBlock = `
    <div class="about-carousel-wrap reveal">
      <div class="about-carousel-label">✦ Proyectos realizados</div>
      <div class="about-carousel-track-outer">
        <div class="about-carousel-track" id="about-carousel-track"
             style="--slide-count:${slideCount};--slide-w:${slideWidth}px;--total-w:${totalWidth}px;">
          ${imgs.map((img, i) => `
            <div class="about-carousel-slide">
              <div class="about-carousel-frame">
                <div class="about-carousel-dots">
                  <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                </div>
                <img src="${img.src}" alt="${img.label || 'Proyecto web'}" loading="eager" fetchpriority="high">
              </div>
              <div class="about-carousel-caption">${img.label || ''}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="about-carousel-fade-left"></div>
      <div class="about-carousel-fade-right"></div>
    </div>`;
  } else if (a.image) {
    visualBlock = `
    <div class="about-image reveal">
      <img src="${a.image}" alt="${C.businessName}" loading="eager" fetchpriority="high">
    </div>`;
  } else {
    visualBlock = `
    <div class="about-image reveal">
      <div class="about-image-placeholder">${C.templateType === 'professional' ? '👤' : C.templateType === 'digital' ? '📱' : '🏪'}</div>
    </div>`;
  }

  section.innerHTML = `
  <div class="container">
    <div class="about-grid ${a.carousel ? 'about-grid-carousel' : ''}">
      ${visualBlock}
      <div class="about-content">
        <div class="about-label">¿Quiénes somos?</div>
        <h2 class="about-title reveal">${escapeHTML(a.title || 'Sobre Nosotros')}</h2>
        <p class="about-description reveal reveal-delay-1">${escapeHTML(a.description || '')}</p>
        ${a.highlights?.length ? `
        <div class="about-highlights reveal reveal-delay-2">
          ${a.highlights.map(h => `
            <div class="about-highlight">
              <div class="about-highlight-icon">${h.icon}</div>
              <span>${escapeHTML(h.label)}</span>
            </div>`).join('')}
        </div>` : ''}
        ${a.stats?.length ? `
        <div class="about-stats reveal reveal-delay-3">
          ${a.stats.map(s => `
            <div>
              <span class="about-stat-number">${s.number}</span>
              <span class="about-stat-label">${s.label}</span>
            </div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

// ─── 8. SERVICES ───────────────────────────────────────────────
function renderServices(C) {
  const section = document.getElementById('services-section');
  const s = C.services;
  if (!s?.items?.length) return;

  // Mapa de íconos 3D por ID de plan
  const PLAN_ICONS = {
    pl_001: './assets/icono de planes/icono plan starter.webp',
    pl_002: './assets/icono de planes/icono plan emprendedor.webp',
    pl_003: './assets/icono de planes/icono de plan profesional.webp',
    pl_004: './assets/icono de planes/icono de plan corporativo.webp',
    pl_005: './assets/icono de planes/icono plan partner.webp',
  };

  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">Servicios</span>
      <h2 class="section-title reveal">${s.title}</h2>
      <p class="section-subtitle reveal">${s.subtitle || ''}</p>
    </div>
    <div class="services-grid">
      ${s.items.map((item, i) => {
        const iconSrc = PLAN_ICONS[item.id];
        const iconHtml = iconSrc
          ? `<img src="${iconSrc}" alt="${item.name}" class="service-icon-3d" loading="eager" fetchpriority="high">`
          : `<span>${item.icon}</span>`;
        return `
      <div class="card service-card ${item.highlight ? 'highlight' : ''} reveal reveal-delay-${(i%4)+1}" id="service-${item.id}" data-id="${item.id}" style="cursor: pointer;">
        <div class="service-icon">${iconHtml}</div>
        <h3 class="service-name">${escapeHTML(item.name)}</h3>
        <p class="service-description">${escapeHTML(item.description)}</p>
        ${(item.price || item.duration) ? `
        <div class="service-meta">
          ${item.price ? `<span class="service-price">${item.price}</span>` : '<span></span>'}
          ${item.duration ? `<span class="service-duration">${item.duration}</span>` : ''}
        </div>` : ''}
      </div>`;
      }).join('')}
    </div>
  </div>`;

  // Bind click events to open modal
  section.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const planId = card.dataset.id;
      const plan = s.items.find(i => i.id === planId);
      if (plan) openPlanModal(plan, C);
    });
  });
}

function openPlanModal(plan, C) {
  const overlay = document.getElementById('plan-modal-overlay');
  const content = document.getElementById('plan-modal-content');
  if (!overlay || !content) return;

  const msg = encodeURIComponent(`Hola, mi nombre es [Nombre del Cliente], me dedico a [Actividad/Negocio] y estoy interesado en contratar el ${plan.name.split(' —')[0]}.`);
  const waLink = waUrl(C, decodeURIComponent(msg));

  content.innerHTML = `
  <button class="modal-close" id="plan-modal-close-btn">✕</button>
  <div class="plan-modal-header">
    <div class="plan-modal-icon">${plan.icon}</div>
    <h2 class="plan-modal-title">${plan.name}</h2>
    <div class="plan-modal-price">${plan.price} ${plan.duration || ''}</div>
  </div>
  <div class="plan-modal-body">
    ${plan.focus ? `<div class="plan-modal-focus"><strong>Enfoque:</strong> ${plan.focus}</div>` : ''}
    ${plan.logic ? `<div class="plan-modal-logic"><strong>Lógica:</strong> ${plan.logic}</div>` : ''}
    
    ${plan.details && plan.details.length ? `
    <div class="plan-modal-details">
      <div class="plan-modal-subtitle">Desglose Premium:</div>
      <ul class="plan-modal-list">
        ${plan.details.map(d => `
          <li>
            <div class="plan-modal-bullet">✦</div>
            <div>
              <strong>${d.t}:</strong> ${d.d}
            </div>
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  </div>
  <div class="plan-modal-footer">
    <a href="${waLink}" target="_blank" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; font-size: var(--fs-lg);">Solicitar este Plan</a>
  </div>
  `;

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal('plan-modal-overlay'); });
  content.querySelector('#plan-modal-close-btn').addEventListener('click', () => closeModal('plan-modal-overlay'));
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ─── 9. PORTFOLIO ──────────────────────────────────────────────
function renderPortfolio(C) {
  const section = document.getElementById('portfolio-section');
  const p = C.portfolio;
  if (!p?.items?.length) return;

  // Categorías fijas profesionales — orden canónico
  const FIXED_CATS = ['Todos', 'Portafolios', 'Páginas Web', 'Tiendas Virtuales', 'Herramientas'];

  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">PROYECTOS</span>
      <h2 class="section-title reveal">Proyectos Implementados</h2>
      <p class="section-subtitle reveal">${p.subtitle || ''}</p>
    </div>
    <div class="portfolio-filters reveal">
      ${FIXED_CATS.map(cat =>
        `<button class="portfolio-filter ${cat === 'Todos' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
      ).join('')}
    </div>
    <div class="portfolio-grid" id="portfolio-grid">
      ${p.items.map(item => {
        const hasUrl = item.url && item.url !== '#' && item.url.trim() !== '';
        const tag = hasUrl ? 'a' : 'div';
        const attrs = hasUrl ? `href="${item.url}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';
        const btnHtml = hasUrl
          ? `<span class="btn-invert project-btn">Ver Proyecto</span>`
          : `<span class="btn-invert project-btn" style="cursor: default; pointer-events: none;">Ver Proyecto</span>`;
        return `
      <${tag} ${attrs} class="portfolio-card portfolio-item is-loading reveal" data-id="${item.id}" data-category="${item.category || 'Todos'}" id="port-${item.id}">
        <div class="portfolio-image-wrap">
          <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async" onerror="this.style.opacity='0.3';this.alt='Sin preview';">
        </div>
        <div class="portfolio-overlay">
          <div class="portfolio-badge">${escapeHTML(item.category || '')}</div>
          <div class="portfolio-item-title">${escapeHTML(item.title)}</div>
          ${btnHtml}
        </div>
      </${tag}>`;
      }).join('')}
    </div>
  </div>`;

  const cards = section.querySelectorAll('.portfolio-card, .portfolio-item');
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      if (img.complete) {
        card.classList.remove('is-loading');
      } else {
        img.onload = () => { card.classList.remove('is-loading'); };
        img.onerror = () => { card.classList.remove('is-loading'); };
      }
    }
  });

  // Filtros con transición suave + reveal re-trigger
  section.querySelectorAll('.portfolio-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.portfolio-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      section.querySelectorAll('.portfolio-item').forEach(item => {
        const show = cat === 'Todos' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.classList.remove('visible');
          requestAnimationFrame(() => item.classList.add('visible'));
        }
      });
    });
  });
}

// ─── 10. PRODUCTS ──────────────────────────────────────────────
const cart = { items: [], opened: false };

function renderProducts(C) {
  const section = document.getElementById('products-section');
  const p = C.products;
  if (!p?.items?.length) return;

  const categories = ['Todos', ...new Set(p.items.map(i => i.category).filter(Boolean))];

  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">Catálogo</span>
      <h2 class="section-title reveal">${p.title}</h2>
      <p class="section-subtitle reveal">${p.subtitle || ''}</p>
    </div>
    ${categories.length > 2 ? `
    <div class="products-categories reveal">
      ${categories.map(cat => `
        <button class="products-cat-btn ${cat === 'Todos' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
      `).join('')}
    </div>` : ''}
    <div class="products-grid" id="products-grid">
      ${p.items.map((item, i) => buildProductCard(item, i, C)).join('')}
    </div>
  </div>`;

  // Category filter
  section.querySelectorAll('.products-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.products-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      section.querySelectorAll('.product-card').forEach(card => {
        card.style.display = cat === 'Todos' || card.dataset.category === cat ? '' : 'none';
      });
    });
  });

  // Product card interactions
  section.querySelectorAll('.product-card').forEach(card => {
    card.querySelector('.btn-view-product')?.addEventListener('click', () => {
      const id = card.dataset.id;
      const product = C.products.items.find(p => p.id === id);
      if (product) openProductModal(product, C);
    });
    card.querySelector('.btn-add-cart')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = card.dataset.id;
      const product = C.products.items.find(p => p.id === id);
      if (product) addToCart(product, C);
    });
  });
}

function buildProductCard(item, index, C) {
  const discount = item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : null;
  return `
  <div class="card product-card reveal reveal-delay-${(index % 4) + 1} ${!item.inStock ? 'out-of-stock' : ''}"
       data-id="${item.id}" data-category="${item.category || ''}">
    <div class="product-card-image">
      <img src="${item.images?.[0] || 'https://placehold.co/400/1E1E2E/D4AF37?text=' + encodeURIComponent(item.name)}"
           alt="${item.name}" loading="lazy" decoding="async">
      ${item.badge ? `<div class="product-card-badge">${item.badge}</div>` : ''}
      ${item.inStock ? `
      <div class="product-card-actions-hover">
        <button class="btn btn-ghost btn-sm btn-view-product" id="view-${item.id}">👁 Ver</button>
        <button class="btn btn-primary btn-sm btn-add-cart" id="cart-${item.id}">+ Carrito</button>
      </div>` : ''}
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${item.category}</div>
      <h3 class="product-card-name">${item.name}</h3>
      <p class="product-card-desc">${item.shortDescription}</p>
      <div class="product-card-rating">
        <span class="stars">${'★'.repeat(Math.round(item.rating || 5))}</span>
        <span>${item.rating || 5} (${item.reviewCount || 0})</span>
      </div>
      <div class="product-card-footer">
        <div class="product-price-group">
          <span class="product-price">${C.currencySymbol}${item.price.toFixed(2)}</span>
          ${item.originalPrice ? `<span class="product-original-price">${C.currencySymbol}${item.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        ${item.inStock
          ? `<button class="btn-add-cart" id="add-${item.id}">+ Carrito</button>`
          : `<span style="color:var(--c-text-muted);font-size:var(--fs-sm);">Sin stock</span>`}
      </div>
    </div>
  </div>`;
}

// ─── 11. PRODUCT MODAL ─────────────────────────────────────────
function openProductModal(product, C) {
  const overlay = document.getElementById('product-modal-overlay');
  const content = document.getElementById('product-modal-content');

  content.innerHTML = `
  <button class="modal-close" id="modal-close-btn">✕</button>
  <div class="modal-grid">
    <div class="modal-gallery">
      <img class="modal-main-image" id="modal-main-img"
           src="${product.images?.[0] || ''}" alt="${product.name}">
      ${product.images?.length > 1 ? `
      <div class="modal-thumbnails">
        ${product.images.map((img, i) => `
          <img class="modal-thumb ${i === 0 ? 'active' : ''}"
               src="${img}" alt="" data-index="${i}" loading="lazy">
        `).join('')}
      </div>` : ''}
    </div>
    <div class="modal-info">
      <div class="modal-category">${product.category}</div>
      <h2 class="modal-name">${product.name}</h2>
      <div class="modal-rating">
        <span class="stars">${'★'.repeat(Math.round(product.rating || 5))}</span>
        <span style="color:var(--c-text-muted);font-size:var(--fs-sm);">${product.rating} (${product.reviewCount} reseñas)</span>
      </div>
      <p class="modal-description">${product.fullDescription}</p>
      <div class="modal-price-group">
        <span class="modal-price">${C.currencySymbol}${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="modal-original">${C.currencySymbol}${product.originalPrice.toFixed(2)}</span>` : ''}
      </div>
      ${product.variants?.length ? `
      <div class="modal-variants">
        <div class="modal-variants-title">Talla / Variante:</div>
        <div class="modal-variant-options">
          ${product.variants.map(v => `<button class="modal-variant-btn">${v}</button>`).join('')}
        </div>
      </div>` : ''}
      ${product.features?.length ? `
      <div class="modal-features">
        <div class="modal-features-title">Incluye:</div>
        ${product.features.map(f => `<div class="modal-feature">${f}</div>`).join('')}
      </div>` : ''}
      <div class="modal-actions">
        <button class="btn btn-primary" id="modal-add-cart">🛒 Agregar al Carrito</button>
        <a href="${waUrl(C, `Quiero comprar: ${product.name} (${C.currencySymbol}${product.price})`)}" target="_blank" class="btn btn-ghost" id="modal-buy-wa">💬 Pedir por WhatsApp</a>
      </div>
    </div>
  </div>`;

  // Thumbnails
  content.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      content.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      content.querySelector('#modal-main-img').src = product.images[thumb.dataset.index];
    });
  });

  // Variant selection
  content.querySelectorAll('.modal-variant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.modal-variant-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Add to cart from modal
  content.querySelector('#modal-add-cart')?.addEventListener('click', () => {
    addToCart(product, C);
    closeModal('product-modal-overlay');
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal('product-modal-overlay'); });
  content.querySelector('#modal-close-btn').addEventListener('click', () => closeModal('product-modal-overlay'));
  overlay.classList.add('open');
}

// ─── 12. CART ──────────────────────────────────────────────────
function initCartSidebar(C) {
  if (!C.sections.products) return;

  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');

  sidebar.innerHTML = `
  <div class="cart-header">
    <div style="display:flex;align-items:center;gap:10px;">
      <span class="cart-title">🛒 Carrito</span>
      <span class="cart-count" id="cart-count-badge">0</span>
    </div>
    <button class="cart-close" id="cart-close">✕</button>
  </div>
  <div class="cart-items" id="cart-items-list"><div class="cart-empty"><img src="./logos de botones para redes sociales/BOTON-CARRITO-DE-COMPRA.webp" alt="Carrito vacío" style="width:64px;height:64px;object-fit:contain;opacity:0.5;"><br><small>Tu carrito está vacío</small></div></div>
  <div class="cart-footer">
    <div class="cart-total">
      <span class="cart-total-label">Total</span>
      <span class="cart-total-amount" id="cart-total-amount">${C.currencySymbol}0.00</span>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;" id="cart-checkout-btn">
      💬 Pedir por WhatsApp
    </button>
  </div>`;

  document.getElementById('cart-close').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  // Delegación de eventos del carrito (1 único listener permanente)
  const listEl = document.getElementById('cart-items-list');
  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cart-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.cartAction;
      if (action === 'increment') incrementCartItem(id, C);
      if (action === 'decrement') decrementCartItem(id, C);
      if (action === 'remove') removeFromCart(id, C);
    });
  }

  document.getElementById('cart-checkout-btn').addEventListener('click', () => {
    if (!cart.items.length) return;
    const itemsList = cart.items.map(i => `• ${i.name} x${i.qty} = ${C.currencySymbol}${(i.price * i.qty).toFixed(2)}`).join('\n');
    const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = (C.products?.whatsappOrderMessage || 'Hola! Quiero ordenar:\n{products}\n\nTotal: {total}')
      .replace('{products}', itemsList)
      .replace('{total}', `${C.currencySymbol}${total.toFixed(2)}`);
    window.open(waUrl(C, msg), '_blank');
  });
}

function addToCart(product, C) {
  const cartIcon = document.querySelector('.cart-icon') || document.getElementById('nav-cart-img');
  if (cartIcon) {
    cartIcon.classList.remove('cart-pulse-active'); // Reseteo preventivo
    void cartIcon.offsetWidth; // Forzar reflow del navegador para reiniciar animación en caliente
    cartIcon.classList.add('cart-pulse-active');
    
    // Remoción limpia al culminar los fotogramas clave
    setTimeout(() => {
      cartIcon.classList.remove('cart-pulse-active');
    }, 550);
  }

  const existing = cart.items.find(i => i.id === product.id);
  if (existing) { existing.qty++; }
  else { cart.items.push({ id: product.id, name: product.name, price: product.price, image: product.images?.[0], qty: 1 }); }
  updateCartUI(C);
  openCart();
  animateCartBadge();
}

function incrementCartItem(id, C) {
  const item = cart.items.find(i => i.id === id);
  if (item) { item.qty++; updateCartUI(C); }
}

function decrementCartItem(id, C) {
  const item = cart.items.find(i => i.id === id);
  if (item) {
    item.qty--;
    if (item.qty <= 0) removeFromCart(id, C);
    else updateCartUI(C);
  }
}

function removeFromCart(id, C) {
  cart.items = cart.items.filter(i => i.id !== id);
  updateCartUI(C);
}

function updateCartUI(C) {
  const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.items.reduce((s, i) => s + i.qty, 0);

  const badge = document.getElementById('cart-badge');
  const countBadge = document.getElementById('cart-count-badge');
  const totalEl = document.getElementById('cart-total-amount');
  const listEl  = document.getElementById('cart-items-list');

  if (badge) { badge.textContent = count; badge.classList.toggle('show', count > 0); }
  if (countBadge) countBadge.textContent = count;
  if (totalEl) totalEl.textContent = `${C.currencySymbol}${total.toFixed(2)}`;
  if (listEl) {
    if (!cart.items.length) {
      listEl.innerHTML = '<div class="cart-empty"><img src="./logos de botones para redes sociales/BOTON-CARRITO-DE-COMPRA.webp" alt="Carrito vacío" style="width:64px;height:64px;object-fit:contain;opacity:0.5;"><br><small>Tu carrito está vacío</small></div>';
    } else {
      listEl.innerHTML = cart.items.map(item => `
        <div class="cart-item" data-item-id="${item.id}">
          <img class="cart-item-image" src="${item.image || 'https://placehold.co/70/1E1E2E/D4AF37?text=P'}" alt="${escapeHTML(item.name)}">
          <div>
            <div class="cart-item-name">${escapeHTML(item.name)}</div>
            <div class="cart-item-price">${C.currencySymbol}${(item.price * item.qty).toFixed(2)}</div>
            <div style="font-size:var(--fs-xs);color:var(--c-text-muted);display:flex;align-items:center;gap:6px;margin-top:4px;">
              <button class="cart-qty-btn" data-id="${item.id}" data-cart-action="decrement" style="padding:0 6px;cursor:pointer;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;color:var(--c-text);">-</button>
              <span>Cant: ${item.qty}</span>
              <button class="cart-qty-btn" data-id="${item.id}" data-cart-action="increment" style="padding:0 6px;cursor:pointer;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;color:var(--c-text);">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" data-cart-action="remove" title="Eliminar">✕</button>
        </div>`).join('');
    }
  }
}

function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function animateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.style.transform = 'scale(1.5)';
  setTimeout(() => badge.style.transform = '', 250);
}

// ─── 13. DIGITAL PRODUCTS ──────────────────────────────────────
function renderDigital(C) {
  const section = document.getElementById('digital-section');
  const d = C.digital;
  if (!d?.items?.length) return;

  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">Productos Digitales</span>
      <h2 class="section-title reveal">${d.title}</h2>
      <p class="section-subtitle reveal">${d.subtitle || ''}</p>
    </div>
    ${d.items.map(item => buildDigitalCard(item, C)).join('')}
  </div>`;

  // Bind buttons
  d.items.forEach(item => {
    const buyBtn = document.getElementById(`buy-digital-${item.id}`);
    const codeBtn = document.getElementById(`code-digital-${item.id}`);
    if (buyBtn) buyBtn.addEventListener('click', () => buyDigital(item, C));
    if (codeBtn) codeBtn.addEventListener('click', () => openAccessModal(item, C));
  });
}

function buildDigitalCard(item, C) {
  const isUnlocked = isProductUnlocked(item.id);
  const typeLabels = { pdf: '📄 PDF', audio: '🎵 Audio', video: '🎬 Video', zip: '📦 Archivo Zip' };
  return `
  <div class="card digital-card reveal" id="digital-${item.id}">
    <div class="digital-mockup-wrap">
      <img class="digital-mockup" src="${item.mockupImage || 'https://placehold.co/280x350/1E1E2E/D4AF37?text=' + encodeURIComponent(item.name)}" alt="${item.name}">
      <div class="digital-type-badge">${typeLabels[item.type] || '📁 Digital'}</div>
      ${!isUnlocked ? `
      <div class="digital-lock-overlay">
        <div class="lock-icon">🔒</div>
        <div class="lock-text">${item.previewDescription || 'Compra para acceder'}</div>
      </div>` : `
      <div class="digital-lock-overlay" style="background:linear-gradient(to bottom,transparent,rgba(0,0,0,0.6))">
        <div class="lock-icon" style="background:rgba(74,222,128,0.15);border-color:rgba(74,222,128,0.4);">✅</div>
        <div class="lock-text" style="color:#4ADE80;">¡Acceso Desbloqueado!</div>
      </div>`}
    </div>
    <div class="digital-info">
      ${item.badge ? `<span class="badge badge-primary" style="margin-bottom:12px;">${item.badge}</span>` : ''}
      <h2 class="digital-name">${item.name}</h2>
      <p class="digital-description">${item.description}</p>
      ${item.includes?.length ? `
      <div class="digital-includes">
        <div class="digital-includes-title">¿Qué incluye?</div>
        ${item.includes.map(inc => `<div class="digital-include-item">${inc}</div>`).join('')}
      </div>` : ''}
      <div class="digital-price-group">
        <span class="digital-price">${C.currencySymbol}${item.price?.toFixed(2)}</span>
        ${item.originalPrice ? `<span class="digital-original">${C.currencySymbol}${item.originalPrice.toFixed(2)}</span>` : ''}
      </div>
      <div class="digital-actions">
        ${isUnlocked
          ? `<a href="${item.contentFile || '#'}" class="btn btn-primary" download target="_blank" id="download-digital-${item.id}">⬇️ Descargar Ahora</a>`
          : `<button class="btn btn-primary" id="buy-digital-${item.id}">💫 Comprar — ${C.currencySymbol}${item.price}</button>
             <button class="btn btn-outline" id="code-digital-${item.id}">🔑 Ingresar Código</button>`}
      </div>
      <div class="digital-guarantee">🛡️ Satisfacción garantizada. Si tienes problemas, contáctanos por WhatsApp.</div>

      <!-- 🔌 FUTURE: Sección de pago automático (activar cuando el cliente lo solicite) -->
      <div class="payment-gateway-section" id="gateway-${item.id}">
        <p style="color:var(--c-text-muted);font-size:var(--fs-sm);">Pago automático próximamente</p>
        <div id="gateway-container-${item.id}">
          <!-- MercadoPago / Stripe / PayPal se inyecta aquí -->
        </div>
      </div>
    </div>
  </div>`;
}

function buyDigital(item, C) {
  const msg = `Hola! Quiero comprar: *${item.name}*\nPrecio: ${C.currencySymbol}${item.price}\n\nPor favor indícame cómo realizar el pago. 😊`;
  window.open(waUrl(C, msg), '_blank');
}

function openAccessModal(item, C) {
  const overlay = document.getElementById('access-modal-overlay');
  const content = document.getElementById('access-modal-content');
  content.innerHTML = `
  <button class="modal-close" style="position:absolute;top:16px;right:16px;" id="access-close">✕</button>
  <div class="access-modal-icon">🔑</div>
  <h3 class="access-modal-title">Ingresar Código de Acceso</h3>
  <p class="access-modal-desc">${item.unlock?.codeHint || 'Ingresa el código que recibiste al comprar.'}</p>
  <input type="text" class="access-code-input" id="access-input-${item.id}"
    placeholder="XXXXXXXX" maxlength="20" autocomplete="off">
  <div class="access-code-error" id="access-error-${item.id}">Código incorrecto. Intenta nuevamente.</div>
  <button class="btn btn-primary" style="width:100%;justify-content:center;" id="access-submit-${item.id}">
    ✅ Desbloquear
  </button>
  <div class="access-hint">${item.unlock?.codeHint || '¿No tienes el código? Compra por WhatsApp primero.'}</div>`;

  const input = document.getElementById(`access-input-${item.id}`);
  const error = document.getElementById(`access-error-${item.id}`);
  const submitBtn = document.getElementById(`access-submit-${item.id}`);

  function verifyCode() {
    const entered = input.value.trim().toUpperCase();
    const correct = (item.unlock?.code || '').toUpperCase();
    if (entered === correct) {
      unlockProduct(item.id, C);
      closeModal('access-modal-overlay');
    } else {
      input.classList.add('error');
      error.classList.add('show');
      setTimeout(() => { input.classList.remove('error'); input.value = ''; }, 1200);
    }
  }

  input.addEventListener('keydown', e => { if (e.key === 'Enter') verifyCode(); });
  submitBtn.addEventListener('click', verifyCode);
  document.getElementById('access-close').addEventListener('click', () => closeModal('access-modal-overlay'));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal('access-modal-overlay'); });
  overlay.classList.add('open');
  setTimeout(() => input.focus(), 300);
}

function isProductUnlocked(id) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlockedDigital') || '[]');
    return unlocked.includes(id);
  } catch { return false; }
}

function unlockProduct(id, C) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlockedDigital') || '[]');
    if (!unlocked.includes(id)) unlocked.push(id);
    localStorage.setItem('unlockedDigital', JSON.stringify(unlocked));
    // Reload the digital section to show unlocked state
    renderDigital(C);
  } catch(e) { console.error(e); }
}

// ─── 14. TESTIMONIALS ──────────────────────────────────────────
function renderTestimonials(C) {
  const section = document.getElementById('testimonials-section');
  const t = C.testimonials;
  if (!t?.items?.length) return;
  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">Reseñas</span>
      <h2 class="section-title reveal">${t.title}</h2>
      <p class="section-subtitle reveal">${t.subtitle || ''}</p>
    </div>
    <div class="testimonials-grid">
      ${t.items.map((item, i) => `
      <div class="card testimonial-card reveal reveal-delay-${(i%3)+1}">
        <div class="testimonial-stars">${'★'.repeat(item.rating || 5)}</div>
        <p class="testimonial-text">${item.text}</p>
        <div class="testimonial-author">
          <img class="testimonial-photo" src="${item.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1E1E2E&color=D4AF37&size=80`}" alt="${item.name}" loading="lazy">
          <div>
            <div class="testimonial-name">${item.name}</div>
            <div class="testimonial-location">${item.location || ''}</div>
          </div>
          ${item.platform ? `<span class="testimonial-platform">${item.platform}</span>` : ''}
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

// ─── 15. FAQ ───────────────────────────────────────────────────
function renderFaq(C) {
  const section = document.getElementById('faq-section');
  const f = C.faq;
  if (!f?.items?.length) return;
  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">FAQ</span>
      <h2 class="section-title reveal">${f.title}</h2>
      <p class="section-subtitle reveal">${f.subtitle || ''}</p>
    </div>
    <div class="faq-list">
      ${f.items.map((item, i) => `
      <div class="faq-item reveal reveal-delay-${(i%4)+1}" id="faq-item-${i}">
        <button class="faq-question" data-faq="${i}">
          ${escapeHTML(item.question)}
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${escapeHTML(item.answer)}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;

  section.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      section.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked (if wasn't open)
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── 16. CONTACT ───────────────────────────────────────────────
function renderContact(C) {
  const section = document.getElementById('contact-section');
  const co = C.contact;
  const socials = buildSocialLinks(C.social, 'contact');
  const whatsappUrl = waUrl(C);
  section.innerHTML = `
  <div class="container">
    <div class="section-header">
      <span class="section-label">Contacto</span>
      <h2 class="section-title reveal">Estamos para Ayudarte</h2>
    </div>
    <div class="contact-grid">
      <div class="reveal">
        <h3 class="contact-info-title">Hablemos</h3>
        <p class="contact-info-desc">No dudes en contactarnos por cualquiera de estos canales. Respondemos rápido.</p>
        <div class="contact-items">
          ${co?.whatsapp ? `<div class="contact-item">
            <div class="contact-item-icon"><img src="./logos de botones para redes sociales/BOTON-WHATSAPP.webp" alt="WhatsApp" style="width:28px;height:28px;object-fit:contain;"></div>
            <div>
              <div class="contact-item-label">WhatsApp</div>
              <a href="${C.whatsapp || 'https://wa.me/teredicrom?s=t'}" target="_blank" rel="noopener noreferrer" class="contact-item-value" id="contact-wa-link">Canal Oficial QR</a>
            </div>
          </div>` : ''}
          ${(co?.email || C.email) ? `<div class="contact-item">
            <div class="contact-item-icon"><img src="./logos de botones para redes sociales/BOTON-EMAIL.webp" alt="Email" style="width:28px;height:28px;object-fit:contain;"></div>
            <div>
              <div class="contact-item-label">Correo</div>
              <a href="mailto:${C.email || co?.email}" class="contact-item-value" id="contact-email-link">${C.email || co?.email}</a>
            </div>
          </div>` : ''}
          ${co?.address ? `<div class="contact-item">
            <div class="contact-item-icon"><img src="./logos de botones para redes sociales/ICONO-UBICACION.webp" alt="Dirección" style="width:28px;height:28px;object-fit:contain;"></div>
            <div>
              <div class="contact-item-label">Dirección</div>
              <span class="contact-item-value">${co.address}</span>
            </div>
          </div>` : ''}
          ${(co?.schedule || C.schedule) ? `<div class="contact-item">
            <div class="contact-item-icon">🕐</div>
            <div>
              <div class="contact-item-label">Horario</div>
              <span class="contact-item-value">Horario: ${C.schedule || co?.schedule || '24/7'}</span>
            </div>
          </div>` : ''}
        </div>
        ${socials ? `<div class="social-links">${socials}</div>` : ''}
      </div>
      <div class="reveal reveal-delay-2">
        <div class="card contact-card">
          <h3 class="contact-card-title">Escríbenos Ahora</h3>
          <p class="contact-card-desc">Haz clic en el botón y te atenderemos de inmediato por WhatsApp.</p>
          <a href="${C.whatsapp || 'https://wa.me/teredicrom?s=t'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-invert" style="width:100%;justify-content:center;gap:12px;" id="contact-wa-btn">
            Abrir WhatsApp
          </a>
          <p class="contact-card-cta">O también puedes <a href="mailto:${C.email || co?.email || ''}">enviarnos un correo</a></p>
          <form action="https://api.web3forms.com/submit" method="POST" id="contact-form" style="margin-top:var(--space-lg);display:flex;flex-direction:column;gap:var(--space-sm);">
            <input type="hidden" name="access_key" value="${C.access_key || '72981d4f-66f6-4fba-8fb6-75bfa899c4b1'}">
            <input type="hidden" name="subject" value="Nuevo mensaje desde LANDIRIANOS SITE">
            <input type="hidden" name="from_name" value="LANDIRIANOS SITE Web">
            <input type="text" name="name" placeholder="Tu nombre" required class="form-input" style="width:100%;padding:var(--space-sm) var(--space-md);border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:var(--c-text);font-size:var(--fs-sm);">
            <input type="email" name="email" placeholder="Tu correo electrónico" required class="form-input" style="width:100%;padding:var(--space-sm) var(--space-md);border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:var(--c-text);font-size:var(--fs-sm);">
            <textarea name="message" placeholder="Tu mensaje..." required rows="4" class="form-textarea" style="width:100%;padding:var(--space-sm) var(--space-md);border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:var(--c-text);font-size:var(--fs-sm);resize:vertical;"></textarea>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;" id="contact-form-submit">✉️ Enviar Mensaje</button>
          </form>
          ${C.paymentMethods?.length ? `
          <div class="payment-methods">
            ${C.paymentMethods.map(m => `<span class="payment-badge">${m}</span>`).join('')}
          </div>` : ''}
        </div>
        ${co?.mapEmbed ? `
        <div class="map-embed" style="margin-top:var(--space-lg);">
          <iframe src="${co.mapEmbed}" width="100%" height="280" style="border:0;" allowfullscreen loading="lazy"></iframe>
        </div>` : ''}
      </div>
    </div>
  </div>`;

  const contactForm = section.querySelector('#contact-form') || document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn-invert');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';
      if (submitBtn) { submitBtn.innerHTML = 'Enviando...'; submitBtn.style.pointerEvents = 'none'; }

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.');
          contactForm.reset();
        } else {
          alert('Hubo un inconveniente en el envío: ' + result.message);
        }
      })
      .catch(function (error) {
        console.error('Error de red en Web3Forms:', error);
        alert('Error de conexión. Inténtalo de nuevo más tarde.');
      })
      .finally(function () {
        if (submitBtn) { submitBtn.innerHTML = originalText; submitBtn.style.pointerEvents = 'auto'; }
      });
    });
  }

  const waBtn = section.querySelector('#contact-wa-btn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = C?.contact?.whatsapp || 'https://wa.me/teredicrom?s=t';
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

// ─── 17. FOOTER ────────────────────────────────────────────────
function renderFooter(C) {
  const footer = document.getElementById('footer');
  const navSections = [];
  if (C.sections.about)       navSections.push({ href: '#about-section', label: 'Nosotros' });
  if (C.sections.services)    navSections.push({ href: '#services-section', label: 'Servicios' });
  if (C.sections.products)    navSections.push({ href: '#products-section', label: 'Productos' });
  if (C.sections.digital)     navSections.push({ href: '#digital-section', label: 'Digitales' });
  if (C.sections.testimonials)navSections.push({ href: '#testimonials-section', label: 'Reseñas' });
  if (C.sections.faq)         navSections.push({ href: '#faq-section', label: 'FAQ' });
  if (C.sections.contact)     navSections.push({ href: '#contact-section', label: 'Contacto' });

  const socialIconMap = {
    instagram: '<img src="./logos de botones para redes sociales/BOTON-INSTAGRAM.webp" alt="Instagram" style="width:22px;height:22px;object-fit:contain;">', 
    facebook:  '<img src="./logos de botones para redes sociales/BOTON-FACEBOOK.webp" alt="Facebook" style="width:22px;height:22px;object-fit:contain;">', 
    tiktok:    '<img src="./logos de botones para redes sociales/BOTON-TIKTOK.webp" alt="TikTok" style="width:22px;height:22px;object-fit:contain;">', 
    linkedin:  '<img src="./logos de botones para redes sociales/BOTON-LINKND.webp" alt="LinkedIn" style="width:22px;height:22px;object-fit:contain;">', 
    youtube: '▶️', twitter: '🐦', spotify: '🎧', pinterest: '📌', behance: '🎨'
  };

  footer.innerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">${C.businessName}</div>
        <p class="footer-brand-desc">${C.businessDescription || C.businessSlogan}</p>
        <div class="social-links">
          ${Object.entries(C.social || {}).filter(([,v]) => v).map(([k, url]) => {
            let linkUrl = url;
            if (k === 'instagram') linkUrl = C.instagram || (typeof CONFIG !== 'undefined' && CONFIG.instagram) || url;
            if (k === 'linkedin') linkUrl = C.linkedin || (typeof CONFIG !== 'undefined' && CONFIG.linkedin) || url;
            return `
            <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="social-link" id="footer-social-${k}" title="${k}">${socialIconMap[k] || '🔗'}</a>
          `;
          }).join('')}
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navegación</div>
        <div class="footer-links">
          ${navSections.map(s => `<a href="${s.href}" class="footer-link">${s.label}</a>`).join('')}
        </div>
      </div>
      <div>
        <div class="footer-col-title">Contacto</div>
        <div class="footer-links">
          ${C.contact?.whatsapp ? `<a href="${waUrl(C)}" target="_blank" class="footer-link" id="footer-wa">💬 WhatsApp</a>` : ''}
          ${C.contact?.email ? `<a href="mailto:${C.contact.email}" class="footer-link" id="footer-email">✉️ ${C.contact.email}</a>` : ''}
          ${C.contact?.schedule ? `<span class="footer-link">🕐 ${C.contact.schedule}</span>` : ''}
        </div>
      </div>
      ${C.paymentMethods?.length ? `
      <div>
        <div class="footer-col-title">Aceptamos</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${C.paymentMethods.map(m => `<span class="payment-badge">${m}</span>`).join('')}
        </div>
      </div>` : '<div></div>'}
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">
        © ${new Date().getFullYear()} ${C.businessName}. Todos los derechos reservados.
        Hecho con ❤️ por <a href="#" target="_blank">LANDIRIANOS SITE</a>
      </span>
    </div>
  </div>`;
}

// ─── 18. FLOATING BUTTONS ──────────────────────────────────────
function renderFloatingButtons(C) {
  const fb = C.floatingButtons || {};
  const container = document.getElementById('floating-buttons');
  if (!container) return;

  // Posición
  const pos = fb.whatsapp?.position || 'bottom-right';
  if (pos === 'bottom-left') container.classList.add('left');

  let html = '';

  // Scroll to top
  if (fb.scrollTop?.enabled !== false) {
    html += `<button class="floating-btn floating-btn-scroll" id="scroll-top-btn" title="Volver arriba">↑</button>`;
  }



  // Phone
  if (fb.phone?.enabled && fb.phone?.number) {
    html += `<a href="tel:${fb.phone.number}" class="floating-btn floating-btn-phone" id="float-phone-btn" title="Llamar">
      <img src="./logos de botones para redes sociales/BOTON-EMAIL.webp" alt="Teléfono" style="width:100%;height:100%;object-fit:contain;"><span class="floating-btn-label">Llamar</span></a>`;
  }

  // WhatsApp (siempre último = más abajo = más visible)
  if (fb.whatsapp?.enabled !== false) {
    html += `<a href="${C.whatsapp || 'https://wa.me/teredicrom?s=t'}" target="_blank" rel="noopener noreferrer"
      class="floating-btn floating-btn-whatsapp ${fb.whatsapp?.pulse ? 'pulse' : ''}"
      id="float-wa-btn" title="WhatsApp">
      <img src="./logos de botones para redes sociales/BOTON-WHATSAPP.webp" alt="WhatsApp" style="width:100%;height:100%;object-fit:contain;"><span class="floating-btn-label">WhatsApp</span>
    </a>`;
  }

  container.innerHTML = html;

  // Scroll to top logic
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

// ─── 19. MUSIC PLAYER ──────────────────────────────────────────
function renderMusicPlayer(C) {
  const bubble = document.getElementById('music-bubble');
  const m = C.music;
  if (!m?.audioFile) { bubble.style.display = 'none'; return; }
  bubble.style.display = 'block';

  bubble.innerHTML = `
  <div class="music-player-card" id="music-card">
    ${m.coverImage ? `<img class="music-player-cover" src="${m.coverImage}" alt="Cover">` : ''}
    <div class="music-player-title">${m.title || 'Reproduciendo'}</div>
    <div class="music-player-artist">${m.artist || ''}</div>
    <div class="music-player-controls">
      <span class="music-ctrl-btn" id="music-play-btn">▶️</span>
      <span class="music-ctrl-btn" id="music-mute-btn">🔊</span>
    </div>
    <div class="music-progress" id="music-bar"><div class="music-progress-fill" id="music-fill"></div></div>
  </div>
  <div class="music-bubble-mini" id="music-mini">🎵</div>`;

  const audio = new Audio(m.audioFile);
  audio.loop = true;
  let isPlaying = false;

  document.getElementById('music-mini').addEventListener('click', () => bubble.classList.toggle('expanded'));
  document.getElementById('music-play-btn').addEventListener('click', () => {
    if (isPlaying) { audio.pause(); document.getElementById('music-play-btn').textContent = '▶️'; }
    else { audio.play(); document.getElementById('music-play-btn').textContent = '⏸️'; }
    isPlaying = !isPlaying;
  });
  document.getElementById('music-mute-btn').addEventListener('click', () => {
    audio.muted = !audio.muted;
    document.getElementById('music-mute-btn').textContent = audio.muted ? '🔇' : '🔊';
  });
  audio.addEventListener('timeupdate', () => {
    const fill = document.getElementById('music-fill');
    if (fill && audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
  });
}

// ─── 20. SCROLL REVEAL & EFFECTS ───────────────────────────────
function initScrollEffects(C) {
  if (!C.effects?.animations) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '100px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── 21. ADMIN ─────────────────────────────────────────────────
function initAdminShortcut(C) {}
function goToAdmin() {}

// ─── 22. UTILITIES ─────────────────────────────────────────────
function waUrl(C, msg) {
  const base = C?.contact?.whatsapp || "https://wa.me/teredicrom?s=t";
  if (msg) {
    const connector = base.includes('?') ? '&' : '?';
    return `${base}${connector}text=${encodeURIComponent(msg)}`;
  }
  return base;
}

function buildSocialLinks(social, context) {
  if (!social) return '';
  const icons = {
    instagram: '<img src="./logos de botones para redes sociales/BOTON-INSTAGRAM.webp" alt="Instagram" class="hero-sub-icon">',
    facebook:  '<img src="./logos de botones para redes sociales/BOTON-FACEBOOK.webp" alt="Facebook" class="hero-sub-icon">',
    tiktok:    '<img src="./logos de botones para redes sociales/BOTON-TIKTOK.webp" alt="TikTok" class="hero-sub-icon">',
    youtube:   '▶️', twitter: '🐦', spotify: '🎧',
    linkedin:  '<img src="./logos de botones para redes sociales/BOTON-LINKND.webp" alt="LinkedIn" class="hero-sub-icon">',
    pinterest: '📌', behance: '🎨'
  };
  return Object.entries(social).filter(([,v]) => v).map(([k, url]) => {
    let linkUrl = url;
    if (k === 'instagram') linkUrl = (typeof CONFIG !== 'undefined' && CONFIG.instagram) || url;
    if (k === 'linkedin') linkUrl = (typeof CONFIG !== 'undefined' && CONFIG.linkedin) || url;
    return `
    <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="hero-social-link social-link"
       id="${context}-social-${k}" title="${k}">${icons[k] || '🔗'}</a>
  `;
  }).join('');
}

function closeModal(overlayId) {
  document.getElementById(overlayId)?.classList.remove('open');
  document.body.style.overflow = '';
}

function hideSections(C) {
  const secMap = {
    about: 'about-section', services: 'services-section', portfolio: 'portfolio-section',
    products: 'products-section', digital: 'digital-section', testimonials: 'testimonials-section',
    faq: 'faq-section', contact: 'contact-section'
  };
  Object.entries(secMap).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) el.style.display = C.sections[key] ? '' : 'none';
  });
}

console.log('✅ App.js cargado y ejecutando...');

// ─── 20. PREMIUM TEMPLATES ENGINE ──────────────────────────────
// Orquesta la activación de data-attributes en <body> según
// las variantes elegidas en el panel admin (premiumTemplates).
// CSS y JS de ./PLANTILLAS/ leen estos atributos para conmutar
// estilos sin tocar las variables base de themes.js ni el carrito.
function applyPremiumTemplates(C) {
  const PT = C.premiumTemplates || {};
  const root = document.body;

  // Limpia cualquier estado previo antes de aplicar variante nueva
  root.setAttribute('data-palette',    PT.activePaletteCatalog    || 'default');
  root.setAttribute('data-bg-effect',  PT.activeBackgroundEffect  || 'default');
  root.setAttribute('data-typo-effect', PT.activeTypographyEffect || 'default');
  root.setAttribute('data-cart-style', PT.activeCreativeCartForm  || 'default');
  root.setAttribute('data-faq-style',  PT.activeCreativeFaqForm   || 'default');
  root.setAttribute('data-section-fx', PT.activeFuturisticSection || 'default');
}

// ─── 23. INTRO VIDEO PLAYBACK ──────────────────────────────────
function handleIntroPlayback() {
  const layer = document.getElementById('landirianos-intro-layer');
  const video = document.getElementById('intro-video');
  if (!layer || !video) return;

  video.onended = () => { dismissIntro(layer); };
  setTimeout(() => { dismissIntro(layer); }, 5000);
}

function dismissIntro(layer) {
  if (layer.style.visibility === 'hidden') return;
  layer.style.opacity = '0';
  layer.style.visibility = 'hidden';
  setTimeout(() => { layer.remove(); }, 600);
}

window.addEventListener('DOMContentLoaded', handleIntroPlayback);

// Web3Forms Asynchronous Controller
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn-invert');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';
    if (submitBtn) { submitBtn.innerHTML = 'Enviando...'; submitBtn.style.pointerEvents = 'none'; }

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: json
    })
    .then(function (res) { return res.json(); })
    .then(function (result) {
      if (result.success) {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.');
        contactForm.reset();
      } else {
        alert('Hubo un inconveniente en el envío: ' + result.message);
      }
    })
    .catch(function (error) {
      console.error('Error de red en Web3Forms:', error);
      alert('Error de conexión. Inténtalo de nuevo más tarde.');
    })
    .finally(function () {
      if (submitBtn) { submitBtn.innerHTML = originalText; submitBtn.style.pointerEvents = 'auto'; }
    });
  });
}

