'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { CollectionView } from './components/CollectionView';

export default function Collection() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <CollectionView />
    </Layout>
  );
}