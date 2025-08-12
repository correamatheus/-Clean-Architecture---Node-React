export const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className }) => (
  <div className={`bg-white shadow-sm rounded-md p-4 ${className ?? ''}`}>{children}</div>
);
