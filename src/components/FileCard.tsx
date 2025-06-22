import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, HardDrive, Calendar, Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface FileItem {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  category: string;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  version: string;
  fileSize: string;
  createdAt: string;
}

interface FileCardProps {
  file: FileItem;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
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
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={file.image}
          alt={file.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
            {file.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {file.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {file.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Download className="h-4 w-4" />
              <span>{formatNumber(file.downloadCount)}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <HardDrive className="h-4 w-4" />
              <span>{file.fileSize}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-300">{file.rating}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Link
            to={`/file/${file.id}`}
            className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>عرض التفاصيل</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileCard;