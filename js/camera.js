/** BERKVERSE — Camera: viewport fit + world pan/zoom + precise screen↔world mapping */

const WORLD_W = 1680;
const WORLD_H = 720;

class Camera {
  constructor() {
    this.viewW = window.innerWidth;
    this.viewH = window.innerHeight;
    this.fitScale = 1;
    this.fitOffX = 0;
    this.fitOffY = 0;

    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this.targetX = 0;
    this.targetY = 0;
    this.targetZoom = 1;
    this.idlePhase = 0;
    this.focusTarget = null;
    this.focusDim = 0;
    this.targetDim = 0;
    this.focusLocked = false;
    this.onFocusComplete = null;
    this._homeX = 0;
    this._homeY = 0;
    this._homeZoom = 1;
    this.minZoom = 1;
    this.maxZoom = 2.2;
  }

  /** Fullscreen viewport — cover scale, no letterbox gaps */
  setViewport(w, h) {
    this.viewW = w;
    this.viewH = h;
    this.fitScale = 1;//Math.max(w / WORLD_W, h / WORLD_H);
    this.fitOffX = (w - WORLD_W * this.fitScale) * 0.5;
    this.fitOffY = (h - WORLD_H * this.fitScale) * 0.5;
  }

  /** Combined world → screen scale */
  get worldScale() {
    return this.zoom * this.fitScale;
  }

  setInitial() {
    this.targetX = 0;
    this.targetY = 0;
    this.targetZoom = 1;
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this._homeX = 0;
    this._homeY = 0;
    this._homeZoom = 1;
  }

  pan(dx, dy) {
    if (this.focusLocked) return;
    const s = this.worldScale;
    this.targetX -= dx / s;
    this.targetY -= dy / s;
    this.focusTarget = null;
    this.targetDim = 0;
    this._clamp();
  }

  moveKeys(vx, vy, dt) {
    if (this.focusLocked) return;
    const speed = 180;
    this.targetX += vx * speed * dt;
    this.targetY += vy * speed * dt;
    this.focusTarget = null;
    this.targetDim = 0;
    this._clamp();
  }

  focusOn(wx, wy, zoomLevel, duration, onComplete) {
    this._homeX = this.targetX;
    this._homeY = this.targetY;
    this._homeZoom = this.targetZoom;
    this.focusTarget = {
      x: wx, y: wy,
      zoom: zoomLevel || 1.65,
      duration: duration || 0.85,
      t: 0,
    };
    this.targetDim = 0.52;
    this.focusLocked = true;
    this.onFocusComplete = onComplete;
  }

  resetFocus() {
    this.focusTarget = null;
    this.targetDim = 0;
    this.focusLocked = false;
    this.targetX = this._homeX;
    this.targetY = this._homeY;
    this.targetZoom = this._homeZoom;
    this.onFocusComplete = null;
  }

  update(dt) {
    // if (!this.focusTarget) {
    //   this.idlePhase += dt;
    //   this.targetX += Math.sin(this.idlePhase * 0.09) * 0.35;
    //   this.targetY += Math.cos(this.idlePhase * 0.07) * 0.25;
    // }

    if (this.focusTarget) {
      this.focusTarget.t += dt;
      const p = Math.min(1, this.focusTarget.t / this.focusTarget.duration);
      const ease = p < 0.5
        ? 4 * p * p * p
        : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const cx = this.focusTarget.x - WORLD_W / (2 * this.focusTarget.zoom);
      const cy = this.focusTarget.y - WORLD_H / (2 * this.focusTarget.zoom);
      this.targetX = cx * ease;
      this.targetY = cy * ease;
      this.targetZoom = 1 + (this.focusTarget.zoom - 1) * ease;

      if (p >= 1) {
        this.focusLocked = false;
        const cb = this.onFocusComplete;
        this.onFocusComplete = null;
        if (cb) cb();
      }
    }

    const smooth = 1 - Math.pow(0.0008, dt);
    this.x += (this.targetX - this.x) * smooth;
    this.y += (this.targetY - this.y) * smooth;
    this.zoom += (this.targetZoom - this.zoom) * smooth;
    this.focusDim += (this.targetDim - this.focusDim) * smooth * 0.9;
    this._clamp();
  }

  _clamp() {
    const margin = 160;
    const minX = -(WORLD_W - WORLD_W / this.targetZoom) - margin;
    const minY = -(WORLD_H - WORLD_H / this.targetZoom) - margin;
    this.targetX = Math.max(minX, Math.min(margin, this.targetX));
    this.targetY = Math.max(minY, Math.min(margin, this.targetY));
    this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom));
  }

  apply(ctx) {
    const s = this.worldScale;
    ctx.setTransform(s, 0, 0, s, this.fitOffX - this.x * s, this.fitOffY - this.y * s);
  }

  /** Screen (CSS px relative to canvas) → world coords — exact inverse of apply() */
  screenToWorld(sx, sy) {
    const s = this.worldScale;
    return {
      x: (sx - this.fitOffX) / s + this.x,
      y: (sy - this.fitOffY) / s + this.y,
    };
  }

  /** Client pointer → world coords */
  clientToWorld(clientX, clientY, rect) {
    const sx = (clientX - rect.left) * (this.viewW / rect.width);
    const sy = (clientY - rect.top) * (this.viewH / rect.height);
    return this.screenToWorld(sx, sy);
  }

  drawDim(ctx, viewW, viewH) {
    if (this.focusDim < 0.01) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(5, 10, 22, ${this.focusDim})`;
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.restore();
  }
}
