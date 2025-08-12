import React, { createContext, useContext, useState } from 'react';

type Toast = { id: string; title: string; description?: string; kind?: 'success' | 'error' | 'info' };
const ToastContext = createContext<{
  error(arg0: string, arg1: string): unknown;
  success(arg0: string, arg1: string): unknown; push: (t: Toast) => void 
}>({ push: () => {}, error: () => {}, success: () => {} });

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (t: Toast) => {
    setToasts((s) => [...s, t]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== t.id)), 4000);
  };
  const error = (title: string, description: string) => {
    push({ id: Math.random().toString(), title, description, kind: 'error' });
  };
  const success = (title: string, description: string) => {
    push({ id: Math.random().toString(), title, description, kind: 'success' });
  };
  return (
    <ToastContext.Provider value={{ push, error, success }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-2 rounded-md shadow ${t.kind === 'success' ? 'bg-green-500 text-white' : t.kind === 'error' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}>
            <div className="font-semibold">{t.title}</div>
            {t.description && <div className="text-sm">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
