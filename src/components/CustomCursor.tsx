import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const onHoverIn = () => {
      dot.style.background = '#a855f7';
      dot.style.transform += ' scale(1.5)';
      ring.style.borderColor = '#a855f7';
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(1.4)`;
    };

    const onHoverOut = () => {
      dot.style.background = '#00ffe7';
      ring.style.borderColor = '#00ffe7';
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    loop();

    const interactives = document.querySelectorAll('a, button, [data-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    // Re-bind on DOM changes
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-hover]');
      els.forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#00ffe7', zIndex: 9999,
          boxShadow: '0 0 12px #00ffe7, 0 0 24px #00ffe7',
          transition: 'background 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid #00ffe7', zIndex: 9998,
          transition: 'border-color 0.3s, transform 0.1s',
        }}
      />
    </>
  );
};

export default CustomCursor;
