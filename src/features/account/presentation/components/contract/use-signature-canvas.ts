'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';

type SignatureEvent = ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>;

/**
 * Encapsulates all signature-canvas logic: high-DPI aware sizing via
 * ResizeObserver, mouse/touch drawing, and `hasSignature` state.
 */
export function useSignatureCanvas(mounted: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const configureCtx = (dpr: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2 * dpr;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const physicalWidth = Math.floor(rect.width * dpr);
      const physicalHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
        canvas.width = physicalWidth;
        canvas.height = physicalHeight;

        configureCtx(dpr);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, physicalWidth, physicalHeight);
        setHasSignature(false);
      } else {
        configureCtx(dpr);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateCanvasSize);
    });

    resizeObserver.observe(canvas);
    updateCanvasSize();

    return () => resizeObserver.disconnect();
  }, [mounted]);

  const getCoordinates = useCallback((event: SignatureEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ('touches' in event) {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) return { x: 0, y: 0 };
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const cssX = clientX - rect.left;
    const cssY = clientY - rect.top;

    return {
      x: (cssX * canvas.width) / rect.width,
      y: (cssY * canvas.height) / rect.height,
    };
  }, []);

  const startDrawing = useCallback(
    (event: SignatureEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setIsDrawing(true);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const { x, y } = getCoordinates(event);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [getCoordinates],
  );

  const draw = useCallback(
    (event: SignatureEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(event);
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasSignature(true);

      if ('touches' in event && event.cancelable) {
        event.preventDefault();
      }
    },
    [isDrawing, getCoordinates],
  );

  const stopDrawing = useCallback(() => setIsDrawing(false), []);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setHasSignature(false);
  }, []);

  return {
    canvasRef,
    hasSignature,
    startDrawing,
    draw,
    stopDrawing,
    clearSignature,
  };
}
