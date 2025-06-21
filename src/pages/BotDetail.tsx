import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Users, Server, Shield, ExternalLink, MessageSquare, 
  Copy, Download, Heart, Share2, ArrowLeft, Calendar,
  Command, Settings, BookOpen, BarChart3
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const BotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, bots } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'commands' | 'installation' | 'reviews'>('overview');
  const [copied, setCopied] = useState(false);

  const bot = bots.find(b => b.id === id);

  if (!bot) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Bot not found</h3>
        <Link to="/bots" className="text-discord-blurple hover:text-discord-blurple-dark">
          Go back to bots
        </Link>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockCommands = [
    { command: `${bot.prefix}help`, description: 'Show help menu with all available commands' },
    { command: `${bot.prefix}play <song>`, description: 'Play a song from YouTube or Spotify' },
    { command: `${bot.prefix}queue`, description: 'Show current music queue' },
    { command: `${bot.prefix}skip`, description: 'Skip to next song in queue' },
    { command: `${bot.prefix}volume <1-100>`, description: 'Set playback volume' }
  ];

  const mockReviews = [
    {
      id: '1',
      user: { username: 'MusicLover', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
      rating: 5,
      comment: 'Amazing bot! Works flawlessly and sounds great.',
      date: '2024-01-20'
    },
    {
      id: '2',
      user: { username: 'ServerOwner', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
      rating: 4,
      comment: 'Good bot overall, but could use more customization options.',
      date: '2024-01-18'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'commands', label: 'Commands', icon: Command },
    { id: 'installation', label: 'Installation', icon: Settings },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/bots"
        className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-discord-blurple transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t('back', language)}</span>
      </Link>

      {/* Bot Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-discord-blurple to-purple-600 p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 rtl:space-x-reverse mb-6 md:mb-0">
              <div className="relative">
                <img
                  src={bot.avatar}
                  alt={bot.name}
                  className="h-24 w-24 rounded-xl object-cover border-4 border-white/20"
                />
                {bot.verified && (
                  <div className="absolute -bottom-2 -right-2 rtl:-right-auto rtl:-left-2 bg-green-500 rounded-full p-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                  <h1 className="text-3xl font-bold">{bot.name}</h1>
                  {bot.featured && (
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-white/80 mb-2">by {bot.author.username}</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-white/60">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Calendar className="h-4 w-4" />
                    <span>Added {new Date(bot.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span>Version {bot.version}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <a
                href={bot.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-white text-discord-blurple px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>{t('inviteBot', language)}</span>
              </a>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex items-center justify-center space-x-1 rtl:space-x-reverse bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                  <span>Like</span>
                </button>
                <button className="flex items-center justify-center space-x-1 rtl:space-x-reverse bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 mb-1">
                <Server className="h-4 w-4" />
                <span className="text-sm">{t('servers', language)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(bot.guildCount)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">{t('users', language)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(bot.userCount)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 mb-1">
                <Star className="h-4 w-4" />
                <span className="text-sm">{t('rating', language)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{bot.rating}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{t('reviews', language)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{bot.reviewCount}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
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
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('description', language)}</h3>
              <p className="text-gray-600 leading-relaxed">{bot.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Bot Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{bot.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prefix:</span>
                    <span className="text-gray-900 font-mono">{bot.prefix}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="text-gray-900">{bot.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-900">{new Date(bot.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Links</h4>
                <div className="space-y-2">
                  <a
                    href={bot.supportServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 rtl:space-x-reverse text-discord-blurple hover:text-discord-blurple-dark transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Support Server</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Commands</h3>
            <div className="space-y-3">
              {mockCommands.map((cmd, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <code className="bg-gray-200 text-gray-900 px-2 py-1 rounded text-sm font-mono">
                      {cmd.command}
                    </code>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">{cmd.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(cmd.command)}
                    className="text-gray-400 hover:text-discord-blurple transition-colors"
                    title="Copy command"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'installation' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Guide</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 w-8 h-8 bg-discord-blurple text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Invite the Bot</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Click the "Invite Bot" button above to add {bot.name} to your Discord server.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 w-8 h-8 bg-discord-blurple text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Select Permissions</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Grant the necessary permissions for the bot to function properly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 w-8 h-8 bg-discord-blurple text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Start Using</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Use <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{bot.prefix}help</code> to see all available commands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Reviews</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= bot.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {bot.rating} out of 5 ({bot.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <img
                      src={review.user.avatar}
                      alt={review.user.username}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <span className="font-semibold text-gray-900">{review.user.username}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotDetail;