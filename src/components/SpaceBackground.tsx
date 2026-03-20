import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Star layers
    const starLayers: THREE.Points[] = [];
    const starSpeeds = [0.0002, 0.0004, 0.0006, 0.001];
    const starCounts = [200, 180, 150, 120];
    const starDepths = [800, 600, 400, 200];

    starSpeeds.forEach((speed, i) => {
      const geo = new THREE.BufferGeometry();
      const count = starCounts[i];
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const colors = new Float32Array(count * 3);

      const colorPalette = [
        new THREE.Color('#ffffff'),
        new THREE.Color('#00ffe7'),
        new THREE.Color('#a855f7'),
        new THREE.Color('#fbbf24'),
        new THREE.Color('#f472b6'),
        new THREE.Color('#7dd3fc'),
      ];

      for (let j = 0; j < count; j++) {
        positions[j * 3] = (Math.random() - 0.5) * 2000;
        positions[j * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[j * 3 + 2] = (Math.random() - 0.5) * starDepths[i];
        sizes[j] = Math.random() * 2 + 0.5;
        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[j * 3] = c.r;
        colors[j * 3 + 1] = c.g;
        colors[j * 3 + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 2 + i * 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      (points as any)._speed = speed;
      scene.add(points);
      starLayers.push(points);
    });

    // Nebula clouds
    const nebulaColors = ['#00ffe7', '#a855f7', '#f97316', '#1e3a5f'];
    const nebulae: THREE.Mesh[] = [];
    nebulaColors.forEach((color, i) => {
      const geo = new THREE.PlaneGeometry(600, 600);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        -300 - i * 100
      );
      mesh.rotation.z = Math.random() * Math.PI;
      scene.add(mesh);
      nebulae.push(mesh);
    });

    // Ambient glow orbs
    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.SphereGeometry(30 + Math.random() * 40, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(['#00ffe7', '#a855f7', '#fbbf24', '#f472b6', '#7dd3fc'][i]),
        transparent: true,
        opacity: 0.015,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const orb = new THREE.Mesh(geo, mat);
      orb.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        -200 - Math.random() * 300
      );
      scene.add(orb);
      orbs.push(orb);
    }

    // Shooting stars
    const shootingStars: { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number; maxLife: number }[] = [];
    const createShootingStar = () => {
      const geo = new THREE.CylinderGeometry(0.3, 0, 40, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#00ffe7'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 1500,
        400 + Math.random() * 200,
        (Math.random() - 0.5) * 400
      );
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      mesh.rotation.z = angle;
      const speed = 8 + Math.random() * 5;
      const velocity = new THREE.Vector3(Math.cos(angle) * speed, Math.sin(angle) * speed, 0);
      scene.add(mesh);
      shootingStars.push({ mesh, velocity, life: 0, maxLife: 60 + Math.random() * 40 });
    };

    let shootingStarTimer = 0;

    // Animation
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Star rotation
      starLayers.forEach((layer) => {
        layer.rotation.y += (layer as any)._speed;
        layer.rotation.x += (layer as any)._speed * 0.3;
      });

      // Nebula breathing
      nebulae.forEach((n, i) => {
        const scale = 1 + Math.sin(elapsed * 0.3 + i) * 0.1;
        n.scale.set(scale, scale, 1);
        (n.material as THREE.MeshBasicMaterial).opacity = 0.025 + Math.sin(elapsed * 0.2 + i * 1.5) * 0.015;
      });

      // Orb breathing
      orbs.forEach((o, i) => {
        const scale = 1 + Math.sin(elapsed * 0.4 + i * 2) * 0.2;
        o.scale.set(scale, scale, scale);
      });

      // Shooting stars
      shootingStarTimer++;
      if (shootingStarTimer > 150) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.mesh.position.add(s.velocity);
        const progress = s.life / s.maxLife;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = progress < 0.2
          ? progress * 5
          : progress > 0.7
          ? (1 - progress) / 0.3
          : 1;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity *= 0.6;

        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          (s.mesh.material as THREE.MeshBasicMaterial).dispose();
          shootingStars.splice(i, 1);
        }
      }

      // Mouse parallax
      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 30 - camera.position.y) * 0.02;
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
