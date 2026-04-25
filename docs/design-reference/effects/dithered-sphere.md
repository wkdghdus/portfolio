# Effect — Dithered WebGL Sphere

## What it does

An interactive 3D icosphere rendered via WebGL with:
- **Simplex 4D noise** deforming the surface and driving color
- **Diffuse + specular lighting** from a fixed direction
- **8×8 Bayer matrix dithering** applied to the alpha channel, creating crisp pixelated edges
- **Mouse tracking** that repels and deforms the sphere surface as the cursor moves

The result: an organic, constantly-shifting sphere with a retro-digital aesthetic — noise-colored but dithered to appear almost pixel-art at the edges. The most visually distinctive element of the NousNet website hero.

**Source:** `PsycheFoundation/nousnet/website/frontend/src/gl/frag.glsl:1` · `vert.glsl:1` · `dither.glsl:1-184` · `regl.ts:1` · `icosphere.ts:1-4`
**Required npm:** `regl`, `gl-matrix`

---

## Files

| File | Purpose |
|---|---|
| `regl.ts` | Orchestration — canvas setup, frame loop, mouse tracking |
| `icosphere.ts` | Geometry — subdivided sphere mesh (positions + cells) |
| `vert.glsl` | Vertex shader — MVP transform, noise displacement |
| `frag.glsl` | Fragment shader — noise color mapping, lighting, dither |
| `noise.glsl` | Simplex 4D noise implementation |
| `dither.glsl` | 8×8 Bayer matrix ordered dithering |

---

## frag.glsl (source excerpt)

```glsl
precision mediump float;
varying float noiseAmt;
varying float noiseAmt2;
varying vec3 fragNrm;
varying vec3 fragWorldPos;

uniform vec3 lightDir;
uniform vec3 eye;
uniform vec3 ditherColor;

#include dither.glsl

float bell(float _min, float _max, float value) {
  float mid = (_min + _max) / 2.;
  return smoothstep(_min, mid, value) * smoothstep(_max, mid, value);
}

vec3 noiseColor(float n) {
  vec3 col = vec3(.3686, 0., 0.)       * smoothstep(.8, 0., n)    +  /* dark red */
             vec3(.1059, .0627, .7255) * bell(.4, .7, n)           +  /* blue/purple */
             vec3(.0627, .7255, .4471) * bell(.5, .8, n)           +  /* cyan-green */
             vec3(0., 1., 1.)          * smoothstep(.5, 1., n);        /* cyan */
  return col;
}

void main() {
  vec3 nrm = normalize(fragNrm);
  vec3 viewDir = normalize(eye - fragWorldPos);
  vec3 col = noiseColor(noiseAmt);

  float diffuseAmt = max(0.3, dot(nrm, lightDir));
  vec3 diffuseCol = col * diffuseAmt * 0.9;

  vec3 halfVec = normalize(viewDir + lightDir);
  float specAmt = pow(max(0., dot(nrm, halfVec)), 15.);
  vec3 rgbCol = diffuseCol + specAmt;

  gl_FragColor = vec4(ditherColor, dither(rgbCol));
}
```

**Color mapping:** noise value `n` (0–1) maps to:
- Near 0 → dark red (`#5e0000`)
- 0.4–0.7 → blue/purple (`#1b10ba`)
- 0.5–0.8 → cyan-green (`#10b972`)
- Near 1 → pure cyan (`#00ffff`)

---

## dither.glsl (abridged source excerpt)

```glsl
float mod2(float a, float b) { return a - (b * floor(a / b)); }

float indexMatrix8(int index) {
  if (index ==  0) return  0.; if (index ==  1) return 32.;
  if (index ==  2) return  8.; if (index ==  3) return 40.;
  if (index ==  4) return  2.; if (index ==  5) return 34.;
  if (index ==  6) return 10.; if (index ==  7) return 42.;
  if (index ==  8) return 48.; if (index ==  9) return 16.;
  if (index == 10) return 56.; if (index == 11) return 24.;
  if (index == 12) return 50.; if (index == 13) return 18.;
  if (index == 14) return 58.; if (index == 15) return 26.;
  if (index == 16) return 12.; if (index == 17) return 44.;
  if (index == 18) return  4.; if (index == 19) return 36.;
  if (index == 20) return 14.; if (index == 21) return 46.;
  if (index == 22) return  6.; if (index == 23) return 38.;
  if (index == 24) return 60.; if (index == 25) return 28.;
  if (index == 26) return 52.; if (index == 27) return 20.;
  if (index == 28) return 62.; if (index == 29) return 30.;
  if (index == 30) return 54.; if (index == 31) return 22.;
  if (index == 32) return  3.; if (index == 33) return 35.;
  if (index == 34) return 11.; if (index == 35) return 43.;
  if (index == 36) return  1.; if (index == 37) return 33.;
  if (index == 38) return  9.; if (index == 39) return 41.;
  if (index == 40) return 51.; if (index == 41) return 19.;
  if (index == 42) return 59.; if (index == 43) return 27.;
  if (index == 44) return 49.; if (index == 45) return 17.;
  if (index == 46) return 57.; if (index == 47) return 25.;
  if (index == 48) return 15.; if (index == 49) return 47.;
  if (index == 50) return  7.; if (index == 51) return 39.;
  if (index == 52) return 13.; if (index == 53) return 45.;
  if (index == 54) return  5.; if (index == 55) return 37.;
  if (index == 56) return 63.; if (index == 57) return 31.;
  if (index == 58) return 55.; if (index == 59) return 23.;
  if (index == 60) return 61.; if (index == 61) return 29.;
  if (index == 62) return 53.; if (index == 63) return 21.;
  return 0.;
}

float indexValue() {
  int x = int(mod2(gl_FragCoord.x, 8.));
  int y = int(mod2(gl_FragCoord.y, 8.));
  return indexMatrix8(x + y * 8) / 64.0;
}

float dither(vec3 color) {
  float x = color.x;
  float closestColor = (x < 0.5) ? 0.0 : 1.0;
  float secondClosestColor = 1. - closestColor;
  float d = indexValue();
  float distance = abs(x - closestColor);
  return (distance < d) ? closestColor : secondClosestColor;
}
```

