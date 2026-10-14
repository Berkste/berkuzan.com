# BERKVERSE

An interactive canvas portfolio by Berk Uzan. Explore a South Park–inspired developer room, click desk objects to open portfolio sections, and pan around the scene with mouse drag or WASD.

Built with vanilla HTML, CSS, and JavaScript — no frameworks. Works on GitHub Pages and local static servers.

---

## Quick start

```bash
npx serve .
```

Open the URL shown in the terminal (usually `http://localhost:3000`), click **Enter the room**, then interact with objects on the desk.

**Controls**

| Input | Action |
|-------|--------|
| Mouse drag | Pan camera |
| Click object | Zoom in and open panel |
| WASD / Arrow keys | Move camera |
| Touch joystick | Move camera (mobile) |
| Escape | Close panel |
| Enter | Start (from intro screen) |

---

## Project structure

```
sayfa/
├── index.html          # Page shell, section templates
├── css/style.css       # UI, intro, panels, HUD
├── js/
│   ├── camera.js       # Viewport, pan, zoom, focus
│   ├── world.js        # Scene rendering, hit detection, animations
│   ├── ui.js           # Panels, tooltips, audio
│   └── main.js         # Game loop, input, orchestration
└── assets/svg/         # Vector illustrations (room, desk, character, props)
```

Scripts load in this order: `camera.js` → `world.js` → `ui.js` → `main.js`.

---

## World constants

Defined in `camera.js` and `world.js`:

| Constant | Value | Purpose |
|----------|-------|---------|
| `WORLD_W` | 1680 | Total scene width (main room + side wings) |
| `WORLD_H` | 720 | Scene height |
| `ROOM_X` | 200 | X offset where the main desk room begins |
| `SCENE_W` | 1280 | Width of the central room area |

---

## Interactive objects

| Desk object | Section ID | Panel |
|-------------|------------|-------|
| Nameplate | `about` | About Me |
| Coffee mug | `blog` | Blog |
| Laptop | `projects` | Projects |
| Books | `skills` | Experience & Skills |
| Balım (cat) | `balim` | Balım |
| Left monitor | `technologies` | Technologies |
| Desk lamp | `experiments` | Creative Experiments |

---

# JavaScript API reference

## `js/main.js` — Class `Berkverse`

The main application controller. Instantiates camera, world, UI, and audio; runs the game loop; handles all user input.

### `constructor()`

Creates the app on page load:

- Grabs the `#scene` canvas and 2D context
- Instantiates `Camera`, `World`, `UI`, and `AudioEngine`
- Sets initial state (keys, drag, joystick, interaction flags)
- Registers `onPanelClose` to reset camera focus and glow when a panel closes
- Calls `_bind()`, `_resize()`, and starts `world.loadAssets()`

### `_bind()`

Attaches all event listeners:

- Window resize → `_resize()`
- Enter button and Enter key → `_enter()`
- Audio button → toggles audio via `UI.toggleAudio()`
- Keydown/keyup → tracks WASD and arrow keys
- Canvas mousedown/mousemove/mouseup → drag to pan
- Canvas click → hit-test and `_openObject()`
- Touch joystick → updates `joystick.x/y` for mobile movement

### `_pointerToWorld(clientX, clientY)`

Converts browser pointer coordinates to world-space coordinates using the camera and canvas bounding rect. Used for hover and click hit detection.

### `_onMouseMove(e)`

Handles every mouse move:

- Hides tooltip if a panel is open or an interaction is in progress
- Converts pointer to world coords
- If dragging, pans the camera and marks drag as “moved” (prevents accidental clicks)
- Runs hit test, sets `world.hoverId`, shows/hides tooltip, updates cursor (`pointer` / `grab` / `grabbing`)

### `_enter()`

Called when the user starts the experience:

- Marks app as started, adds `entered` class to `body`
- Hides intro overlay
- Starts ambient audio
- Resets camera to initial position
- Begins the `requestAnimationFrame` loop via `_loop()`

### `_openObject(obj)`

Handles clicking an interactive desk object:

- Sets interaction lock, active object, and glow ID
- Plays click sound, hides tooltip
- Computes focus zoom (closer for Balım and blog)
- Calls `camera.focusOn()`; when animation completes, opens the matching UI panel (blog uses steam reveal animation)

### `_resize()`

Runs on load and window resize:

- Sets canvas internal resolution using device pixel ratio (capped at 2)
- Sets CSS size to 100% width/height
- Updates camera viewport via `camera.setViewport()`

### `_getMoveVector()`

Reads keyboard and joystick input, normalizes the combined direction vector, and returns `{ vx, vy }` for camera movement.

### `_loop(ts)`

Main game loop (runs every frame):

- Computes delta time `dt` (capped at 50 ms)
- Applies keyboard/joystick movement when no panel is open
- Updates camera and world
- Renders frame via `_drawFrame()`
- Schedules next frame

