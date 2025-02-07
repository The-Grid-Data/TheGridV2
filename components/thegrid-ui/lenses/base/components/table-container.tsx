'use client';

interface TableContainerProps {
  children: React.ReactNode;
  title: string;
}

export function TableContainer({ children, title }: TableContainerProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
