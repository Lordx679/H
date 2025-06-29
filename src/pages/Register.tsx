import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Eye, EyeOff, ArrowRight, Loader2, User, Mail, Lock, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Register: React.FC = () => {
  const { setUser } = useApp();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    if (error) setError('');
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-error-500';
    if (passwordStrength <= 3) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'ضعيفة';
    if (passwordStrength <= 3) return 'متوسطة';
    return 'قوية';
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('اسم المستخدم مطلوب');
      return false;
    }
    if (!formData.email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return false;
    }
    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      setUser({
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: false
      });
    } catch (err) {
      setError('فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setIsGithubLoading(true);
    setError('');

    try {
      // Simulate GitHub OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUser({
        id: Date.now().toString(),
        username: 'GitHub User',
        email: 'user@github.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: false
      });
    } catch (err) {
      setError('فشل في التسجيل عبر GitHub.');
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 flex items-center justify-center p-4 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative w-full max-w-md">
        {/* Register Card */}
        <div className="bg-dark-800/80 backdrop-blur-xl border border-dark-700/50 rounded-2xl shadow-2xl p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-4 animate-bounce">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">إنشاء حساب جديد</h1>
            <p className="text-secondary-400">انضم إلى مكتبة الملفات واستمتع بالمحتوى المميز</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-900/20 border border-error-700/50 rounded-lg animate-slide-down">
              <p className="text-error-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* GitHub Register Button */}
          <button
            onClick={handleGithubRegister}
            disabled={isGithubLoading || isLoading}
            className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse bg-github-900 hover:bg-github-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6 group"
          >
            {isGithubLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            )}
            <span>{isGithubLoading ? 'جاري إنشاء الحساب...' : 'التسجيل عبر GitHub'}</span>
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-secondary-300">
                اسم المستخدم
              </label>
              <div className="relative group">
                <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500"
                  placeholder="أدخل اسم المستخدم"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-300">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500"
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
                <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-12 rtl:pr-4 rtl:pl-12 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-400">قوة كلمة المرور:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength <= 2 ? 'text-error-400' : 
                      passwordStrength <= 3 ? 'text-warning-400' : 'text-success-400'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-300">
                تأكيد كلمة المرور
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-12 rtl:pr-4 rtl:pl-12 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-dark-500"
                  placeholder="أعد إدخال كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <Check className="absolute right-10 rtl:right-auto rtl:left-10 top-1/2 transform -translate-y-1/2 text-success-400 h-5 w-5" />
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-1 text-primary-500 bg-dark-700 border-dark-600 rounded focus:ring-primary-500 focus:ring-2 transition-colors duration-200"
              />
              <label htmlFor="terms" className="text-sm text-secondary-300">
                أوافق على{' '}
                <Link to="/terms" className="text-primary-400 hover:text-primary-300 transition-colors duration-200">
                  شروط الخدمة
                </Link>{' '}
                و{' '}
                <Link to="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors duration-200">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGithubLoading}
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              )}
              <span>{isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-secondary-400">
              لديك حساب بالفعل؟{' '}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-secondary-500 text-sm">
            بإنشاء حساب، أنت توافق على جميع الشروط والأحكام
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;