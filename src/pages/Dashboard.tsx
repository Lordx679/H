import React, { useState } from 'react';
import { Plus, BarChart3, Settings, Trash2, Edit, Eye, TrendingUp, Users, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const Dashboard: React.FC = () => {
  const { language, user, bots } = useApp();
  const [activeTab, setActiveTab] = useState<'bots' | 'analytics' | 'settings'>('bots');

  // Mock user bots - in real app, this would filter by user
  const userBots = bots.slice(0, 2);

  const stats = [
    { label: 'Total Bots', value: userBots.length, icon: Plus, color: 'text-blue-600' },
    { label: 'Total Servers', value: userBots.reduce((sum, bot) => sum + bot.guildCount, 0), icon: Server, color: 'text-green-600' },
    { label: 'Total Users', value: userBots.reduce((sum, bot) => sum + bot.userCount, 0), icon: Users, color: 'text-purple-600' },
    { label: 'Avg Rating', value: (userBots.reduce((sum, bot) => sum + bot.rating, 0) / userBots.length).toFixed(1), icon: TrendingUp, color: 'text-orange-600' }
  ];

  const tabs = [
    { id: 'bots', label: 'My Bots', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard', language)}</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.username}! Manage your bots and view analytics.
          </p>
        </div>
        <Link
          to="/upload"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-discord-blurple hover:bg-discord-blurple-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>{t('upload', language)}</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 border-b border-gray-200">
          <nav className="flex space-x-8 rtl:space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-discord-blurple text-discord-blurple'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'bots' && (
            <div className="space-y-6">
              {userBots.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bots yet</h3>
                  <p className="text-gray-600 mb-4">Upload your first bot to get started</p>
                  <Link
                    to="/upload"
                    className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-discord-blurple hover:bg-discord-blurple-dark text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Upload Bot</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBots.map((bot) => (
                    <div key={bot.id} className="border border-gray-200 rounded-lg p-4 hover:border-discord-blurple/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <img
                            src={bot.avatar}
                            alt={bot.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                            <p className="text-sm text-gray-600">{bot.category}</p>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-1 text-xs text-gray-500">
                              <span>{bot.guildCount} servers</span>
                              <span>{bot.userCount} users</span>
                              <span>⭐ {bot.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Link
                            to={`/bot/${bot.id}`}
                            className="p-2 text-gray-600 hover:text-discord-blurple transition-colors"
                            title="View bot"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Edit bot"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete bot"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">Detailed analytics and insights coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-discord-blurple focus:ring-discord-blurple" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Email notifications for bot reviews</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-discord-blurple focus:ring-discord-blurple" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Weekly analytics reports</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-discord-blurple focus:ring-discord-blurple" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Security alerts</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;