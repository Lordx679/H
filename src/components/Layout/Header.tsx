import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogIn, LogOut, Globe, FolderOpen, Shield } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const Header: React.FC = () => {
  const { user, setUser, language, setLanguage, searchTerm, setSearchTerm, isAuthenticated, isAdmin } = useApp();

  const handleLogin = () => {
    // Mock admin login
    setUser({
      id: '1',
      username: 'المدير',
      email: 'admin@filelib.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAdmin: true
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <FolderOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">مكتبة الملفات</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="تغيير اللغة"
            >
              <Globe className="h-5 w-5" />
            </button>

            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('home', language)}
              </Link>
              <Link to="/files" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('files', language)}
              </Link>
            </nav>

            {/* Admin Menu */}
            {isAuthenticated && isAdmin ? (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/upload"
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span>{t('upload', language)}</span>
                </Link>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title={t('logout', language)}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>{t('login', language)}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;