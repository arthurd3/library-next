'use client';

import { useState } from 'react';
import { Layout } from '../../../../../../shared/components/Layout';
import { RegisterUserView } from './components/RegisterUserView';

export default function RegisterUser() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}>
      <RegisterUserView />
    </Layout>
  );
}
