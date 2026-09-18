import { useEffect, useRef } from 'react';
import matrix from 'cmatrix/dist/matrix.mjs';

export default function CMatrix({ className = '', chars, font, font_size = 20, color = '#0F0' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const inst = {
      chars,
      font,
      font_size,
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
  }, [chars, font, font_size, color]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
