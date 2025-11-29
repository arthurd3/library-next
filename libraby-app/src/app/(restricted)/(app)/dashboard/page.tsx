'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { DashboardView } from './components/DashboardView';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <DashboardView />
    </Layout>
  );
}