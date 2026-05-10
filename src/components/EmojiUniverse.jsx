/**
 * EmojiUniverse — Three.js canvas background for Auth page
 * Continuously floats emoji sprites (❤️ 👍 🫶 💬 🌟 🔥 🎉 ✨ 💡 🚀 😄 🎨)
 * upward with randomised depth, scale, speed, rotation & opacity.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EMOJIS = ['❤️', '👍', '🫶', '💬', '🌟', '🔥', '🎉', '✨', '💡', '🚀', '😄', '🎨', '💜', '🤝', '⚡'];
const COUNT  = 55;    // total sprites alive at once
const CANVAS_SIZE = 128; // texture canvas px

/* Build a canvas-texture for a single emoji */
function makeEmojiTexture(emoji) {
  const c = document.createElement('canvas');
  c.width  = CANVAS_SIZE;
  c.height = CANVAS_SIZE;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.font         = `${CANVAS_SIZE * 0.72}px serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* Randomise a sprite's starting state */
function randomise(sprite, textures, vpW, vpH) {
  const t   = textures[Math.floor(Math.random() * textures.length)];
  sprite.material.map     = t;
  sprite.material.opacity = 0;
  sprite.material.needsUpdate = true;

  const scale = Math.random() * 1.6 + 0.55;
  sprite.scale.set(scale, scale, 1);

  sprite.userData.speed   = Math.random() * 0.008 + 0.003;
  sprite.userData.drift   = (Math.random() - 0.5) * 0.003;
  sprite.userData.rotSpd  = (Math.random() - 0.5) * 0.015;
  sprite.userData.phase   = Math.random() * Math.PI * 2;
  sprite.userData.life    = 0;
  sprite.userData.maxLife = Math.random() * 260 + 120; // frames

  sprite.position.set(
    (Math.random() - 0.5) * vpW,
    -vpH / 2 - scale * 0.8,              // just below screen
    (Math.random() - 0.5) * 4,
  );
}

export default function EmojiUniverse() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const aspect = mount.clientWidth / mount.clientHeight;
    const vpH    = 10;
    const vpW    = vpH * aspect;
    const camera = new THREE.OrthographicCamera(
      -vpW / 2, vpW / 2,
       vpH / 2, -vpH / 2,
      0.1, 100,
    );
    camera.position.z = 10;

    /* ── Textures ── */
    const textures = EMOJIS.map(makeEmojiTexture);

    /* ── Sprites ── */
    const sprites = [];
    for (let i = 0; i < COUNT; i++) {
      const mat     = new THREE.SpriteMaterial({ transparent: true, depthWrite: false });
      const sprite  = new THREE.Sprite(mat);
      scene.add(sprite);

      // Stagger initial positions so screen is populated from frame 1
      randomise(sprite, textures, vpW, vpH);
      sprite.position.y = (Math.random() - 0.5) * vpH;
      sprite.userData.life = Math.random() * sprite.userData.maxLife * 0.6;
      sprites.push(sprite);
    }

    /* ── Animation loop ── */
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      sprites.forEach((sp) => {
        sp.userData.life += 1;
        const l    = sp.userData.life;
        const maxL = sp.userData.maxLife;
        const fade = 18; // frames for fade in/out

        // Opacity envelope
        if (l < fade)           sp.material.opacity = l / fade;
        else if (l > maxL - fade) sp.material.opacity = (maxL - l) / fade;
        else                    sp.material.opacity = 0.78;

        // Clamp
        sp.material.opacity = Math.max(0, Math.min(0.88, sp.material.opacity));

        // Position
        sp.position.y += sp.userData.speed;
        sp.position.x += sp.userData.drift + Math.sin(l * 0.04 + sp.userData.phase) * 0.003;
        sp.material.rotation += sp.userData.rotSpd * 0.3;

        // Reset when off-screen or life done
        if (sp.position.y > vpH / 2 + 1 || l >= maxL) {
          randomise(sp, textures, vpW, vpH);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      const a   = w / h;
      const nVW = vpH * a;
      camera.left   = -nVW / 2;
      camera.right  =  nVW / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      textures.forEach((t) => t.dispose());
      sprites.forEach((sp) => {
        sp.material.dispose();
        scene.remove(sp);
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
