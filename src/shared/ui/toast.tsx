'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const TOAST_DURATION_MS = 3000;

export type ToastVariant = 'success' | 'error';

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

interface Toast {
  message: string;
  variant: ToastVariant;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let queuedToast: Toast | null = null;

export function queueToast(message: string, variant: ToastVariant = 'success') {
  queuedToast = { message, variant };
}

export function consumeQueuedToast(): Toast | null {
  const toast = queuedToast;
  queuedToast = null;
  return toast;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, variant });
    timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current ?? undefined), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          role={toast.variant === 'error' ? 'alert' : 'status'}
          className="pointer-events-none fixed inset-x-0 bottom-[calc(80px+env(safe-area-inset-bottom))] z-[300] mx-auto w-full max-w-md px-4"
        >
          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
              toast.variant === 'error' ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
