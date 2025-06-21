import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useApp } from '../../contexts/AppContext';

const Layout: React.FC = () => {
  const { language } = useApp();

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:mr-64 rtl:lg:mr-0 rtl:lg:ml-64">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;