import React, { useState } from 'react';
import { Trash2, Edit, Eye, Search, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ManageFiles: React.FC = () => {
  const { files, setFiles, isAdmin } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-6xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold text-white mb-2">غير مصرح</h3>
        <p className="text-gray-400">هذه الصفحة متاحة للمدير فقط</p>
      </div>
    );
  }

  const categories = ['الكل', 'تصميم', 'أدوات النظام', 'برمجة', 'وسائط', 'ألعاب', 'مكتبية'];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'الكل' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة الملفات</h1>
          <p className="text-gray-400 mt-1">
            إدارة وتعديل الملفات المرفوعة ({filteredFiles.length} ملف)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'الكل' ? '' : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (selectedCategory === category) || (selectedCategory === '' && category === 'الكل')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Files Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750 border-b border-gray-700">
              <tr>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">الملف</th>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">الفئة</th>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">التحميلات</th>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">التقييم</th>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">الحجم</th>
                <th className="text-right rtl:text-left px-6 py-4 text-sm font-medium text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img
                        src={file.image}
                        alt={file.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{file.name}</div>
                        <div className="text-sm text-gray-400">{file.shortDescription}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300 border border-blue-700">
                      {file.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {formatNumber(file.downloadCount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    ⭐ {file.rating}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {file.fileSize}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => window.open(`/file/${file.id}`, '_blank')}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        title="عرض الملف"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                        title="تعديل الملف"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="حذف الملف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد ملفات</h3>
            <p className="text-gray-400">لم يتم العثور على ملفات تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFiles;