'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { ProfileView } from './components/ProfileView';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <ProfileView />
    </Layout>
  );
}