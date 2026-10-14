/** BERKVERSE — Layered SVG scene compositor (premium vector artwork) */

const ROOM_X = 200;
const SCENE_W = 1280;

/** Parallax layers — back to front */
const LAYERS = [
  { key: 'room-left',   x: 0,           y: 0,   w: 200,  h: 720, parallax: 0.24, z: 0 },
  { key: 'room-right',  x: 1480,        y: 0,   w: 200,  h: 720, parallax: 0.24, z: 0 },
  { key: 'room-wall',   x: ROOM_X,      y: 0,   w: 1280, h: 720, parallax: 0.14, z: 1 },
  { key: 'monitor-code', x: ROOM_X + 130, y: 168, w: 340, h: 280, parallax: 0.09, z: 2, glow: '#22D3EE' },
  { key: 'monitor-game', x: ROOM_X + 810, y: 168, w: 340, h: 280, parallax: 0.09, z: 2, glow: '#4ADE80' },
  { key: 'desk',        x: ROOM_X + 40, y: 508, w: 1200, h: 200, parallax: 0.05, z: 3 },
  { key: 'plant',       x: ROOM_X + 168, y: 468, w: 70,  h: 95,  parallax: 0.03, z: 4 },
  { key: 'nameplate',   x: ROOM_X + 108, y: 548, w: 150, h: 80,  parallax: 0.02, z: 5, hit: 'about' },
  { key: 'coffee',      x: ROOM_X + 268, y: 458, w: 90,  h: 100, parallax: 0.02, z: 5, hit: 'blog' },
  { key: 'keyboard',    x: ROOM_X + 520, y: 528, w: 180, h: 50,  parallax: 0.02, z: 5 },
  { key: 'mouse',       x: ROOM_X + 720, y: 538, w: 50,  h: 70,  parallax: 0.02, z: 5 },
  { key: 'laptop',      x: ROOM_X + 512, y: 418, w: 200, h: 130, parallax: 0.02, z: 6, hit: 'projects' },
  { key: 'books',       x: ROOM_X + 898, y: 468, w: 110, h: 90,  parallax: 0.02, z: 6, hit: 'skills' },
  { key: 'cat',         x: ROOM_X + 1008, y: 448, w: 160, h: 110, parallax: 0.02, z: 7, hit: 'balim', anim: 'cat' },
  { key: 'lamp',        x: ROOM_X + 1078, y: 368, w: 100, h: 160, parallax: 0.03, z: 6, hit: 'experiments', anim: 'lamp' },
  { key: 'berk',        x: ROOM_X + 542, y: 100, w: 220, h: 300, parallax: 0.015, z: 8, anim: 'berk' },
];

const SCENE_OBJECTS = [
  { id: 'about',        label: 'ABOUT ME',       cx: ROOM_X + 183, cy: 612, w: 140, h: 72, z: 12, anchor: 'bottom' },
  { id: 'blog',         label: 'BLOG',           cx: ROOM_X + 313, cy: 548, w: 75,  h: 85, z: 12, anchor: 'bottom' },
  { id: 'projects',     label: 'PROJECTS',       cx: ROOM_X + 612, cy: 538, w: 165, h: 95, z: 12, anchor: 'bottom' },
  { id: 'skills',       label: 'EXPERIENCE',     cx: ROOM_X + 953, cy: 548, w: 110, h: 72, z: 12, anchor: 'bottom' },
  { id: 'balim',        label: 'BALIM',          cx: ROOM_X + 1088, cy: 528, w: 100, h: 58, z: 13, anchor: 'bottom' },
  { id: 'technologies', label: 'TECHNOLOGIES',   cx: ROOM_X + 300, cy: 308, w: 320, h: 235, z: 6, anchor: 'center' },
  { id: 'experiments',  label: 'CREATIVE LAB',   cx: ROOM_X + 1128, cy: 462, w: 92,  h: 130, z: 9, anchor: 'bottom' },
];

const COFFEE_EMIT = { x: ROOM_X + 313, y: 458 };

const ASSET_FILES = [
  'room-left', 'room-right', 'room-wall', 'desk',
  'monitor-code', 'monitor-game', 'berk', 'cat',
  'laptop', 'coffee', 'lamp', 'books', 'nameplate',
  'plant', 'keyboard', 'mouse',
];

class World {
  constructor() {
    this.time = 0;
    this.images = {};
    this.loaded = false;
    this.hoverId = null;
    this.glowId = null;
    this.dust = [];
    this.steamParticles = [];
    this.lightRays = [];
    this.berk = { blink: 0, blinkTimer: 2.8, typing: 0, typingTimer: 5 };
    this.balim = { blink: 0, blinkTimer: 3.5, stretch: 0, stretchTimer: 9 };
    this._initDust();
    this._initLightRays();
  }

