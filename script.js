/* ============================================
   BERK UZAN — Premium Portfolio
   Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Scroll Progress --- */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* --- Sticky Nav --- */
  function initNav() {
    const header = document.querySelector('.nav-header');
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile-menu');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && mobileMenu) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('is-active');
          mobileMenu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        });
      });
    }

    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }
      });
    });
  }

  /* --- Gradient Mesh Canvas --- */
  function initHeroCanvas() {
    const canvas = document.querySelector('.hero__canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0.5, mouseY = 0.5;
    let targetMouseX = 0.5, targetMouseY = 0.5;
    let animationId;

    const blobs = [
      { x: 0.3, y: 0.4, radius: 0.35, color: [139, 92, 246], speed: 0.0003, offset: 0 },
      { x: 0.7, y: 0.3, radius: 0.3, color: [59, 130, 246], speed: 0.0004, offset: 2 },
      { x: 0.5, y: 0.7, radius: 0.28, color: [6, 182, 212], speed: 0.00035, offset: 4 },
      { x: 0.2, y: 0.6, radius: 0.22, color: [167, 139, 250], speed: 0.00025, offset: 1 },
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      const parallaxX = (mouseX - 0.5) * 40;
      const parallaxY = (mouseY - 0.5) * 40;

      blobs.forEach(blob => {
        const t = time * blob.speed + blob.offset;
        const bx = (blob.x + Math.sin(t) * 0.08 + (mouseX - 0.5) * 0.05) * width + parallaxX;
        const by = (blob.y + Math.cos(t * 0.8) * 0.06 + (mouseY - 0.5) * 0.05) * height + parallaxY;
        const r = blob.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        gradient.addColorStop(0, `rgba(${blob.color.join(',')}, 0.18)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.join(',')}, 0.06)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      targetMouseX = e.clientX / width;
      targetMouseY = e.clientY / height;
    }

    function lerpMouse() {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      requestAnimationFrame(lerpMouse);
    }

    resize();
    window.addEventListener('resize', resize);

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      lerpMouse();
      animationId = requestAnimationFrame(draw);
    } else {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.fillRect(0, 0, width, height);
    }

    return () => cancelAnimationFrame(animationId);
  }

  /* --- Typewriter --- */
  function initTypewriter() {
    const el = document.querySelector('.typewriter__text');
    if (!el || prefersReducedMotion) {
      if (el) el.textContent = 'Developer • Game Creator • AI Explorer • Rap & Cinema Enthusiast';
      return;
    }

    const text = 'Developer • Game Creator • AI Explorer • Rap & Cinema Enthusiast';
    let index = 0;
    const speed = 45;

    function type() {
      if (index <= text.length) {
        el.textContent = text.slice(0, index);
        index++;
        setTimeout(type, speed + Math.random() * 30);
      }
    }

    setTimeout(type, 800);
  }

  /* --- Glitch Reveal --- */
  function initGlitch() {
    const el = document.querySelector('.glitch');
    if (!el || prefersReducedMotion) return;

    setTimeout(() => {
      el.classList.add('is-glitching');
      setTimeout(() => el.classList.remove('is-glitching'), 300);
    }, 400);
  }

  /* --- Scroll Reveal (IntersectionObserver) --- */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* --- Project Card Tilt --- */
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length || prefersReducedMotion) return;

    cards.forEach(card => {
      const inner = card.querySelector('.project-card__inner');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        inner.style.transform = `
          perspective(1000px)
          rotateY(${x * 8}deg)
          rotateX(${-y * 8}deg)
          scale(1.02)
        `;
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = '';
      });
    });
  }

  /* --- Project Modal --- */
  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const backdrop = modal.querySelector('.modal__backdrop');
    const closeBtn = modal.querySelector('.modal__close');
    const dismissBtn = modal.querySelector('.modal__dismiss');
    const titleEl = modal.querySelector('.modal__title');
    const descEl = modal.querySelector('.modal__desc');
    const tagsEl = modal.querySelector('.modal__tags');

    const projectData = {
      'unity-ml': {
        title: 'Unity ML NPC System',
        desc: 'A machine learning pipeline for dynamic NPC behavior in Unity. Features adaptive dialogue trees, real-time decision making, and behavior trees that evolve based on player interactions. Built with C# and integrated ML-Agents toolkit.',
        tags: ['Unity', 'AI', 'C#'],
        tagClasses: ['tag--unity', 'tag--ai', 'tag--csharp'],
      },
      'flutter-social': {
        title: 'Flutter Social App',
        desc: 'Cross-platform social application with real-time feeds, clean architecture (BLoC pattern), and polished micro-interactions. Optimized for performance with lazy loading and efficient state management.',
        tags: ['Flutter', 'Mobile'],
        tagClasses: ['tag--flutter', 'tag--mobile'],
      },
      'ai-words': {
        title: 'AI Word Generator Tool',
        desc: 'An intelligent word generation utility powered by language models. Designed for writers, developers, and creative workflows with customizable output styles and context-aware suggestions.',
        tags: ['AI', 'Web'],
        tagClasses: ['tag--ai', 'tag--web'],
      },
      'game-prototypes': {
        title: 'Game Prototype Experiments',
        desc: 'A collection of rapid game prototypes exploring mechanics, feel, and emergent gameplay. From physics puzzles to narrative sandboxes — each prototype tests a unique design hypothesis.',
        tags: ['Unity', 'Game Dev'],
        tagClasses: ['tag--unity', 'tag--game'],
      },
    };

    function openModal(projectId) {
      const data = projectData[projectId];
      if (!data) return;

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      tagsEl.innerHTML = data.tags
        .map((tag, i) => `<span class="tag ${data.tagClasses[i]}">${tag}</span>`)
        .join('');

      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { modal.hidden = true; }, 400);
    }

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.project));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card.dataset.project);
        }
      });
    });

    [backdrop, closeBtn, dismissBtn].forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  /* --- Skills Animation --- */
  function initSkills() {
    const section = document.querySelector('.skills');
    if (!section) return;

    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;

            document.querySelectorAll('.skill-bar').forEach(bar => {
              const value = bar.dataset.value;
              const fill = bar.querySelector('.skill-bar__fill');
              if (fill) {
                fill.style.setProperty('--fill-width', value + '%');
                fill.classList.add('is-animated');
              }
            });

            document.querySelectorAll('.radial-chart__ring').forEach(ring => {
              const r = parseFloat(ring.getAttribute('r'));
              const circumference = 2 * Math.PI * r;
              const value = parseFloat(ring.dataset.value);
              ring.style.strokeDasharray = circumference;
              ring.style.strokeDashoffset = circumference;
              requestAnimationFrame(() => {
                ring.style.strokeDashoffset = circumference - (circumference * value) / 100;
              });
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    const categories = document.querySelectorAll('.skill-category');
    categories.forEach(cat => {
      cat.addEventListener('mouseenter', () => {
        categories.forEach(c => c.classList.remove('is-highlighted'));
        cat.classList.add('is-highlighted');
      });
      cat.addEventListener('mouseleave', () => {
        cat.classList.remove('is-highlighted');
      });
    });
  }

  /* --- Contact Form --- */
  function initContactForm() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn--submit');
      const originalText = btn.querySelector('span:last-child').textContent;

      btn.querySelector('span:last-child').textContent = 'Sent ✓';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.querySelector('span:last-child').textContent = originalText;
        btn.style.pointerEvents = '';
        form.reset();
      }, 2500);
    });
  }

  /* --- Active Nav Link --- */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    function updateActive() {
      const scrollPos = window.scrollY + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + id
              ? 'var(--text-primary)'
              : '';
          });
        }
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
  }

  /* --- Init --- */
  function init() {
    initScrollProgress();
    initNav();
    initHeroCanvas();
    initTypewriter();
    initGlitch();
    initReveal();
    initProjectCards();
    initProjectModal();
    initSkills();
    initContactForm();
    initActiveNav();

    document.querySelectorAll('.reveal').forEach(el => {
      if (el.closest('.hero')) {
        setTimeout(() => el.classList.add('is-visible'), 200);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
