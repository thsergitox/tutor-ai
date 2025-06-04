import React from 'react';
import CommunitySidebar from '@/components/community/CommunitySidebar';
import CommunityFeed from '@/components/community/CommunityFeed';

export default function CommunityPage() {
  return (
    <div className="flex h-full bg-gray-100">
      <CommunitySidebar />
      <CommunityFeed />
    </div>
  );
}
