import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Server, Shield, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface Bot {
  id: string;
  name: string;
  shortDescription: string;
  avatar: string;
  author: {
    username: string;
  };
  category: string;
  guildCount: number;
  userCount: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
}

interface BotCardProps {
  bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const { language } = useApp();

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
    <Link to={`/bot/${bot.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-discord-blurple/20 transition-all duration-300 group-hover:scale-105">
        {/* Header */}
        <div className="relative p-6 pb-4">
          {bot.featured && (
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Zap className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                Featured
              </span>
            </div>
          )}
          
          <div className="flex items-start space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <img
                src={bot.avatar}
                alt={bot.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              {bot.verified && (
                <div className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 bg-green-500 rounded-full p-1">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-discord-blurple transition-colors">
                {bot.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">by {bot.author.username}</p>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {bot.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {bot.shortDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Server className="h-4 w-4" />
                <span>{formatNumber(bot.guildCount)}</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Users className="h-4 w-4" />
                <span>{formatNumber(bot.userCount)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{bot.rating}</span>
              <span className="text-xs">({bot.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BotCard;