"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { createDitherRenderer, studioScene } from "./dither"

const MAX_RIPPLES = 6

// One solid that blends sphere → cube → octahedron and ripples under the cursor.
/** Drifts between shapes on its own; the visitor can ripple and spin it. Sized by `className`. */
export default function Morph({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const shapeRef = useRef(0)

  useEffect(() => {
    const el = wrap.current!
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const dither = createDitherRenderer(canvas.current!)
    const scene = studioScene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60)
    camera.position.set(0, 0, 7.5)

    const geo = new THREE.SphereGeometry(1, 128, 96)
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const dirs = Float32Array.from(posAttr.array) // unit directions, the morph basis
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }))
    scene.add(mesh)

    const ripples: { o: THREE.Vector3; t0: number; amp: number }[] = []
    const ray = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const inv = new THREE.Matrix4()
    let lastRipple = 0

    function hitDir(e: PointerEvent) {
      const r = el.getBoundingClientRect()
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      ray.setFromCamera(ndc, camera)
      const hit = ray.intersectObject(mesh)[0]
      if (!hit) return null
      return hit.point.clone().applyMatrix4(inv.copy(mesh.matrixWorld).invert()).normalize()
    }
    function addRipple(o: THREE.Vector3, amp: number) {
      ripples.push({ o, t0: performance.now() / 1000, amp })
      if (ripples.length > MAX_RIPPLES) ripples.shift()
    }

    const rot = { x: 0.3, y: 0, vx: 0, vy: reduce ? 0 : 0.003 }
    let drag: { x: number; y: number; moved: number } | null = null
    function onMove(e: PointerEvent) {
      if (drag) {
        const dx = e.clientX - drag.x
        const dy = e.clientY - drag.y
        drag.x = e.clientX
        drag.y = e.clientY
        drag.moved += Math.abs(dx) + Math.abs(dy)
        rot.vy = dx * 0.005
        rot.vx = dy * 0.005
        return
      }
      const now = performance.now()
      if (reduce || now - lastRipple < 120) return
      const d = hitDir(e)
      if (d) {
        addRipple(d, 0.07)
        lastRipple = now
      }
    }
    function onDown(e: PointerEvent) {
      el.setPointerCapture(e.pointerId)
      drag = { x: e.clientX, y: e.clientY, moved: 0 }
    }
    function onUp(e: PointerEvent) {
      if (drag && drag.moved < 6) {
        const d = hitDir(e)
        if (d) addRipple(d, 0.22)
      }
      drag = null
    }
    let cycle = 0
    const timer = !reduce ? setInterval(() => (shapeRef.current = ++cycle % 3), 4000) : 0
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      dither.setSize(w, h)
      camera.aspect = w / h
      camera.position.z = w < 640 ? 10 : 7.5
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(el)

    let m = 0 // eased shape value, 0 sphere, 1 cube, 2 octahedron
    function frame() {
      raf = 0
      const now = performance.now() / 1000
      m += (shapeRef.current - m) * (reduce ? 1 : 0.06)
      const toCube = Math.min(m, 1)
      const toOcta = Math.max(m - 1, 0)
      while (ripples.length && now - ripples[0].t0 > 2.5) ripples.shift()

      for (let i = 0; i < dirs.length; i += 3) {
        const x = dirs[i], y = dirs[i + 1], z = dirs[i + 2]
        const ax = Math.abs(x), ay = Math.abs(y), az = Math.abs(z)
        const sphere = 1.7
        const cube = 1.32 / Math.max(ax, ay, az)
        const octa = 2.0 / (ax + ay + az)
        let r = sphere + (cube - sphere) * toCube
        r += (octa - r) * toOcta
        for (const rp of ripples) {
          const ang = Math.acos(Math.min(1, x * rp.o.x + y * rp.o.y + z * rp.o.z))
          const age = now - rp.t0
          r += rp.amp * Math.exp(-age * 1.6) * Math.exp(-((ang - age * 1.4) ** 2) / 0.02) * Math.cos(ang * 18 - age * 9)
        }
        posAttr.setXYZ(i / 3, x * r, y * r, z * r)
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()
      geo.computeBoundingSphere() // keep raycasts valid after displacement

      if (!drag) {
        rot.vy += ((reduce ? 0 : 0.003) - rot.vy) * 0.03
        rot.vx *= 0.92
      }
      rot.y += rot.vy
      rot.x = THREE.MathUtils.clamp(rot.x + rot.vx, -1.2, 1.2)
      mesh.rotation.set(rot.x, rot.y, 0)

      dither.render(scene, camera)
      if (visible) raf = requestAnimationFrame(frame)
    }
    resize()
    raf = requestAnimationFrame(frame)

    return () => {
      clearInterval(timer)
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      geo.dispose()
      dither.dispose()
    }
  }, [])

  return (
    <div ref={wrap} className={`relative w-full cursor-grab touch-pan-y select-none ${className}`}>
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  )
}
