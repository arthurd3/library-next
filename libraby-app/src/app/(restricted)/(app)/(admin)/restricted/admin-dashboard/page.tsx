'use client';

import { useState } from 'react';
import { Layout } from '../../../../../../shared/components/Layout';
import { AdminDashboardView } from './components/AdminDashboardView';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <AdminDashboardView />
    </Layout>
  );
}
