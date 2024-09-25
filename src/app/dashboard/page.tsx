import Dashboard from '@/components/dashboard';
import Sidebar from '@/components/sidebar';
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptionts } from '../api/auth/[...nextauth]/route';

const Dashboardpage = async () => {
const session = await getServerSession(authOptionts);
if (session) {
  return (
    <div className='flex'>
      <Sidebar />
      <Dashboard />
    </div>
  );
} else {
  redirect("/login");
}
  
}

export default Dashboardpage;
