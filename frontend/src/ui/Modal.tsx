import React from 'react';
import ReactDOM from 'react-dom';

export const Modal: React.FC<{ open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }> = ({
  open, onClose, title, children
}) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-md p-6 z-10 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600">Fechar</button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};
