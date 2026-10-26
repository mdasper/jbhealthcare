import React, { Component, Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * BodyViewer3D
 * ------------------------------------------------------------------
 * Premium 3D body for the Symptom Explorer.
 *  - Works instantly with a built-in holographic body (no download needed)
 *  - Pass modelUrl="/models/human-body.glb" to use a real anatomical model
 *  - Drag to rotate; rotating to the back flips the Front/Back tabs automatically
 *  - Hotspots are real 3D points that hide when they face away from the camera
 *
 * Install:  npm i three @react-three/fiber @react-three/drei
 *           (React 18 -> @react-three/fiber@8 + @react-three/drei@9)
 *           (React 19 -> @react-three/fiber@9 + @react-three/drei@10)
 */

const GOLD = '#E0A96D';
const NAVY = '#0B2B4E';
const BODY_HEIGHT = 1.8;

/* [x, y, z] in metres. Body faces +z (front), feet at y = 0.
   For a downloaded GLB, turn on debugPick, click the model and
   copy the logged coordinates in here (or pass them via hotspotPos). */
export const HOTSPOT_POS = {
  // front
  head: [0, 1.7, 0.11],
  neck: [0, 1.55, 0.06],
  chest: [0, 1.36, 0.13],
  upper_abdomen: [-0.06, 1.17, 0.11],
  lower_abdomen: [0.05, 1.01, 0.11],
  pelvis_urinary: [-0.05, 0.89, 0.115],
  female_pelvis: [0.05, 0.77, 0.1],
  upper_joints: [-0.27, 1.25, 0.05],
  lower_joints: [-0.1, 0.48, 0.07],
  skin_wounds: [0.1, 0.2, 0.05],
  // back
  back_cervical: [0, 1.54, -0.06],
  back_lumbar: [0, 1.0, -0.11],
  back_kidneys: [0.09, 1.12, -0.1],
  back_anorectal: [0, 0.82, -0.115],
};

/* ------------------------------------------------------------------ */
/* Holographic material: fresnel rim + moving scan band + fine lines   */
/* ------------------------------------------------------------------ */
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vWorldY;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vWorldY = (modelMatrix * vec4(position, 1.0)).y;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uRim;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vWorldY;
  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    float y = fract(uTime * 0.16);
    float band = smoothstep(0.07, 0.0, abs(vWorldY / ${BODY_HEIGHT.toFixed(2)} - y));
    float lines = smoothstep(0.93, 1.0, fract(vWorldY * 42.0)) * 0.1;
    vec3 col = mix(uBase, uRim, fres) + uRim * (band * 0.65 + lines);
    float alpha = 0.62 + fres * 0.38 + band * 0.25;
    gl_FragColor = vec4(col, alpha);
  }
