'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { ProfileView } from './components/ProfileView';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAuth().user;
    
  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <ProfileView user={user} />
    </Layout>
  );
}