import { useToast as _useToast } from '../ui/ToastProvider';
import { v4 as uuid } from 'uuid';

export const useToast = () => {
  const ctx = _useToast();
  return {
    success: (title: string, description?: string) => ctx.push({ id: uuid(), title, description, kind: 'success' }),
    error: (title: string, description?: string) => ctx.push({ id: uuid(), title, description, kind: 'error' }),
    info: (title: string, description?: string) => ctx.push({ id: uuid(), title, description, kind: 'info' })
  };
};
