import React from 'react';
import Header from '@/components/layout/Header';

export default function CustomLessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
} 