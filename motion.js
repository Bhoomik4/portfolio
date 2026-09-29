/* Small, progressively enhanced interaction layer. No animation runs while idle. */
(() => {
  'use strict';

  const root = document.documentElement;
  const canvas = document.getElementById('liquid-cursor');
  const context = canvas?.getContext('2d');
  const motionButton = document.getElementById('motion-toggle');
  const motionLabel = motionButton?.querySelector('.motion-label');
  const progress = document.getElementById('scroll-progress');
  const heroArt = document.getElementById('hero-art');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const magneticElements = [...document.querySelectorAll('[data-magnetic]')];
  const tiltElements = [...document.querySelectorAll('[data-tilt]')];
  const revealElements = [...document.querySelectorAll('.reveal')];
  const preferenceKey = 'bhoomika-motion';

  let requestedMotion = true;
  try { requestedMotion = localStorage.getItem(preferenceKey) !== 'off'; } catch {}

  let enabled = false;
  let pointerEnabled = false;
  let frame = 0;
  let progressFrame = 0;
  let lastTime = 0;
  let lastMove = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let revealObserver;
  const pointer = { x: width / 2, y: height / 2, present: false, scale: 1 };
  const blob = { x: pointer.x, y: pointer.y, vx: 0, vy: 0, alpha: 0, scale: 1 };
  const tail = Array.from({ length: 4 }, () => ({ x: pointer.x, y: pointer.y }));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function resetTransforms() {
    magneticElements.forEach(element => {
      element.style.setProperty('--magnet-x', '0px');
      element.style.setProperty('--magnet-y', '0px');
    });
    tiltElements.forEach(element => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    });
    heroArt?.style.setProperty('--parallax-x', '0px');
    heroArt?.style.setProperty('--parallax-y', '0px');
  }

  function clearCursor() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    blob.alpha = 0;
    pointer.present = false;
    context?.clearRect(0, 0, width, height);
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (context) {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
    }
    updateProgress();
    wakeCursor();
  }

  function prepareReveals() {
    revealObserver?.disconnect();
    if (!enabled || !('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('is-visible'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    revealElements.forEach(element => {
      element.classList.add('is-prepared');
      if (!element.classList.contains('is-visible')) revealObserver.observe(element);
    });
  }

  function syncMotion() {
    enabled = requestedMotion && !reducedMotion.matches;
    pointerEnabled = enabled && finePointer.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    if (canvas) canvas.hidden = !pointerEnabled;
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(enabled));
      motionButton.setAttribute('aria-label', reducedMotion.matches
        ? 'Motion disabled by your system preference'
        : `Turn ${enabled ? 'off' : 'on'} motion effects`);
      motionButton.disabled = reducedMotion.matches;
      motionButton.title = reducedMotion.matches ? 'Your device requests reduced motion' : '';
    }
    if (motionLabel) motionLabel.textContent = enabled ? 'Motion on' : 'Motion off';
    if (!pointerEnabled) {
      clearCursor();
      resetTransforms();
    }
    prepareReveals();
  }

  motionButton?.addEventListener('click', () => {
    requestedMotion = !enabled;
    try { localStorage.setItem(preferenceKey, requestedMotion ? 'on' : 'off'); } catch {}
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  finePointer.addEventListener('change', syncMotion);

  function updateProgress() {
    progressFrame = 0;
    if (!progress) return;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? clamp(window.scrollY / distance, 0, 1) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  }

  window.addEventListener('scroll', () => {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });

  // Catmull–Rom tangents give the white shape a continuous, liquid edge.
  function drawBlob(x, y, radius, velocityX, velocityY, time) {
    if (!context || radius < 0.15) return;
    const speed = Math.hypot(velocityX, velocityY);
    const direction = speed > 0.02 ? Math.atan2(velocityY, velocityX) : 0;
    const stretch = clamp(speed / 42, 0, 0.72);
    const cos = Math.cos(direction);
    const sin = Math.sin(direction);
    const points = [];
    const count = 12;
    for (let index = 0; index < count; index += 1) {
      const angle = index / count * Math.PI * 2;
      const ripple = 1 + Math.sin(angle * 3 + time * 0.0028) * 0.045
        + Math.cos(angle * 2 - time * 0.0019) * 0.028;
      const px = Math.cos(angle) * radius * ripple * (1 + stretch);
      const py = Math.sin(angle) * radius * ripple * (1 - stretch * 0.28);
      points.push({ x: x + px * cos - py * sin, y: y + px * sin + py * cos });
    }
    context.moveTo(points[0].x, points[0].y);
    for (let index = 0; index < count; index += 1) {
      const previous = points[(index - 1 + count) % count];
      const current = points[index];
      const next = points[(index + 1) % count];
      const following = points[(index + 2) % count];
      context.bezierCurveTo(
        current.x + (next.x - previous.x) / 6,
        current.y + (next.y - previous.y) / 6,
        next.x - (following.x - current.x) / 6,
        next.y - (following.y - current.y) / 6,
        next.x, next.y
      );
    }
    context.closePath();
  }

  function renderCursor(time) {
    frame = 0;
    if (!pointerEnabled || document.hidden || !context) return;
    const delta = lastTime ? clamp((time - lastTime) / 16.67, 0.25, 3) : 1;
    lastTime = time;
    const follow = 1 - Math.pow(0.64, delta);
    const oldX = blob.x;
    const oldY = blob.y;
    blob.x += (pointer.x - blob.x) * follow;
    blob.y += (pointer.y - blob.y) * follow;
    blob.vx += ((blob.x - oldX) / delta - blob.vx) * 0.28;
    blob.vy += ((blob.y - oldY) / delta - blob.vy) * 0.28;
    blob.alpha += ((pointer.present ? 1 : 0) - blob.alpha) * (1 - Math.pow(0.7, delta));
    blob.scale += (pointer.scale - blob.scale) * 0.16;

    let previous = blob;
    tail.forEach((drop, index) => {
      const ease = 1 - Math.pow(0.7 + index * 0.025, delta);
      drop.x += (previous.x - drop.x) * ease;
      drop.y += (previous.y - drop.y) * ease;
      previous = drop;
    });

    context.clearRect(0, 0, width, height);
    if (blob.alpha > 0.005) {
      context.globalAlpha = blob.alpha;
      context.fillStyle = '#ffffff';
      context.beginPath();
      const speed = Math.hypot(blob.vx, blob.vy);
      const trailAmount = clamp(speed / 7, 0, 1);
      tail.forEach((drop, index) => {
        drawBlob(drop.x, drop.y, (12 - index * 2.5) * trailAmount,
          blob.vx * 0.5, blob.vy * 0.5, time + index * 130);
      });
      drawBlob(blob.x, blob.y, 22 * blob.scale, blob.vx, blob.vy, time);
      context.fill();
      context.globalAlpha = 1;
    }

    const distance = Math.hypot(pointer.x - blob.x, pointer.y - blob.y);
    const unsettled = distance > 0.1 || Math.hypot(blob.vx, blob.vy) > 0.06
      || Math.abs((pointer.present ? 1 : 0) - blob.alpha) > 0.005
      || Math.abs(pointer.scale - blob.scale) > 0.005;
    if (unsettled || (pointer.present && time - lastMove < 500)) {
      frame = requestAnimationFrame(renderCursor);
    } else {
      lastTime = 0;
      if (!pointer.present) context.clearRect(0, 0, width, height);
    }
  }

  function wakeCursor() {
    if (!frame && pointerEnabled && !document.hidden && context) {
      frame = requestAnimationFrame(renderCursor);
    }
  }

  window.addEventListener('pointermove', event => {
    if (!pointerEnabled || event.pointerType === 'touch') return;
    if (!pointer.present) {
      blob.x = event.clientX;
      blob.y = event.clientY;
      blob.vx = 0;
      blob.vy = 0;
      tail.forEach(drop => { drop.x = event.clientX; drop.y = event.clientY; });
    }
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.present = true;
    lastMove = performance.now();
    if (heroArt && heroArt.getBoundingClientRect().bottom > 0) {
      heroArt.style.setProperty('--parallax-x', `${((event.clientX / width - 0.5) * 24).toFixed(2)}px`);
      heroArt.style.setProperty('--parallax-y', `${((event.clientY / height - 0.5) * 18).toFixed(2)}px`);
    }
    wakeCursor();
  }, { passive: true });

  document.addEventListener('pointerover', event => {
    if (!pointerEnabled || !(event.target instanceof Element)) return;
    pointer.scale = event.target.closest('a, button, [role="tab"], [data-magnetic]') ? 1.4 : 1;
    wakeCursor();
  }, { passive: true });

  document.addEventListener('pointerout', event => {
    if (event.relatedTarget === null) {
      pointer.present = false;
      resetTransforms();
      wakeCursor();
    }
  }, { passive: true });

  window.addEventListener('blur', () => {
    clearCursor();
    resetTransforms();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearCursor();
      resetTransforms();
    }
  });

  magneticElements.forEach(element => {
    element.addEventListener('pointermove', event => {
      if (!pointerEnabled || event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      element.style.setProperty('--magnet-x', `${clamp((event.clientX - box.left - box.width / 2) * 0.1, -7, 7).toFixed(2)}px`);
      element.style.setProperty('--magnet-y', `${clamp((event.clientY - box.top - box.height / 2) * 0.13, -5, 5).toFixed(2)}px`);
    }, { passive: true });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--magnet-x', '0px');
      element.style.setProperty('--magnet-y', '0px');
    });
  });

  tiltElements.forEach(element => {
    element.addEventListener('pointermove', event => {
      if (!pointerEnabled || event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      const x = clamp((event.clientX - box.left) / box.width - 0.5, -0.5, 0.5);
      const y = clamp((event.clientY - box.top) / box.height - 0.5, -0.5, 0.5);
      element.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
      element.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`);
    }, { passive: true });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    });
  });

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('load', updateProgress, { once: true });
  syncMotion();
  resizeCanvas();
})();
