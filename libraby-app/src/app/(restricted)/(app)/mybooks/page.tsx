'use client';

import { useState } from 'react';
import { Layout } from '../../../../shared/components/Layout';
import { MyBooksView } from './components/MyBooksView';

export default function MyBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <MyBooksView />
    </Layout>
  );
}