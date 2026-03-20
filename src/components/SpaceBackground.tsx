import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Custom GLSL star shader
const starVertexShader = `
  attribute float size;
  attribute float phase;
  attribute vec3 starColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = starColor;
    // Individual flicker per star
    float flicker = sin(uTime * 2.0 + phase * 6.28) * 0.3 + 
                    sin(uTime * 5.0 + phase * 12.56) * 0.15 +
                    sin(uTime * 0.7 + phase * 3.14) * 0.2;
    vAlpha = 0.5 + flicker * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (400.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    
    // Soft glow falloff
    float core = smoothstep(0.5, 0.0, dist);
    float glow = exp(-dist * 6.0) * 0.6;
    float alpha = (core + glow) * vAlpha;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Nebula shader for volumetric clouds
const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289((x * 34.0 + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 p = vUv * 3.0 - 1.5;
    float n1 = snoise(vec3(p * 1.2, uTime * 0.08)) * 0.5 + 0.5;
    float n2 = snoise(vec3(p * 2.4 + 5.0, uTime * 0.05 + 10.0)) * 0.5 + 0.5;
    float n3 = snoise(vec3(p * 0.6 + 20.0, uTime * 0.03)) * 0.5 + 0.5;
    
    float cloud = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    cloud = smoothstep(0.25, 0.75, cloud);
    
    // Radial falloff
    float dist = length(vUv - 0.5) * 2.0;
    float falloff = 1.0 - smoothstep(0.0, 1.0, dist);
    
    float alpha = cloud * falloff * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color('#00000f'), 1);
    containerRef.current.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ═══════════════ GLSL SHADER STARS (4 layers, 700+ total) ═══════════════
    const starLayers: { points: THREE.Points; speed: number }[] = [];
    const layerConfigs = [
      { count: 250, depth: 1200, size: 3.0, speed: 0.00015 },
      { count: 200, depth: 900, size: 2.5, speed: 0.00035 },
      { count: 150, depth: 600, size: 2.0, speed: 0.0006 },
      { count: 100, depth: 300, size: 1.5, speed: 0.001 },
    ];

    const colorPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#00ffe7'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#7dd3fc'),
    ];

    const timeUniform = { value: 0 };

    layerConfigs.forEach((cfg) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(cfg.count * 3);
      const sizes = new Float32Array(cfg.count);
      const phases = new Float32Array(cfg.count);
      const colors = new Float32Array(cfg.count * 3);

      for (let j = 0; j < cfg.count; j++) {
        positions[j * 3] = (Math.random() - 0.5) * 2400;
        positions[j * 3 + 1] = (Math.random() - 0.5) * 2400;
        positions[j * 3 + 2] = (Math.random() - 0.5) * cfg.depth;
        sizes[j] = (Math.random() * 1.5 + 0.5) * cfg.size;
        phases[j] = Math.random();
        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[j * 3] = c.r;
        colors[j * 3 + 1] = c.g;
        colors[j * 3 + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
      geo.setAttribute('starColor', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.ShaderMaterial({
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        uniforms: { uTime: timeUniform },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);
      starLayers.push({ points, speed: cfg.speed });
    });

    // ═══════════════ VOLUMETRIC NEBULA CLOUDS ═══════════════
    const nebulaConfigs = [
      { color: '#00ffe7', pos: [-300, 200, -700], scale: 900, opacity: 0.06 },
      { color: '#a855f7', pos: [350, -150, -800], scale: 1000, opacity: 0.05 },
      { color: '#f97316', pos: [-100, -300, -600], scale: 700, opacity: 0.04 },
      { color: '#1e3a8f', pos: [200, 300, -900], scale: 1100, opacity: 0.04 },
      { color: '#00ffe7', pos: [400, 100, -500], scale: 600, opacity: 0.03 },
      { color: '#7c3aed', pos: [-400, -200, -650], scale: 800, opacity: 0.035 },
    ];

    const nebulaMeshes: THREE.Mesh[] = [];
    nebulaConfigs.forEach((cfg) => {
      const geo = new THREE.PlaneGeometry(cfg.scale, cfg.scale);
      const mat = new THREE.ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: {
          uTime: timeUniform,
          uColor: { value: new THREE.Color(cfg.color) },
          uOpacity: { value: cfg.opacity },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      mesh.rotation.z = Math.random() * Math.PI;
      scene.add(mesh);
      nebulaMeshes.push(mesh);
    });

    // ═══════════════ AMBIENT GLOW ORBS ═══════════════
    const orbData = [
      { color: '#00ffe7', r: 60 }, { color: '#a855f7', r: 80 },
      { color: '#fbbf24', r: 50 }, { color: '#f472b6', r: 70 },
      { color: '#7dd3fc', r: 55 }, { color: '#6d28d9', r: 90 },
    ];
    const orbs: THREE.Mesh[] = [];
    orbData.forEach((o) => {
      const geo = new THREE.SphereGeometry(o.r, 24, 24);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(o.color),
        transparent: true,
        opacity: 0.012,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200,
        -300 - Math.random() * 500
      );
      scene.add(mesh);
      orbs.push(mesh);
    });

    // ═══════════════ SHOOTING STARS ═══════════════
    type ShootingStar = {
      mesh: THREE.Mesh;
      trail: THREE.Line;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
      positions: THREE.Vector3[];
    };
    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      const startX = (Math.random() - 0.5) * 1800;
      const startY = 500 + Math.random() * 300;
      const startZ = (Math.random() - 0.5) * 400 - 200;
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      const speed = 10 + Math.random() * 8;

      // Head
      const headGeo = new THREE.SphereGeometry(1.5, 8, 8);
      const headMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ffe7'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.set(startX, startY, startZ);
      scene.add(headMesh);

      // Trail
      const trailLen = 30;
      const trailPositions: THREE.Vector3[] = [];
      for (let i = 0; i < trailLen; i++) {
        trailPositions.push(new THREE.Vector3(startX, startY, startZ));
      }
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPositions);
      const trailMat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#00ffe7'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      scene.add(trail);

      const velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        0
      );

      shootingStars.push({
        mesh: headMesh,
        trail,
        velocity,
        life: 0,
        maxLife: 70 + Math.random() * 40,
        positions: trailPositions,
      });
    };

    let shootingStarTimer = 0;

    // ═══════════════ WARP SPEED / HYPERSPACE ═══════════════
    const warpLineCount = 300;
    const warpGeo = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpLineCount * 6); // 2 vertices per line
    const warpColors = new Float32Array(warpLineCount * 6);
    const warpSpeeds = new Float32Array(warpLineCount);
    const warpAngles = new Float32Array(warpLineCount);
    const warpRadii = new Float32Array(warpLineCount);

    const warpColorPalette = [
      new THREE.Color('#00ffe7'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#7dd3fc'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#fbbf24'),
    ];

    for (let i = 0; i < warpLineCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 350;
      const z = (Math.random() - 0.5) * 1500;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Start and end vertices (identical initially)
      warpPositions[i * 6] = x;
      warpPositions[i * 6 + 1] = y;
      warpPositions[i * 6 + 2] = z;
      warpPositions[i * 6 + 3] = x;
      warpPositions[i * 6 + 4] = y;
      warpPositions[i * 6 + 5] = z;

      warpSpeeds[i] = 15 + Math.random() * 35;
      warpAngles[i] = angle;
      warpRadii[i] = radius;

      const c = warpColorPalette[Math.floor(Math.random() * warpColorPalette.length)];
      warpColors[i * 6] = c.r; warpColors[i * 6 + 1] = c.g; warpColors[i * 6 + 2] = c.b;
      warpColors[i * 6 + 3] = c.r; warpColors[i * 6 + 4] = c.g; warpColors[i * 6 + 5] = c.b;
    }

    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    warpGeo.setAttribute('color', new THREE.BufferAttribute(warpColors, 3));

    const warpMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const warpLines = new THREE.LineSegments(warpGeo, warpMat);
    scene.add(warpLines);

    // Warp state
    let warpActive = false;
    let warpProgress = 0; // 0→1 ramp up, hold, then ramp down
    let warpPhase: 'idle' | 'accelerate' | 'cruise' | 'decelerate' = 'idle';
    let warpTimer = 0;
    const WARP_ACCEL = 40; // frames
    const WARP_CRUISE = 50;
    const WARP_DECEL = 50;

    // Flash overlay
    const flashGeo = new THREE.PlaneGeometry(4000, 4000);
    const flashMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00ffe7'),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.z = camera.position.z - 50;
    scene.add(flashMesh);

    const triggerWarp = () => {
      if (warpPhase !== 'idle') return;
      warpActive = true;
      warpPhase = 'accelerate';
      warpTimer = 0;
      warpProgress = 0;

      // Reset warp line positions
      const pos = warpGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < warpLineCount; i++) {
        const angle = warpAngles[i];
        const radius = warpRadii[i];
        const z = (Math.random() - 0.5) * 1500;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        pos.setXYZ(i * 2, x, y, z);
        pos.setXYZ(i * 2 + 1, x, y, z);
      }
      pos.needsUpdate = true;
    };

    const handleWarpEvent = () => triggerWarp();
    window.addEventListener('warp-speed', handleWarpEvent);

    // ═══════════════ ANIMATION LOOP ═══════════════
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      timeUniform.value = elapsed;

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;

      // Star layer rotation
      starLayers.forEach(({ points, speed }) => {
        points.rotation.y += speed;
        points.rotation.x += speed * 0.3;
      });

      // Nebula slow drift
      nebulaMeshes.forEach((mesh, i) => {
        mesh.rotation.z += 0.0001 * (i % 2 === 0 ? 1 : -1);
        const s = 1 + Math.sin(elapsed * 0.15 + i * 1.2) * 0.08;
        mesh.scale.set(s, s, 1);
      });

      // Orb breathing
      orbs.forEach((o, i) => {
        const s = 1 + Math.sin(elapsed * 0.3 + i * 1.8) * 0.25;
        o.scale.set(s, s, s);
        (o.material as THREE.MeshBasicMaterial).opacity = 0.01 + Math.sin(elapsed * 0.2 + i) * 0.006;
      });

      // ── WARP ANIMATION ──
      if (warpActive) {
        warpTimer++;
        if (warpPhase === 'accelerate') {
          warpProgress = Math.min(1, warpTimer / WARP_ACCEL);
          if (warpTimer >= WARP_ACCEL) { warpPhase = 'cruise'; warpTimer = 0; }
        } else if (warpPhase === 'cruise') {
          warpProgress = 1;
          if (warpTimer >= WARP_CRUISE) { warpPhase = 'decelerate'; warpTimer = 0; }
        } else if (warpPhase === 'decelerate') {
          warpProgress = 1 - warpTimer / WARP_DECEL;
          if (warpTimer >= WARP_DECEL) {
            warpPhase = 'idle';
            warpActive = false;
            warpProgress = 0;
          }
        }

        const eased = warpProgress * warpProgress; // ease-in feel
        warpMat.opacity = eased * 0.7;

        // Stretch warp lines toward camera (z direction)
        const pos = warpGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < warpLineCount; i++) {
          const z = pos.getZ(i * 2);
          const newZ = z + warpSpeeds[i] * eased;

          // Tail vertex stays, head vertex streaks forward
          pos.setZ(i * 2 + 1, newZ);

          // If past camera, reset
          if (newZ > camera.position.z + 200) {
            const resetZ = -800 - Math.random() * 600;
            const angle = warpAngles[i];
            const radius = warpRadii[i];
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            pos.setXYZ(i * 2, x, y, resetZ);
            pos.setXYZ(i * 2 + 1, x, y, resetZ);
          } else {
            // Move tail to follow with streak length
            const streakLen = Math.min(80 * eased, newZ - pos.getZ(i * 2));
            pos.setZ(i * 2, newZ - streakLen);
          }
        }
        pos.needsUpdate = true;

        // Flash at peak
        if (warpPhase === 'cruise' && warpTimer < 5) {
          flashMat.opacity = 0.15 * (1 - warpTimer / 5);
        } else {
          flashMat.opacity *= 0.9;
        }
        flashMesh.position.z = camera.position.z - 50;

        // Camera FOV zoom effect
        camera.fov = 60 + eased * 30;
        camera.updateProjectionMatrix();
      } else {
        warpMat.opacity *= 0.95;
        if (camera.fov > 60.1) {
          camera.fov += (60 - camera.fov) * 0.05;
          camera.updateProjectionMatrix();
        }
        flashMat.opacity *= 0.9;
      }

      // Shooting stars
      shootingStarTimer++;
      if (shootingStarTimer > 140 + Math.random() * 40) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.mesh.position.add(s.velocity);

        // Update trail
        for (let t = s.positions.length - 1; t > 0; t--) {
          s.positions[t].copy(s.positions[t - 1]);
        }
        s.positions[0].copy(s.mesh.position);
        (s.trail.geometry as THREE.BufferGeometry).setFromPoints(s.positions);

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.15
          ? progress / 0.15
          : progress > 0.6
          ? (1 - progress) / 0.4
          : 1;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = alpha * 0.9;
        (s.trail.material as THREE.LineBasicMaterial).opacity = alpha * 0.5;

        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          scene.remove(s.trail);
          s.mesh.geometry.dispose();
          (s.mesh.material as THREE.MeshBasicMaterial).dispose();
          s.trail.geometry.dispose();
          (s.trail.material as THREE.LineBasicMaterial).dispose();
          shootingStars.splice(i, 1);
        }
      }

      // Mouse parallax camera drift
      camera.position.x += (mouse.x * 40 - camera.position.x) * 0.015;
      camera.position.y += (-mouse.y * 40 - camera.position.y) * 0.015;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('warp-speed', handleWarpEvent);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0"
      style={{ zIndex: 0 }}
    />
  );
};

export default SpaceBackground;
