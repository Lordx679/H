import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, BarChart3, Upload, Settings, Shield, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const Sidebar: React.FC = () => {
  const { language, isAuthenticated, isAdmin } = useApp();
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: t('home', language), path: '/' },
    { icon: FolderOpen, label: t('files', language), path: '/files' },
    ...(isAuthenticated && isAdmin ? [
      { icon: Upload, label: t('upload', language), path: '/upload' },
      { icon: BarChart3, label: t('analytics', language), path: '/analytics' },
      { icon: Trash2, label: 'إدارة الملفات', path: '/manage' },
      { icon: Settings, label: t('settings', language), path: '/settings' }
    ] : [])
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-dark-800/80 backdrop-blur-xl border-r border-dark-700/50 ${language === 'ar' ? 'rtl' : 'ltr'} animate-slide-right`}>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'text-secondary-300 hover:bg-dark-700/50 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-xl"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Badge */}
        {isAdmin && (
          <div className="p-4 mt-auto animate-slide-up">
            <div className="bg-gradient-to-r from-primary-900/50 to-accent-900/50 border border-primary-700/50 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-300">وضع المدير</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;