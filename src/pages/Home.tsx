import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Download, Star, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import FileCard from '../components/FileCard';

const Home: React.FC = () => {
  const { language, files } = useApp();

  const featuredFiles = files.slice(0, 3);
  const popularFiles = files.slice(0, 6);

  const categories = [
    { name: 'تصميم', icon: '🎨', count: 45, color: 'bg-purple-100 text-purple-800' },
    { name: 'أدوات النظام', icon: '⚙️', count: 32, color: 'bg-red-100 text-red-800' },
    { name: 'برمجة', icon: '💻', count: 28, color: 'bg-green-100 text-green-800' },
    { name: 'وسائط', icon: '🎵', count: 56, color: 'bg-blue-100 text-blue-800' },
    { name: 'ألعاب', icon: '🎮', count: 23, color: 'bg-orange-100 text-orange-800' },
    { name: 'مكتبية', icon: '📄', count: 19, color: 'bg-gray-100 text-gray-800' }
  ];

  const stats = [
    { label: 'إجمالي الملفات', value: '1,245', icon: FolderOpen, color: 'text-blue-600' },
    { label: 'التحميلات', value: '89K', icon: Download, color: 'text-green-600' },
    { label: 'المستخدمين', value: '12K', icon: Users, color: 'text-purple-600' },
    { label: 'النمو اليومي', value: '+156', icon: TrendingUp, color: 'text-orange-600' }
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
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('categories', language)}</h2>
          <Link to="/files" className="text-blue-600 hover:text-blue-700 font-medium">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/files?category=${category.name}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300 text-center group"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{category.count} ملف</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Files */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('featuredFiles', language)}</h2>
          <Link to="/files" className="text-blue-600 hover:text-blue-700 font-medium">
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
          <h2 className="text-3xl font-bold text-gray-900">{t('popularFiles', language)}</h2>
          <Link to="/files" className="text-blue-600 hover:text-blue-700 font-medium">
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