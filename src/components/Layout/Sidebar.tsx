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
    <aside className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-gray-800 border-r border-gray-700 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin Badge */}
        {isAdmin && (
          <div className="p-4 mt-auto">
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">وضع المدير</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;