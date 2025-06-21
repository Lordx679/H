import React, { useState, useMemo } from 'react';
import { Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import BotCard from '../components/BotCard';

const BotList: React.FC = () => {
  const { language, bots, searchTerm, selectedCategory, setSelectedCategory } = useApp();
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'users' | 'created'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    t('all', language),
    t('music', language),
    t('moderation', language),
    t('economy', language),
    t('fun', language),
    t('utility', language),
    t('gaming', language)
  ];

  const filteredAndSortedBots = useMemo(() => {
    let filtered = bots;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(bot =>
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== t('all', language)) {
      filtered = filtered.filter(bot => bot.category === selectedCategory);
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
        case 'users':
          comparison = a.userCount - b.userCount;
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [bots, searchTerm, selectedCategory, sortBy, sortOrder, language]);

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
          <h1 className="text-3xl font-bold text-gray-900">{t('bots', language)}</h1>
          <p className="text-gray-600 mt-1">
            {filteredAndSortedBots.length} {filteredAndSortedBots.length === 1 ? 'bot' : 'bots'} found
          </p>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === t('all', language) ? '' : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (selectedCategory === category) || (selectedCategory === '' && category === t('all', language))
                    ? 'bg-discord-blurple text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {[
                { key: 'rating', label: 'Rating' },
                { key: 'users', label: 'Users' },
                { key: 'name', label: 'Name' },
                { key: 'created', label: 'Date' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleSort(option.key as typeof sortBy)}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-lg text-sm transition-colors ${
                    sortBy === option.key
                      ? 'bg-discord-blurple text-white'
                      : 'text-gray-600 hover:bg-gray-100'
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

      {/* Bot Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedBots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedBots.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bots found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default BotList;