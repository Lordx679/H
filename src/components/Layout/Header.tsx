import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, FolderOpen, Shield, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const Header: React.FC = () => {
  const { 
    user, 
    setUser, 
    language, 
    setLanguage, 
    searchTerm, 
    setSearchTerm, 
    isAuthenticated, 
    isAdmin,
    clickCount,
    setClickCount,
    showAdminLogin,
    setShowAdminLogin
  } = useApp();
  
  const [adminPassword, setAdminPassword] = useState('');

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setShowAdminLogin(true);
      setClickCount(0);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setUser({
        id: '1',
        username: 'المدير',
        email: 'admin@filelib.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: true
      });
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleGoogleAuth = () => {
    // Mock Google authentication
    window.open('https://accounts.google.com/oauth/authorize?client_id=demo&redirect_uri=' + encodeURIComponent(window.location.origin), '_blank');
  };

  return (
    <>
      <header className={`bg-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 rtl:space-x-reverse hover:opacity-80 transition-opacity"
            >
              <FolderOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">مكتبة الملفات</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder', language)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-300 hover:text-blue-400 transition-colors"
                title="تغيير اللغة"
              >
                <Globe className="h-5 w-5" />
              </button>

              <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('home', language)}
                </Link>
                <Link to="/files" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('files', language)}
                </Link>
              </nav>

              {/* Google Auth Button */}
              {!isAuthenticated && (
                <button
                  onClick={handleGoogleAuth}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
              )}

              {/* Admin Menu */}
              {isAuthenticated && isAdmin && (
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
                    <span className="text-sm font-medium text-white">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                    title={t('logout', language)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">تسجيل دخول المدير</h3>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  دخول
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;