### `_drawFrame()`

Renders one frame:

1. Applies DPR transform and fills viewport background
2. Applies camera transform and draws the world
3. Draws focus dim overlay and vignette in screen space

---

## `js/camera.js` — Class `Camera`

Manages viewport fitting, panning, zooming, cinematic focus, and coordinate conversion between screen and world space.

### `constructor()`

Initializes viewport size, fit scale, pan/zoom state, focus animation state, idle drift phase, and zoom limits (`minZoom: 1`, `maxZoom: 2.2`).

### `setViewport(w, h)`

Called on resize. Sets viewport dimensions and computes **cover** scale so the scene fills the screen with no letterbox gaps. Calculates `fitOffX` / `fitOffY` centering offsets.

### `get worldScale` (getter)

Returns combined scale: `zoom × fitScale`. Used for pan speed and transform math.

### `setInitial()`

Resets camera to default position and zoom when entering the room. Stores this as the “home” position for focus return.

### `pan(dx, dy)`

Pans the camera by screen-pixel delta `(dx, dy)`. Ignored while focus is locked. Clears any active focus target and dim.

### `moveKeys(vx, vy, dt)`

Pans using normalized direction and delta time (WASD / joystick). Speed is 180 world-units per second.

### `focusOn(wx, wy, zoomLevel, duration, onComplete)`

Starts a cinematic zoom toward world point `(wx, wy)`:

- Saves current position as home (for `resetFocus`)
- Animates pan and zoom with ease-in-out cubic easing
- Applies background dim (`targetDim: 0.52`)
- Locks pan until animation finishes, then calls `onComplete`

### `resetFocus()`

Returns camera to saved home position and zoom. Clears dim and focus lock. Called when a panel closes.

### `update(dt)`

Per-frame camera update:

- **Idle drift:** subtle sine/cosine movement when not focusing
- **Focus animation:** interpolates toward target point and zoom
- **Smoothing:** eases `x`, `y`, `zoom` toward targets
- **Dim fade:** smooths `focusDim` toward `targetDim`
- Calls `_clamp()` to keep camera in bounds

### `_clamp()`

Restricts `targetX`, `targetY`, and `targetZoom` so the view never pans or zooms outside allowed world bounds (with 160 px margin).

### `apply(ctx)`

Applies the world-to-screen transform on a canvas context: scale + translate based on zoom, fit scale, pan, and viewport offsets.

### `screenToWorld(sx, sy)`

Inverse transform: converts canvas CSS pixel coordinates to world coordinates. Exact inverse of `apply()`.

### `clientToWorld(clientX, clientY, rect)`

Converts browser client coordinates to world coordinates, accounting for canvas position and size vs. viewport.

### `drawDim(ctx, viewW, viewH)`

Draws a semi-transparent dark overlay over the full viewport when focusing on an object. Rendered in screen space (after camera transform is restored).

---

## `js/world.js` — Class `World`

Composites layered SVG artwork, runs scene animations, handles hit detection, and draws atmospheric effects.

### Data structures (module-level)

- **`LAYERS`** — SVG sprites with position, size, parallax factor, z-order, optional glow, hit ID, and animation type
- **`SCENE_OBJECTS`** — Invisible hit boxes for interactive portfolio sections
- **`ASSET_FILES`** — List of SVG filenames loaded in `loadAssets()`

### `constructor()`

Initializes scene time, image cache, hover/glow state, particle arrays, Berk/Balım animation timers, and calls `_initDust()` and `_initLightRays()`.

### `loadAssets()`

Async. Loads all SVG files from `assets/svg/` into `this.images` as `Image` objects. Sets `loaded = true` when done (continues even if individual files fail).

### `_initDust()`

Creates 32 floating dust motes with random position, velocity, size, and phase for ambient animation.

### `_initLightRays()`

Creates 4 vertical light ray definitions with position, width, and phase for subtle window light animation.

### `_parallaxOffset(camera, factor)`

Returns `{ x, y }` offset for a layer based on camera pan and parallax factor. Far layers move less than near layers.

### `_updateCharacters(dt)`

Updates Berk and Balım animation timers:

- **Berk:** periodic blink; toggles typing state on a timer
- **Balım:** periodic blink and stretch cycles via `setTimeout`

### `update(dt)`

Main world update each frame:

- Advances `time`
- Updates character animations
- Moves dust particles with boundary bounce
- Spawns and updates coffee steam particles (rise, drift, fade)

### `_objectBounds(obj, hoverScale)`

Computes axis-aligned bounding box for a `SCENE_OBJECTS` entry. Supports `anchor: 'bottom'` (desk objects) or `anchor: 'center'` (monitors). Optional `hoverScale` enlarges bounds during hover.

### `getObjectAt(wx, wy)`

Hit detection. Returns the topmost interactive object at world coords `(wx, wy)`, or `null`. Uses sticky hover bounds (1.06×) for the currently hovered object to match visual hover scale.

