import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Download, Star, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import FileCard from '../components/FileCard';

const Home: React.FC = () => {
  const { language, files, stats } = useApp();

  const featuredFiles = files.slice(0, 3);
  const popularFiles = files.slice(0, 6);

  const categories = [
    { name: 'تصميم', icon: '🎨', count: files.filter(f => f.category === 'تصميم').length, color: 'bg-purple-900 text-purple-300 border-purple-700' },
    { name: 'أدوات النظام', icon: '⚙️', count: files.filter(f => f.category === 'أدوات النظام').length, color: 'bg-red-900 text-red-300 border-red-700' },
    { name: 'برمجة', icon: '💻', count: files.filter(f => f.category === 'برمجة').length, color: 'bg-green-900 text-green-300 border-green-700' },
    { name: 'وسائط', icon: '🎵', count: files.filter(f => f.category === 'وسائط').length, color: 'bg-blue-900 text-blue-300 border-blue-700' },
    { name: 'ألعاب', icon: '🎮', count: files.filter(f => f.category === 'ألعاب').length, color: 'bg-orange-900 text-orange-300 border-orange-700' },
    { name: 'مكتبية', icon: '📄', count: files.filter(f => f.category === 'مكتبية').length, color: 'bg-gray-700 text-gray-300 border-gray-600' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const statsData = [
    { label: 'إجمالي الملفات', value: stats.totalFiles.toString(), icon: FolderOpen, color: 'text-blue-400' },
    { label: 'التحميلات', value: formatNumber(stats.totalDownloads), icon: Download, color: 'text-green-400' },
    { label: 'المستخدمين', value: formatNumber(stats.totalUsers), icon: Users, color: 'text-purple-400' },
    { label: 'النمو اليومي', value: '+' + stats.dailyGrowth, icon: TrendingUp, color: 'text-orange-400' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('welcomeTitle', language)}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('welcomeSubtitle', language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/files"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              تصفح الملفات
              <ArrowLeft className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-xl text-center hover:bg-gray-750 transition-colors">
              <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{t('categories', language)}</h2>
          <Link to="/files" className="text-blue-400 hover:text-blue-300 font-medium">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/files?category=${category.name}`}
              className={`${category.color} border p-6 rounded-xl hover:opacity-80 transition-all duration-300 text-center group`}
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold group-hover:text-white transition-colors">
                {category.name}
              </h3>
              <p className="text-sm mt-1 opacity-75">{category.count} ملف</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Files */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{t('featuredFiles', language)}</h2>
          <Link to="/files" className="text-blue-400 hover:text-blue-300 font-medium">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>

      {/* Popular Files */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{t('popularFiles', language)}</h2>
          <Link to="/files" className="text-blue-400 hover:text-blue-300 font-medium">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;