---

## vert.glsl (source excerpt)

```glsl
attribute vec3 position;
uniform mat4 mvp;
uniform mat4 model;
uniform mat3 normal;
uniform float time;
varying float noiseAmt;
varying float noiseAmt2;
varying vec3 fragNrm;
varying vec3 fragWorldPos;
uniform vec2 mousePos;
uniform bool mouseIn;

#include noise.glsl

float noise(vec3 x) {
  float n1 = snoise(vec4(x, time)) * .5 + .5;
  float n2 = snoise(vec4(x * 4., time)) * .5 + .5;
  float n = mix(n1, n1 * n2 * n2, .25);
  return n;
}
```

The important correction here is that the source shader samples `snoise(vec4(x, time))` and `snoise(vec4(x * 4., time))`; it does not call `snoise(vec4(position, time * 0.4))`.

---

## noise.glsl (Simplex 4D — Ian McEwan / Ashima Arts)

The file implements `snoise(vec4 v)` — full simplex 4D noise. Key signature:

```glsl
float snoise(vec4 v);
// Returns: noise value in [-1, 1]
// Input: 4D vector (xyz = position, w = time for animation)
```

The vertex shader uses two simplex samples, `snoise(vec4(x, time))` and `snoise(vec4(x * 4., time))`, to animate the sphere surface over time.

---

## icosphere.ts (geometry excerpt)

```typescript
export function makeIcosphere(subdivisions: number = 0) {
  const positions: Point[] = []
  const faces: Point[] = []
  const t = 0.5 + Math.sqrt(5) / 2

  positions.push(
    [-1, +t, 0], [+1, +t, 0], [-1, -t, 0], [+1, -t, 0],
    [0, -1, +t], [0, +1, +t], [0, -1, -t], [0, +1, -t],
    [+t, 0, -1], [+t, 0, +1], [-t, 0, -1], [-t, 0, +1]
  )

  faces.push(
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11]
  )
}
```

---

## regl.ts — source excerpt

```typescript
import makeRegl from "regl";
import { mat4, vec3 } from "gl-matrix";
import { icosphere } from "./icosphere";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

export function createSphereAnimation(
  canvas: HTMLCanvasElement,
  ditherColor: string          // hex color — e.g. "#ffbd38" for gold tint
) {
  const abort = new AbortController();
  const mouse = makeMouse(canvas, abort.signal);
  const regl = makeRegl({ canvas, attributes: { premultipliedAlpha: false } });

  const camera = regl<CameraUniforms, {}, Props, CustomContext>({
    context: {
      // mvp, model, eye, time, normal matrices computed here
    },
    uniforms: { mvp, model, eye, time, normal, ditherColor }
  });

  const drawSphere = regl({
    vert, frag,
    attributes: { position: icosphere.positions },  // level-6 icosphere
    elements: icosphere.cells,
    uniforms: {
      lightDir: [1, 1, 0.3],
      mousePos,
      mouseIn
    }
  });

  const cancelRegl = regl.frame(() => {
    camera({ eye: [0, 0, 1.4], target: [0, 0, 0] }, () => {
      regl.clear({ color: [0, 0, 0, 0] });
      drawSphere();
    });
  });

  return () => {
    cancelRegl();
    abort.abort();
    regl.destroy();
  };
}
```

---

Mouse behavior correction: the `lightDir` uniform remains fixed. Interactivity comes from `mousePos` / `mouseIn` uniforms consumed by the vertex shader, which push vertices away from the pointer.

---

## Integration in React/Next.js

```tsx
import { useEffect, useRef } from "react";

export function DitheredSphere({ color = "#ffbd38" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Dynamic import to avoid SSR issues
    const cleanup = import("@/lib/gl/regl").then(({ createSphereAnimation }) =>
      createSphereAnimation(canvasRef.current!, color)
    );
    return () => { cleanup.then(fn => fn()); };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="h-full w-full bg-transparent"
    />
  );
}
```

---

## Required npm Packages

```bash
npm install regl gl-matrix
npm install --save-dev @types/gl-matrix
```

---

## Usage Notes

- `ditherColor` drives the final fragment color — pass `#ffbd38` for gold, `#ffe6cb` for cream, or `#041c1c` for a near-invisible ghost sphere
- The sphere uses `premultipliedAlpha: false` on the WebGL context — required for correct transparency compositing over the dark background
- The frame loop runs continuously — always return the cleanup function from `useEffect`
- Canvas should be positioned absolutely over the hero section with `pointer-events: none` if not interactive
- Performance: the icosphere at level 6 (~10k triangles) runs smoothly at 60fps on modern GPUs; reduce subdivision level for mobile

---

## Preview HTML

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #041c1c; color: #ffe6cb; font-family: monospace; }
  .frame { width: 320px; height: 320px; border: 1px solid rgba(255,230,203,0.15); display: grid; place-items: center; }
  .note { max-width: 18rem; text-align: center; line-height: 1.5; }
</style>
</head>
<body>
  <div class="frame"><div class="note">This effect requires WebGL + shader orchestration. Use the excerpts above as the implementation source.</div></div>
</body>
</html>
```
