import * as THREE from "three"

// Renders a scene at low resolution, then maps luminance to ink or paper with an
// 8x8 ordered (Bayer) dither. Strongly blue pixels dither to the accent instead of ink.
const frag = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uGrid;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
  float bayer4(vec2 a) { return bayer2(.5 * a) * .25 + bayer2(a); }
  float bayer8(vec2 a) { return bayer4(.5 * a) * .25 + bayer2(a); }

  void main() {
    vec2 cell = floor(vUv * uGrid);
    vec4 c = texture2D(tScene, (cell + .5) / uGrid);
    float l = dot(c.rgb, vec3(.299, .587, .114));
    bool accent = c.b > c.r + .25;
    float t = bayer8(cell);
    vec3 dark = accent ? uAccent : uInk;
    // Accent marks dither denser than their luminance so legends stay readable.
    // Paper cells are transparent so the page (grid, texture) shows through.
    gl_FragColor = l * (accent ? .55 : 1.) > t ? vec4(0.) : vec4(dark, 1.);
  }
`
const vert = /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`

export const PALETTE = { ink: "#111111", accent: "#2B3BFF" }

export function createDitherRenderer(canvas: HTMLCanvasElement, cellCss = 3) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
  renderer.setPixelRatio(1)
  const target = new THREE.WebGLRenderTarget(1, 1, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter })
  const material = new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
      tScene: { value: target.texture },
      uGrid: { value: new THREE.Vector2(1, 1) },
      uInk: { value: new THREE.Color(PALETTE.ink) },
      uAccent: { value: new THREE.Color(PALETTE.accent) },
    },
  })
  const post = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  const postScene = new THREE.Scene()
  postScene.add(post)
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  function setSize(w: number, h: number) {
    const dpr = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    // One dither cell = cellCss CSS pixels, so dots stay crisp on any screen.
    const gx = Math.ceil(w / cellCss)
    const gy = Math.ceil(h / cellCss)
    target.setSize(gx, gy)
    material.uniforms.uGrid.value.set(gx, gy)
  }

  function render(scene: THREE.Scene, camera: THREE.Camera) {
    renderer.setRenderTarget(target)
    renderer.render(scene, camera)
    renderer.setRenderTarget(null)
    renderer.render(postScene, postCam)
  }

  function dispose() {
    target.dispose()
    material.dispose()
    renderer.dispose()
  }

  return { renderer, setSize, render, dispose }
}

/** White-lit studio: scene materials should be light so the dither has range. */
export function studioScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color("#ffffff")
  scene.add(new THREE.HemisphereLight(0xffffff, 0x666666, 1.1))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(-3, 5, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xffffff, 0.6)
  rim.position.set(4, 2, -3)
  scene.add(rim)
  return scene
}
