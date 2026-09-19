import { useEffect, useRef, useState } from 'react';
import matrix from 'cmatrix/dist/matrix.mjs';

const FONT_SIZE_BREAKPOINTS = [
  { max: 639, size: 10 }, // base / small
  { max: 767, size: 12 }, // sm
  { max: 1023, size: 16 }, // md
  { max: 1279, size: 18 }, // lg
  { max: 1535, size: 20 }, // xl
];

export function responsiveFontSize(width) {
  if (width >= 1536) return 20;
  return FONT_SIZE_BREAKPOINTS.find((b) => width <= b.max)?.size ?? 16;
}

export default function CMatrix({ className = '', chars, font, font_size, color = '#0F0' }) {
  const canvasRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const size = font_size ?? responsiveFontSize(viewportWidth);

  useEffect(() => {
    const canvas = canvasRef.current;
    const inst = {
      chars,
      font,
      font_size: size,
      color,
      exit: false,
    };
    matrix(canvas, inst);

    return () => {
      if (canvas._matrix) {
        canvas._matrix.stop();
        canvas._matrix.clear();
      }
    };
  }, [chars, font, size, color]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
