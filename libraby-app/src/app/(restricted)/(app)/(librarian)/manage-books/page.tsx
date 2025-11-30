'use client';

import { useState } from 'react';
import { Layout } from '../../../../../shared/components/Layout';
import { ManageBooksView } from './components/ManageBooksView';


export default function ManageBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <ManageBooksView />
    </Layout>
  );
}
