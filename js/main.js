/** BERKVERSE — Main orchestrator */

class Berkverse {
  constructor() {
    this.canvas = document.getElementById('scene');
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.camera = new Camera();
    this.world = new World();
    this.ui = new UI();
    this.audio = new AudioEngine();

    this.running = false;
    this.started = false;
    this.keys = {};
    this.drag = { active: false, lastX: 0, lastY: 0, moved: false };
    this.joystick = { x: 0, y: 0 };
    this.activeObject = null;
    this.interacting = false;
    this._lastTs = 0;
    this._dpr = 1;

    this.ui.onPanelClose = () => {
      this.camera.resetFocus();
      this.world.glowId = null;
      this.activeObject = null;
      this.interacting = false;
    };

    this.ui.setScore(this.world.score);
    this._bind();
    this._resize();
    this.world.loadAssets();
  }

  _bind() {
    window.addEventListener('resize', () => this._resize());
    this.ui.els.btnEnter.addEventListener('click', () => this._enter());
    this.ui.els.btnAudio.addEventListener('click', () => {
      this.audio.setEnabled(this.ui.toggleAudio());
    });

    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Enter' && !this.started && this.ui.els.intro && !this.ui.els.intro.classList.contains('is-out')) {
        this._enter();
      }
    });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.ui.panelOpen || this.interacting) return;
      if (e.button === 0) {
        this.drag.active = true;
        this.drag.moved = false;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;
        this.canvas.classList.add('is-dragging');
      }
    });
    window.addEventListener('mousemove', (e) => this._onMouseMove(e));
    window.addEventListener('mouseup', () => {
      this.drag.active = false;
      this.canvas.classList.remove('is-dragging');
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.ui.panelOpen || this.interacting || this.drag.moved) return;
      const world = this._pointerToWorld(e.clientX, e.clientY);
      const obj = this.world.getObjectAt(world.x, world.y);
      if (obj) { this._openObject(obj); }
    });

    this.ui.setupJoystick((x, y) => { this.joystick.x = x; this.joystick.y = y; });
  }

  _pointerToWorld(clientX, clientY) {
    return this.camera.clientToWorld(clientX, clientY, this.canvas.getBoundingClientRect());
  }

  _onMouseMove(e) {
    if (this.ui.panelOpen || this.interacting) {
      this.ui.hideTooltip();
      return;
    }

    const world = this._pointerToWorld(e.clientX, e.clientY);

    if (this.drag.active) {
      const dx = e.clientX - this.drag.lastX;
      const dy = e.clientY - this.drag.lastY;
      if (Math.hypot(dx, dy) > 4) this.drag.moved = true;
      this.camera.pan(dx, dy);
      this.drag.lastX = e.clientX;
      this.drag.lastY = e.clientY;
    }

    const obj = this.world.getObjectAt(world.x, world.y);
    this.world.hoverId = obj ? obj.id : null;

    if (obj) {
      this.ui.showTooltip(e.clientX, e.clientY - 12, obj.label);
      this.canvas.style.cursor = 'pointer';
    } else {
      this.ui.hideTooltip();
      this.canvas.style.cursor = this.drag.active ? 'grabbing' : 'grab';
    }
  }

  async _enter() {
    this.started = true;
    document.body.classList.add('entered');
    this.ui.hideIntro();
    await this.audio.start();
    this.camera.setInitial();
    this.running = true;
    this._lastTs = performance.now();
    requestAnimationFrame((ts) => this._loop(ts));
  }

  _openObject(obj) {
    if (this.activeObject === obj.id && this.ui.panelOpen) return;
    this.interacting = true;
    this.activeObject = obj.id;
    this.world.glowId = obj.id;
    this.ui.hideTooltip();
    this.audio.playClick();

    const pos = this.world.getObjectWorldPos(obj);
    const zoom = obj.id === 'balim' ? 1.85 : obj.id === 'blog' ? 1.75 : 1.65;
    this.camera.focusOn(pos.x, pos.y, zoom, 0.9, () => {
      this.ui.openPanel(obj.id, { steamReveal: obj.id === 'blog' });
      this.interacting = false;
    });
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this._dpr = dpr;
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.camera.setViewport(w, h);
  }

  _getMoveVector() {
    let vx = 0, vy = 0;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) vy -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) vy += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) vx -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) vx += 1;
    vx += this.joystick.x;
    vy += this.joystick.y;
    const len = Math.hypot(vx, vy);
    if (len > 1) { vx /= len; vy /= len; }
    return { vx, vy };
  }

  _loop(ts) {
    if (!this.running) return;
    const dt = Math.min((ts - this._lastTs) / 1000, 0.05);
    this._lastTs = ts;

    if (!this.ui.panelOpen && !this.interacting) {
      const move = this._getMoveVector();
      if (move.vx || move.vy) this.camera.moveKeys(move.vx, move.vy, dt);
    }

    this.camera.update(dt);
    this.world.update(dt);
    this._drawFrame();

    requestAnimationFrame((t) => this._loop(t));
  }

  _drawFrame() {
    const ctx = this.ctx;
    const vw = this.camera.viewW;
    const vh = this.camera.viewH;

    ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    ctx.fillStyle = '#0B1426';
    ctx.fillRect(0, 0, vw, vh);

    ctx.save();
    this.camera.apply(ctx);
    this.world.draw(ctx, this.camera);
    ctx.restore();

    this.camera.drawDim(ctx, vw, vh);
    this.world.drawVignette(ctx, vw, vh);
  }
}

new Berkverse();
