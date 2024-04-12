'use client';
import Dashboard from '@/components/dashboard'
import Sidebar from '@/components/sidebar'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboardpage = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });
  return (
    <div className='flex '>
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default Dashboardpage