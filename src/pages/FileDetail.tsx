import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Download, HardDrive, Calendar, ArrowLeft, 
  MessageSquare, Share2, Heart, Eye, User
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const FileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { files } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  const file = files.find(f => f.id === id);

  if (!file) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-white mb-2">الملف غير موجود</h3>
        <Link to="/files" className="text-blue-400 hover:text-blue-300">
          العودة للملفات
        </Link>
      </div>
    );
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

  const mockReviews = [
    {
      id: '1',
      user: { username: 'أحمد محمد', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
      rating: 5,
      comment: 'برنامج ممتاز وسهل الاستخدام، أنصح به بشدة!',
      date: '2024-01-20'
    },
    {
      id: '2',
      user: { username: 'فاطمة علي', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
      rating: 4,
      comment: 'جيد جداً، لكن يحتاج لبعض التحسينات في الواجهة.',
      date: '2024-01-18'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/files"
        className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>رجوع</span>
      </Link>

      {/* File Header */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 rtl:space-x-reverse mb-6 md:mb-0">
              <img
                src={file.image}
                alt={file.name}
                className="h-24 w-24 rounded-xl object-cover border-4 border-white/20"
              />
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{file.name}</h1>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-white/60">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Calendar className="h-4 w-4" />
                    <span>تم الرفع {new Date(file.createdAt).toLocaleDateString('ar-SA')}</span>
                  </span>
                  <span>الإصدار {file.version}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <a
                href={file.downloadUrl}
                className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>تحميل الملف</span>
              </a>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex items-center justify-center space-x-1 rtl:space-x-reverse bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                  <span>إعجاب</span>
                </button>
                <button className="flex items-center justify-center space-x-1 rtl:space-x-reverse bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                  <span>مشاركة</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 bg-gray-750 border-b border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-400 mb-1">
                <Download className="h-4 w-4" />
                <span className="text-sm">التحميلات</span>
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(file.downloadCount)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-400 mb-1">
                <HardDrive className="h-4 w-4" />
                <span className="text-sm">الحجم</span>
              </div>
              <div className="text-2xl font-bold text-white">{file.fileSize}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-400 mb-1">
                <Star className="h-4 w-4" />
                <span className="text-sm">التقييم</span>
              </div>
              <div className="text-2xl font-bold text-white">{file.rating}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-400 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">المراجعات</span>
              </div>
              <div className="text-2xl font-bold text-white">{file.reviewCount}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8 rtl:space-x-reverse">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: Eye },
              { id: 'reviews', label: 'المراجعات', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
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
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">الوصف</h3>
              <p className="text-gray-300 leading-relaxed">{file.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">معلومات الملف</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الفئة:</span>
                    <span className="text-gray-300">{file.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الإصدار:</span>
                    <span className="text-gray-300">{file.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الحجم:</span>
                    <span className="text-gray-300">{file.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">آخر تحديث:</span>
                    <span className="text-gray-300">{new Date(file.updatedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-white">العلامات</h4>
                <div className="flex flex-wrap gap-2">
                  {file.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded-full border border-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">مراجعات المستخدمين</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= file.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {file.rating} من 5 ({file.reviewCount} مراجعة)
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <img
                      src={review.user.avatar}
                      alt={review.user.username}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <span className="font-semibold text-white">{review.user.username}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
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

export default FileDetail;