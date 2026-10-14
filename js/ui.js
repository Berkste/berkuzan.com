/** BERKVERSE — UI panels, tooltips, audio */

const SECTIONS = {
  about:        { title: 'About Me',           tag: 'Nameplate',        icon: '🪪', template: 'tpl-about' },
  projects:     { title: 'Projects',           tag: 'The Laptop',       icon: '💻', template: 'tpl-projects' },
  skills:       { title: 'Experience & Skills', tag: 'The Books',       icon: '📚', template: 'tpl-skills' },
  balim:        { title: 'Balım',              tag: 'The Cat',          icon: '🐱', template: 'tpl-balim' },
  blog:         { title: 'Blog',               tag: 'Coffee Cup',       icon: '☕', template: 'tpl-blog' },
  technologies: { title: 'Technologies',       tag: 'Code Monitor',     icon: '🖥️', template: 'tpl-technologies' },
  experiments:  { title: 'Creative Experiments', tag: 'Desk Lamp',    icon: '💡', template: 'tpl-experiments' },
};

class UI {
  constructor() {
    this.els = {
      intro: document.getElementById('intro'),
      btnEnter: document.getElementById('btn-enter'),
      btnAudio: document.getElementById('btn-audio'),
      tooltip: document.getElementById('tooltip'),
      tooltipLabel: document.querySelector('.tooltip__label'),
      panel: document.getElementById('panel'),
      panelClose: document.getElementById('panel-close'),
      panelIcon: document.getElementById('panel-icon'),
      panelTag: document.getElementById('panel-tag'),
      panelTitle: document.getElementById('panel-title'),
      panelBody: document.getElementById('panel-body'),
      joystick: document.getElementById('joystick'),
      joystickKnob: document.getElementById('joystick-knob'),
      hudScore: document.getElementById('hud-score'),
      toast: document.getElementById('toast'),
      toastText: document.getElementById('toast-text'),
    };
    this.panelOpen = false;
    this.onPanelClose = null;
    this.audioEnabled = true;
    this._toastTimer = null;
    this._bind();
  }

  _bind() {
    this.els.panelClose.addEventListener('click', () => this.closePanel());
    this.els.panel.addEventListener('click', (e) => {
      if (e.target.classList.contains('panel__backdrop')) this.closePanel();
    });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.panelOpen) this.closePanel();
    });
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      this.els.joystick.classList.add('is-on');
    }
  }

  hideIntro() {
    this.els.intro.classList.add('is-out');
    setTimeout(() => { this.els.intro.style.display = 'none'; }, 1200);
  }

  showTooltip(x, y, label) {
    this.els.tooltip.hidden = false;
    this.els.tooltipLabel.textContent = label;
    this.els.tooltip.style.left = x + 'px';
    this.els.tooltip.style.top = y + 'px';
  }

  hideTooltip() {
    this.els.tooltip.hidden = true;
  }

  openPanel(sectionId, opts = {}) {
    const sec = SECTIONS[sectionId];
    if (!sec) return;
    const tpl = document.getElementById(sec.template);
    if (!tpl) return;

    this.els.panelIcon.textContent = sec.icon;
    this.els.panelTag.textContent = sec.tag;
    this.els.panelTitle.textContent = sec.title;
    this.els.panelBody.innerHTML = '';
    const body = tpl.content.cloneNode(true);
    this.els.panelBody.appendChild(body);

    if (opts.steamReveal) {
      this.els.panelBody.classList.add('panel__body--steam');
      requestAnimationFrame(() => {
        this.els.panelBody.classList.add('panel__body--steam-in');
      });
    } else {
      this.els.panelBody.classList.remove('panel__body--steam', 'panel__body--steam-in');
    }

    this.els.panel.hidden = false;
    requestAnimationFrame(() => this.els.panel.classList.add('is-open'));
    this.panelOpen = true;
  }

  setScore(n) {
    if (this.els.hudScore) this.els.hudScore.textContent = `✦ ${n}`;
  }

  toast(msg, ms = 2800) {
    if (!this.els.toast) return;
    this.els.toastText.textContent = msg;
    this.els.toast.hidden = false;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this.els.toast.hidden = true; }, ms);
  }

  closePanel() {
    this.els.panel.classList.remove('is-open');
    this.els.panelBody.classList.remove('panel__body--steam-in');
    setTimeout(() => {
      this.els.panel.hidden = true;
      this.els.panelBody.classList.remove('panel__body--steam');
      this.panelOpen = false;
      this.onPanelClose?.();
    }, 700);
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    this.els.btnAudio.textContent = this.audioEnabled ? '🔊' : '🔇';
    this.els.btnAudio.classList.toggle('is-muted', !this.audioEnabled);
    return this.audioEnabled;
  }

  setupJoystick(onMove) {
    const ring = this.els.joystick.querySelector('.joystick__ring');
    const knob = this.els.joystickKnob;
    let touchId = null;
    const maxDist = 40;
    const center = () => {
      const r = ring.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const update = (cx, cy) => {
      const c = center();
      let dx = cx - c.x, dy = cy - c.y;
      const dist = Math.hypot(dx, dy);
      if (dist > maxDist) { dx = dx / dist * maxDist; dy = dy / dist * maxDist; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      onMove(dist > 8 ? dx / maxDist : 0, dist > 8 ? dy / maxDist : 0);
    };

    const reset = () => {
      touchId = null;
      knob.style.transform = '';
      onMove(0, 0);
    };

    ring.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchId = e.changedTouches[0].identifier;
      update(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: false });
    ring.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === touchId) update(t.clientX, t.clientY);
      }
    }, { passive: false });
    ring.addEventListener('touchend', reset);
    ring.addEventListener('touchcancel', reset);
  }
}

/** Simple ambient audio engine */
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._nodes = [];
  }

  async start() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.enabled) this._build();
    } catch { /* */ }
  }

  setEnabled(on) {
    this.enabled = on;
    if (!this.ctx) return;
    if (on && this._nodes.length === 0) this._build();
    if (!on) this._stop();
  }

  _stop() {
    this._nodes.forEach((n) => { try { n.stop?.(); } catch { /* */ } });
    this._nodes = [];
  }

  _build() {
    if (!this.ctx || !this.enabled) return;
    this._stop();
    const t = this.ctx.currentTime;
    const master = this.ctx.createGain();
    master.gain.value = 0.06;
    master.connect(this.ctx.destination);
    this._nodes.push(master);

    this._osc(80, 'sine', 0.03, master, t);
    this._osc(120, 'sine', 0.02, master, t);

    this._scheduleChime(master);
    setInterval(() => {
      if (this.enabled && this.ctx) this._scheduleChime(master);
    }, 6000);
  }

  _osc(freq, type, gain, dest, t) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq; g.gain.value = gain;
    o.connect(g); g.connect(dest); o.start(t);
    this._nodes.push(o, g);
  }

  _scheduleChime(master) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [660, 880, 1100].forEach((freq, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.15);
      g.gain.linearRampToValueAtTime(0.015, t + i * 0.15 + 0.1);
      g.gain.linearRampToValueAtTime(0, t + i * 0.15 + 1.5);
      o.connect(g); g.connect(master);
      o.start(t + i * 0.15);
      o.stop(t + i * 0.15 + 1.5);
    });
  }

  playClick() {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.setValueAtTime(440, t);
    o.frequency.exponentialRampToValueAtTime(660, t + 0.15);
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(t); o.stop(t + 0.2);
  }

  playCatch() {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    [523, 784, 1047].forEach((freq, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.04, t + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t + i * 0.06);
      o.stop(t + i * 0.06 + 0.25);
    });
  }
}
