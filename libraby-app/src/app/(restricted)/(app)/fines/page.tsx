'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { FinesView } from './components/FinesView';

export default function Fines() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <FinesView />
    </Layout>
  );
}