  async loadAssets() {
    await Promise.all(ASSET_FILES.map((name) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { this.images[name] = img; resolve(); };
      img.onerror = () => resolve();
      img.src = `assets/svg/${name}.svg`;
    })));
    this.loaded = true;
  }

  _initDust() {
    for (let i = 0; i < 32; i++) {
      this.dust.push({
        x: ROOM_X + 250 + Math.random() * 780,
        y: 140 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 3,
        size: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  _initLightRays() {
    for (let i = 0; i < 4; i++) {
      this.lightRays.push({
        x: ROOM_X + 420 + i * 200,
        w: 30 + Math.random() * 28,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  _parallaxOffset(camera, factor) {
    return { x: camera.x * factor, y: camera.y * factor * 0.45 };
  }

  _updateCharacters(dt) {
    const b = this.berk;
    b.blinkTimer -= dt;
    if (b.blinkTimer <= 0) {
      b.blink = 1;
      b.blinkTimer = 2.5 + Math.random() * 3.5;
      setTimeout(() => { b.blink = 0; }, 130);
    }
    b.typingTimer -= dt;
    if (b.typingTimer <= 0) {
      b.typing = b.typing ? 0 : this.time;
      b.typingTimer = b.typing ? 2.5 + Math.random() * 2 : 5 + Math.random() * 4;
    }

    const c = this.balim;
    c.blinkTimer -= dt;
    if (c.blinkTimer <= 0) {
      c.blink = 1;
      c.blinkTimer = 4 + Math.random() * 6;
      setTimeout(() => { c.blink = 0; }, 110);
    }
    c.stretchTimer -= dt;
    if (c.stretchTimer <= 0) {
      c.stretch = 1;
      c.stretchTimer = 9 + Math.random() * 10;
      setTimeout(() => { c.stretch = 0; }, 700);
    }
  }

  update(dt) {
    this.time += dt;
    this._updateCharacters(dt);

    for (const d of this.dust) {
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.x += Math.sin(this.time + d.phase) * 0.3;
      if (d.x < ROOM_X + 180 || d.x > ROOM_X + 1100) d.vx *= -1;
      if (d.y < 120 || d.y > 560) d.vy *= -1;
    }

    if (this.steamParticles.length < 10) {
      this.steamParticles.push({
        x: COFFEE_EMIT.x + (Math.random() - 0.5) * 10,
        y: COFFEE_EMIT.y,
        vy: -16 - Math.random() * 12,
        life: 1,
        size: 2.5 + Math.random() * 3,
      });
    }
    for (const s of this.steamParticles) {
      s.y += s.vy * dt;
      s.x += Math.sin(this.time * 2.2 + s.y * 0.025) * 10 * dt;
      s.life -= dt * 0.28;
    }
    this.steamParticles = this.steamParticles.filter((s) => s.life > 0);
  }

  _objectBounds(obj, hoverScale) {
    const hs = hoverScale || 1;
    const w = obj.w * hs;
    const h = obj.h * hs;
    if (obj.anchor === 'center') {
      return {
        left: obj.cx - w / 2, right: obj.cx + w / 2,
        top: obj.cy - h / 2, bottom: obj.cy + h / 2,
        cx: obj.cx, cy: obj.cy,
      };
    }
    return {
      left: obj.cx - w / 2, right: obj.cx + w / 2,
      top: obj.cy - h, bottom: obj.cy,
      cx: obj.cx, cy: obj.cy - h / 2,
    };
  }

  getObjectAt(wx, wy) {
    if (this.hoverId) {
      const cur = SCENE_OBJECTS.find((o) => o.id === this.hoverId);
      if (cur) {
        const b = this._objectBounds(cur, 1.06);
        if (wx >= b.left && wx <= b.right && wy >= b.top && wy <= b.bottom) return cur;
      }
    }
    const sorted = [...SCENE_OBJECTS].sort((a, b) => b.z - a.z);
    for (const o of sorted) {
      const b = this._objectBounds(o, 1);
      if (wx >= b.left && wx <= b.right && wy >= b.top && wy <= b.bottom) return o;
    }
    return null;
  }

  getObjectWorldPos(obj) {
    return { x: this._objectBounds(obj, 1).cx, y: this._objectBounds(obj, 1).cy };
  }

  getWandererAt() { return null; }
  catchWanderer() { return false; }

  draw(ctx, camera) {
    const t = this.time;
    ctx.fillStyle = '#0B1426';
    ctx.fillRect(0, 0, WORLD_W, WORLD_H);

    const sorted = [...LAYERS].sort((a, b) => a.z - b.z);
    for (const layer of sorted) {
      this._drawLayer(ctx, camera, layer, t);
    }

    this._drawMonitorGlows(ctx, camera, t);
    this._drawAtmosphere(ctx, camera, t);
    this._drawHoverGlows(ctx, t);
    this._drawAnimOverlays(ctx, camera, t);
  }

  _drawLayer(ctx, camera, layer, t) {
    const img = this.images[layer.key];
    if (!img) return;

    const p = this._parallaxOffset(camera, layer.parallax || 0);
    let sx = layer.x - p.x;
    let sy = layer.y - p.y;
    let sw = layer.w;
    let sh = layer.h;

    const isHover = layer.hit && this.hoverId === layer.hit;
    const isGlow = layer.hit && this.glowId === layer.hit;
    let scale = 1;
    if (isHover) scale = 1.04 + Math.sin(t * 4) * 0.008;
    if (isGlow) scale = 1.02;

    ctx.save();

    if (layer.anim === 'berk') {
      const bob = Math.sin(t * 1.05) * 3;
      sy += bob;
    }

    if (layer.anim === 'cat') {
      const breathe = 1 + Math.sin(t * 1.6) * 0.025;
      const stretch = this.balim.stretch ? 1.08 : 1;
      scale *= breathe * stretch;
      const tail = Math.sin(t * 2.2) * 0.04;
      ctx.translate(sx + sw / 2, sy + sh / 2);
      ctx.rotate(tail);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
      ctx.restore();
      return;
    }

    if (scale !== 1) {
      ctx.translate(sx + sw / 2, sy + sh / 2);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
    } else {
      ctx.drawImage(img, sx, sy, sw, sh);
    }

    ctx.restore();

    if (layer.anim === 'lamp') {
      const pulse = 0.5 + Math.sin(t * 1.6) * 0.2;
      const lx = layer.x + layer.w / 2 - p.x;
      const ly = layer.y + 40 - p.y;
      const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, 160);
      g.addColorStop(0, `rgba(251,191,36,${0.14 * pulse})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(lx - 160, ly - 120, 320, 280);
    }
  }

  _drawMonitorGlows(ctx, camera, t) {
    for (const m of LAYERS.filter((l) => l.glow)) {
      const p = this._parallaxOffset(camera, m.parallax);
      const pulse = 0.08 + Math.sin(t * 1.4 + m.x * 0.01) * 0.04;
      const cx = m.x + m.w / 2 - p.x;
      const cy = m.y + m.h / 2 - p.y;
      const rgb = m.glow === '#22D3EE' ? '34,211,238' : '74,222,128';
      ctx.fillStyle = `rgba(${rgb},${pulse})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, m.w * 0.48, m.h * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawAtmosphere(ctx, camera, t) {
    for (const ray of this.lightRays) {
      const p = this._parallaxOffset(camera, 0.06);
      const a = 0.018 + Math.sin(t * 0.28 + ray.phase) * 0.01;
      ctx.save();
      ctx.translate(ray.x - p.x, 150 - p.y);
      const g = ctx.createLinearGradient(0, 0, 0, 440);
      g.addColorStop(0, `rgba(251,191,36,${a})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(-ray.w / 2, 0, ray.w, 440);
      ctx.restore();
    }

    for (const d of this.dust) {
      const p = this._parallaxOffset(camera, 0.04);
      ctx.globalAlpha = 0.14 + Math.sin(t + d.phase) * 0.09;
      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(d.x - p.x, d.y - p.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (const s of this.steamParticles) {
      ctx.globalAlpha = s.life * 0.4;
      ctx.fillStyle = '#F1F5F9';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  _drawHoverGlows(ctx, t) {
    for (const obj of SCENE_OBJECTS) {
      const isHover = this.hoverId === obj.id;
      const isGlow = this.glowId === obj.id;
      if (!isHover && !isGlow) continue;
      const b = this._objectBounds(obj, isHover ? 1.06 : 1);
      const pulse = 0.22 + Math.sin(t * 3.2) * 0.1;
      const g = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, Math.max(b.right - b.left, b.bottom - b.top) * 0.65);
      g.addColorStop(0, `rgba(251,191,36,${isGlow ? 0.45 : pulse})`);
      g.addColorStop(0.5, `rgba(34,211,238,${isGlow ? 0.15 : pulse * 0.4})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(b.cx, b.cy, (b.right - b.left) * 0.55, (b.bottom - b.top) * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawAnimOverlays(ctx, camera, t) {
    const berkLayer = LAYERS.find((l) => l.anim === 'berk');
    if (!berkLayer || !this.berk.blink) return;

    const p = this._parallaxOffset(camera, berkLayer.parallax);
    const bob = Math.sin(t * 1.05) * 3;
    const bx = berkLayer.x + berkLayer.w / 2 - p.x;
    const by = berkLayer.y + 88 + bob - p.y;

    ctx.strokeStyle = '#EEC9A8';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bx - 28, by);
    ctx.lineTo(bx - 8, by);
    ctx.moveTo(bx + 8, by);
    ctx.lineTo(bx + 28, by);
    ctx.stroke();
  }

  drawVignette(ctx, viewW, viewH) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const cx = viewW / 2;
    const cy = viewH / 2;
    const vg = ctx.createRadialGradient(cx, cy, Math.min(viewW, viewH) * 0.25, cx, cy, Math.max(viewW, viewH) * 0.75);
    vg.addColorStop(0, 'transparent');
    vg.addColorStop(1, 'rgba(11,20,38,0.45)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.restore();
  }
}