### `getObjectWorldPos(obj)`

Returns `{ x, y }` center of an object’s hit box. Used as the camera focus point when opening a panel.

### `getWandererAt()` / `catchWanderer()`

Legacy stubs (always return `null` / `false`). Reserved for future mini-game characters.

### `draw(ctx, camera)`

Main render pass:

1. Fills world background
2. Draws all layers back-to-front (sorted by `z`)
3. Monitor glows, atmosphere, hover glows, animation overlays

### `_drawLayer(ctx, camera, layer, t)`

Draws one SVG layer:

- Applies parallax offset from camera
- Applies hover/glow scale pulse on interactive sprites
- **Berk:** vertical bob animation
- **Cat:** breathe, stretch, tail rotation
- **Lamp:** warm radial glow after drawing sprite

### `_drawMonitorGlows(ctx, camera, t)`

Pulsing cyan/green elliptical glow behind code and game monitors.

### `_drawAtmosphere(ctx, camera, t)`

Draws light rays, dust motes, and coffee steam particles with parallax and fade.

### `_drawHoverGlows(ctx, t)`

Golden/cyan radial glow on hovered or focused interactive objects.

### `_drawAnimOverlays(ctx, camera, t)`

Draws Berk’s blink (closed-eye lines over the SVG) when `berk.blink` is active.

### `drawVignette(ctx, viewW, viewH)`

Screen-space dark radial vignette at viewport edges for cinematic depth.

---

## `js/ui.js` — Class `UI`

Manages DOM overlays: intro, tooltips, panels, toasts, joystick, and audio toggle UI.

### `SECTIONS` (constant)

Maps section IDs to panel metadata: title, tag line, emoji icon, and HTML template ID.

### `constructor()`

Caches DOM element references, sets initial state, calls `_bind()`.

### `_bind()`

- Panel close button and backdrop click → `closePanel()`
- Escape key → close panel
- Shows touch joystick on touch-capable devices

### `hideIntro()`

Adds fade-out class to intro, then hides it after 1.2 s.

### `showTooltip(x, y, label)`

Shows floating label at screen position `(x, y)`.

### `hideTooltip()`

Hides the tooltip element.

### `openPanel(sectionId, opts)`

Opens a portfolio panel:

- Clones content from the matching `<template>` in `index.html`
- Sets icon, tag, and title from `SECTIONS`
- Optional `opts.steamReveal` adds staggered card animation (used for blog)
- Animates panel open with CSS class `is-open`

### `setScore(n)`

Updates HUD score text (currently hidden in CSS).

### `toast(msg, ms)`

Shows a temporary toast notification, auto-hides after `ms` milliseconds (default 2800).

### `closePanel()`

Animates panel closed, clears steam classes, invokes `onPanelClose` callback after 700 ms.

### `toggleAudio()`

Toggles audio enabled state, updates button icon and muted class. Returns new enabled state.

### `setupJoystick(onMove)`

Configures touch joystick on mobile:

- `onMove(nx, ny)` receives normalized direction when finger moves outside dead zone
- Resets to `(0, 0)` on touch end

---

## `js/ui.js` — Class `AudioEngine`

Web Audio API wrapper for ambient sound and UI feedback.

### `constructor()`

Initializes audio context reference, enabled flag, and node list for cleanup.

### `start()`

Creates `AudioContext` (after user gesture via Enter) and builds ambient loop if enabled.

### `setEnabled(on)`

Turns audio on or off. Rebuilds or stops ambient nodes accordingly.

### `_stop()`

Stops and clears all active audio nodes.

### `_build()`

Creates ambient soundscape:

- Low sine oscillators for room tone
- Periodic chime sequence every 6 seconds

### `_osc(freq, type, gain, dest, t)`

Helper: creates oscillator + gain node, connects to destination, starts at time `t`.

### `_scheduleChime(master)`

Plays a short three-note ascending chime through the master gain node.

### `playClick()`

Short rising-tone click sound when opening an object.

### `playCatch()`

Three-note success jingle (legacy; used if wanderer catch is re-enabled).

---

## Architecture flow

```
User input (mouse/keyboard/touch)
        ↓
    main.js (Berkverse)
        ↓
    ┌───────────────┬───────────────┐
    ↓               ↓               ↓
 camera.js      world.js         ui.js
 (pan/zoom)   (draw/hit-test)  (panels)
        ↓               ↓
    canvas render ← SVG assets
        ↓
   AudioEngine (optional sounds)
```

**Typical click flow**

1. `click` → `_pointerToWorld()` → `world.getObjectAt()`
2. `_openObject()` → `camera.focusOn()` (zoom + dim)
3. On complete → `ui.openPanel(sectionId)`
4. On close → `camera.resetFocus()` via `onPanelClose`

---

## License

Portfolio project by Berk Uzan. Assets and code are part of the BERKVERSE interactive experience.
