import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useApp } from '../../contexts/AppContext';

const Layout: React.FC = () => {
  const { language } = useApp();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 ${language === 'ar' ? 'rtl' : 'ltr'} animate-fade-in`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>
      
      <Header />
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1 lg:mr-64 rtl:lg:mr-0 rtl:lg:ml-64 relative">
          <div className="p-6 animate-slide-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;