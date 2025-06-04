import React from 'react';
import Header from '@/components/layout/Header';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <main className="flex-1 overflow-hidden">
        {/* The children will be the CommunityPage, which will have its own two-column layout */}
        {children}
      </main>
    </div>
  );
} 