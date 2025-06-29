import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Login: React.FC = () => {
  const { setUser } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      setUser({
        id: '1',
        username: 'المستخدم',
        email: formData.email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: false
      });
    } catch (err) {
      setError('فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsGithubLoading(true);
    setError('');

    try {
      // Simulate GitHub OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUser({
        id: '2',
        username: 'GitHub User',
        email: 'user@github.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: false
      });
    } catch (err) {
      setError('فشل في تسجيل الدخول عبر GitHub.');
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 flex items-center justify-center p-4 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-dark-800/80 backdrop-blur-xl border border-dark-700/50 rounded-2xl shadow-2xl p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mb-4 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك</h1>
            <p className="text-secondary-400">سجل دخولك للوصول إلى مكتبة الملفات</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-900/20 border border-error-700/50 rounded-lg animate-slide-down">
              <p className="text-error-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* GitHub Login Button */}
          <button
            onClick={handleGithubLogin}
            disabled={isGithubLoading || isLoading}
            className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse bg-github-900 hover:bg-github-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6 group"
          >
            {isGithubLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            )}
            <span>{isGithubLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول عبر GitHub'}</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-800 text-secondary-400">أو</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-300">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500"
                  placeholder="أدخل بريدك الإلكتروني"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-secondary-300">
                كلمة المرور
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500 pr-12 rtl:pr-4 rtl:pl-12"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 bg-dark-700 border-dark-600 rounded focus:ring-primary-500 focus:ring-2 transition-colors duration-200"
                />
                <span className="mr-2 rtl:mr-0 rtl:ml-2 text-sm text-secondary-300">تذكرني</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGithubLoading}
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              )}
              <span>{isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-secondary-400">
              ليس لديك حساب؟{' '}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-secondary-500 text-sm">
            بتسجيل الدخول، أنت توافق على{' '}
            <Link to="/terms" className="text-primary-400 hover:text-primary-300 transition-colors duration-200">
              شروط الخدمة
            </Link>{' '}
            و{' '}
            <Link to="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors duration-200">
              سياسة الخصوصية
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;