`;

function useHoloMaterial() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uBase: { value: new THREE.Color('#12365F') },
          uRim: { value: new THREE.Color(GOLD) },
          uTime: { value: 0 },
        },
      }),
    []
  );
  useEffect(() => () => mat.dispose(), [mat]);
  return mat;
}

/* ------------------------------------------------------------------ */
/* Built-in body (used when no GLB is given, or when the GLB fails)    */
/* ------------------------------------------------------------------ */
function Limb({ from, to, r1, r2, mat }) {
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const length = dir.length();
    return {
      pos: a.clone().add(b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      ),
      len: length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from.join(), to.join()]);

  return (
    <group>
      <mesh position={pos} quaternion={quat} material={mat}>
        <cylinderGeometry args={[r2, r1, len, 24, 1]} />
      </mesh>
      <mesh position={from} material={mat}>
        <sphereGeometry args={[r1, 24, 16]} />
      </mesh>
      <mesh position={to} material={mat}>
        <sphereGeometry args={[r2, 24, 16]} />
      </mesh>
    </group>
  );
}

function Blob({ position, scale, mat }) {
  return (
    <mesh position={position} scale={scale} material={mat}>
      <sphereGeometry args={[1, 40, 28]} />
    </mesh>
  );
}

function ProceduralBody({ mat }) {
  return (
    <group>
      <Blob position={[0, 1.69, 0.005]} scale={[0.1, 0.115, 0.108]} mat={mat} />
      <Limb from={[0, 1.6, 0]} to={[0, 1.5, 0]} r1={0.05} r2={0.048} mat={mat} />
      <Blob position={[0, 1.33, 0]} scale={[0.2, 0.25, 0.12]} mat={mat} />
      <Blob position={[0, 1.08, 0]} scale={[0.155, 0.2, 0.1]} mat={mat} />
      <Blob position={[0, 0.88, 0]} scale={[0.175, 0.13, 0.11]} mat={mat} />

      {[-1, 1].map((s) => (
        <React.Fragment key={s}>
          <Limb from={[s * 0.21, 1.45, 0]} to={[s * 0.27, 1.17, 0.01]} r1={0.055} r2={0.042} mat={mat} />
          <Limb from={[s * 0.27, 1.17, 0.01]} to={[s * 0.31, 0.92, 0.03]} r1={0.042} r2={0.032} mat={mat} />
          <Blob position={[s * 0.32, 0.86, 0.03]} scale={[0.03, 0.06, 0.02]} mat={mat} />
          <Limb from={[s * 0.09, 0.86, 0]} to={[s * 0.1, 0.48, 0.01]} r1={0.085} r2={0.058} mat={mat} />
          <Limb from={[s * 0.1, 0.48, 0.01]} to={[s * 0.1, 0.07, 0]} r1={0.055} r2={0.035} mat={mat} />
          <Blob position={[s * 0.1, 0.035, 0.05]} scale={[0.04, 0.03, 0.09]} mat={mat} />
        </React.Fragment>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Optional real model (GLB)                                           */
/* ------------------------------------------------------------------ */
function GLBBody({ url, holo, mat, rotationY }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    clone.scale.setScalar(BODY_HEIGHT / size.y);

    const box2 = new THREE.Box3().setFromObject(clone);
    const center = box2.getCenter(new THREE.Vector3());
    clone.position.x -= center.x;
    clone.position.z -= center.z;
    clone.position.y -= box2.min.y;

    clone.traverse((o) => {
      if (o.isMesh && holo) o.material = mat;
    });
    return clone;
  }, [scene, holo, mat]);

  return (
    <group rotation={[0, rotationY, 0]}>
      <primitive object={model} />
    </group>
  );
}

class ModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('[BodyViewer3D] GLB failed to load, using built-in body.', err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* Hotspot (HTML pin attached to a 3D point)                           */
/* ------------------------------------------------------------------ */
const _v = new THREE.Vector3();

function Hotspot({ spot, position, selected, onSelect }) {
  const ref = useRef();
  const world = useMemo(() => new THREE.Vector3(...position), [position]);
  const facing = spot.view === 'front' ? 1 : -1;

  useFrame(({ camera }) => {
    if (!ref.current) return;
    _v.copy(camera.position).sub(world).normalize();
    const vis = THREE.MathUtils.clamp((_v.z * facing - 0.1) / 0.35, 0, 1);
    ref.current.style.opacity = String(vis);
    ref.current.style.pointerEvents = vis > 0.5 ? 'auto' : 'none';
  });

  return (
    <Html position={position} center zIndexRange={[20, 0]}>
      <button
        ref={ref}
        type="button"
        className={`b3d-hot${selected ? ' is-selected' : ''}`}
        onClick={() => onSelect(spot)}
        aria-label={spot.labelEn}
      >
        <span className="b3d-ring" />
        <span className="b3d-dot" />
        <span className="b3d-label">{spot.labelEn}</span>
      </button>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/* Camera: fly to the active view / hotspot, flip tabs when rotated    */
/* ------------------------------------------------------------------ */
function CameraRig({ view, selected, positions, controlsRef, autoSwitch, onViewChange }) {
  const { camera } = useThree();
  const anim = useRef(0);
  const goal = useRef({ pos: new THREE.Vector3(), target: new THREE.Vector3() });

  useEffect(() => {
    if (autoSwitch.current) {
      // the view changed because the user rotated; don't fight their drag
      autoSwitch.current = false;
      return;
    }
    const focus = selected && selected.view === view ? positions[selected.id] : null;
    const target = focus
      ? new THREE.Vector3(focus[0] * 0.5, THREE.MathUtils.lerp(0.95, focus[1], 0.55), 0)
      : new THREE.Vector3(0, 0.95, 0);
    const dist = focus ? 2.7 : 3.8;
    const az = view === 'front' ? 0 : Math.PI;
    goal.current.target.copy(target);
    goal.current.pos.set(
      target.x + Math.sin(az) * dist,
      target.y + 0.12,
      target.z + Math.cos(az) * dist
    );
    anim.current = 1.4;
  }, [view, selected, positions, autoSwitch]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (anim.current > 0) {
      const k = 1 - Math.pow(0.0008, delta);
      camera.position.lerp(goal.current.pos, k);
      controls.target.lerp(goal.current.target, k);
      controls.update();
      anim.current -= delta;
      return;
    }

    // after the fly-to finishes: rotating by hand flips Front/Back tabs
    const dx = camera.position.x - controls.target.x;
    const dz = camera.position.z - controls.target.z;
    const ratio = dz / Math.max(Math.hypot(dx, dz), 0.001);
    const next = ratio > 0.35 ? 'front' : ratio < -0.35 ? 'back' : null;
    if (next && next !== view) {
      autoSwitch.current = true;
      onViewChange(next);
    }
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* Stage (floor rings + particles)                                     */
/* ------------------------------------------------------------------ */
function Stage() {
  const ring = useRef();
  useFrame((_, d) => {
    if (ring.current) ring.current.rotation.z += d * 0.25;
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[0.62, 64]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.6, 0.625, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.9} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[0.78, 0.792, 96, 1, 0, Math.PI * 1.45]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.45} />
      </mesh>
      <Sparkles count={55} scale={[2.1, 2.3, 2.1]} position={[0, 0.95, 0]} size={2.2} speed={0.25} opacity={0.55} color={GOLD} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */
function Scene({
  hotspots, positions, view, selected, onSelect, onViewChange,
  modelUrl, holo, modelRotationY, debugPick,
}) {
  const controlsRef = useRef();
  const autoSwitch = useRef(false);
  const mat = useHoloMaterial();

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
  });

  const fallback = <ProceduralBody mat={mat} />;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 3]} intensity={1.1} />

      <group
        onClick={(e) => {
          if (!debugPick) return;
          e.stopPropagation();
          console.log('[x, y, z] =', e.point.toArray().map((n) => +n.toFixed(3)));
        }}
      >
        {modelUrl ? (
          <ModelBoundary fallback={fallback}>
            <GLBBody url={modelUrl} holo={holo} mat={mat} rotationY={modelRotationY} />
          </ModelBoundary>
        ) : (
          fallback
        )}
      </group>

      <Stage />

      {hotspots.map((spot) =>
        positions[spot.id] ? (
          <Hotspot
            key={spot.id}
            spot={spot}
            position={positions[spot.id]}
            selected={selected?.id === spot.id}
            onSelect={onSelect}
          />
        ) : null
      )}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.6}
        target={[0, 0.95, 0]}
      />

      <CameraRig
        view={view}
        selected={selected}
        positions={positions}
        controlsRef={controlsRef}
        autoSwitch={autoSwitch}
        onViewChange={onViewChange}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
const CSS = `
  /* keep vertical page scroll working on phones; horizontal drag rotates */
  .b3d-wrap canvas { touch-action: pan-y !important; }

  .b3d-hot {
    position: relative; width: 26px; height: 26px; padding: 0;
    background: none; border: 0; cursor: pointer; transition: opacity .2s;
  }
  .b3d-dot {
    position: absolute; left: 50%; top: 50%; width: 10px; height: 10px;
    margin: -5px 0 0 -5px; border-radius: 50%;
    background: #FFD166; border: 2px solid #0B2B4E;
    transition: transform .2s, background .2s;
  }
  .b3d-ring {
    position: absolute; left: 50%; top: 50%; width: 24px; height: 24px;
    margin: -12px 0 0 -12px; border-radius: 50%;
    border: 1.5px solid #E0A96D; opacity: .7;
    animation: b3dPulse 2s ease-out infinite;
  }
  .b3d-label {
    position: absolute; left: 50%; bottom: 100%; transform: translate(-50%, 4px);
    white-space: nowrap; font: 600 12px/1 system-ui, sans-serif;
    color: #fff; background: rgba(6, 22, 40, .92);
    border: 1px solid rgba(224, 169, 109, .6); border-radius: 999px;
    padding: 6px 11px; opacity: 0; pointer-events: none;
    transition: opacity .2s;
  }
  .b3d-hot:hover .b3d-dot { transform: scale(1.25); }
  .b3d-hot:hover .b3d-label,
  .b3d-hot.is-selected .b3d-label { opacity: 1; }
  .b3d-hot.is-selected .b3d-dot { background: #00E676; transform: scale(1.3); }
  .b3d-hot.is-selected .b3d-ring { border-color: #00E676; }
  .b3d-hot:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 50%; }
  .b3d-loading { color: #E0A96D; font: 600 13px system-ui, sans-serif; white-space: nowrap; }

  @keyframes b3dPulse {
    0%   { transform: scale(.7); opacity: .9; }
    80%  { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .b3d-ring { animation: none; }
  }
`;

export default function BodyViewer3D({
  hotspots,
  activeView,
  selectedId,
  onSelect,
  onViewChange,
  modelUrl = null,        // e.g. "/models/human-body.glb"
  holo = true,            // true: gold/navy hologram look; false: keep the GLB's own textures
  hotspotPos = {},        // override HOTSPOT_POS for a custom model
  modelRotationY = 0,     // set Math.PI if your GLB faces the wrong way
  debugPick = false,      // click the model to log [x, y, z] for hotspot placement
  height = 620,
}) {
  const positions = useMemo(() => ({ ...HOTSPOT_POS, ...hotspotPos }), [hotspotPos]);
  const selected = hotspots.find((h) => h.id === selectedId) || null;

  return (
    <div className="b3d-wrap" style={{ width: '100%', height, position: 'relative' }}>
      <style>{CSS}</style>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.1, 3.8], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="b3d-loading">Loading 3D body…</div>
            </Html>
          }
        >
          <Scene
            hotspots={hotspots}
            positions={positions}
            view={activeView}
            selected={selected}
            onSelect={onSelect}
            onViewChange={onViewChange}
            modelUrl={modelUrl}
            holo={holo}
            modelRotationY={modelRotationY}
            debugPick={debugPick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
