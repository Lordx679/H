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
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>
      
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