import React, { useState, useMemo } from 'react';
import { Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import FileCard from '../components/FileCard';

const FileList: React.FC = () => {
  const { language, files, searchTerm, selectedCategory, setSelectedCategory } = useApp();
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'downloads' | 'created'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'الكل',
    'تصميم',
    'أدوات النظام',
    'برمجة',
    'وسائط',
    'ألعاب',
    'مكتبية'
  ];

  const filteredAndSortedFiles = useMemo(() => {
    let filtered = files;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'الكل') {
      filtered = filtered.filter(file => file.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount;
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [files, searchTerm, selectedCategory, sortBy, sortOrder]);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('files', language)}</h1>
          <p className="text-gray-400 mt-1">
            {filteredAndSortedFiles.length} ملف متاح
          </p>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

          {/* Sort Options */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">ترتيب حسب:</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {[
                { key: 'rating', label: 'التقييم' },
                { key: 'downloads', label: 'التحميلات' },
                { key: 'name', label: 'الاسم' },
                { key: 'created', label: 'التاريخ' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleSort(option.key as typeof sortBy)}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-lg text-sm transition-colors ${
                    sortBy === option.key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {sortBy === option.key && (
                    sortOrder === 'asc' ? 
                      <SortAsc className="h-3 w-3" /> : 
                      <SortDesc className="h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-white mb-2">لا توجد ملفات</h3>
          <p className="text-gray-400">جرب تعديل معايير البحث أو الفلترة</p>
        </div>
      )}
    </div>
  );
};

export default FileList;