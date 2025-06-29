import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, FolderOpen, Shield, X, User, LogOut } from 'lucide-react';
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
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    setShowUserMenu(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <header className={`bg-dark-900/95 backdrop-blur-xl shadow-xl border-b border-dark-700/50 sticky top-0 z-50 transition-all duration-300 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 rtl:space-x-reverse hover:opacity-80 transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative">
                <FolderOpen className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                مكتبة الملفات
              </span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5 group-focus-within:text-primary-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder', language)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 bg-dark-800/50 border border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-secondary-500 hover:border-dark-500 hover:bg-dark-700/50"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="p-2 text-secondary-300 hover:text-primary-400 transition-all duration-300 hover:bg-dark-700/50 rounded-lg"
                title="تغيير اللغة"
              >
                <Globe className="h-5 w-5" />
              </button>

              <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                <Link 
                  to="/" 
                  className="text-secondary-300 hover:text-primary-400 transition-all duration-300 relative group"
                >
                  {t('home', language)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/files" 
                  className="text-secondary-300 hover:text-primary-400 transition-all duration-300 relative group"
                >
                  {t('files', language)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </nav>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-dark-700/50 rounded-xl transition-all duration-300 group"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="h-8 w-8 rounded-full border-2 border-primary-400/50 group-hover:border-primary-400 transition-colors duration-300"
                    />
                    <span className="text-sm font-medium text-white hidden sm:block">{user?.username}</span>
                    {isAdmin && (
                      <Shield className="h-4 w-4 text-primary-400" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-dark-800/95 backdrop-blur-xl border border-dark-700/50 rounded-xl shadow-xl py-2 animate-scale-in">
                      <div className="px-4 py-2 border-b border-dark-700/50">
                        <p className="text-sm font-medium text-white">{user?.username}</p>
                        <p className="text-xs text-secondary-400">{user?.email}</p>
                      </div>
                      
                      {isAdmin && (
                        <>
                          <Link
                            to="/upload"
                            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-secondary-300 hover:text-white hover:bg-dark-700/50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Shield className="h-4 w-4" />
                            <span>{t('upload', language)}</span>
                          </Link>
                          <Link
                            to="/manage"
                            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-secondary-300 hover:text-white hover:bg-dark-700/50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FolderOpen className="h-4 w-4" />
                            <span>إدارة الملفات</span>
                          </Link>
                        </>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 text-sm text-error-400 hover:text-error-300 hover:bg-error-900/20 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('logout', language)}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  <User className="h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-dark-800/95 backdrop-blur-xl border border-dark-700/50 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">تسجيل دخول المدير</h3>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="text-secondary-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-700/50 border border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 px-4 py-2 bg-dark-600 hover:bg-dark-500 text-white rounded-xl transition-colors duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl transition-all duration-300 hover:scale-105"
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