import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

interface FileItem {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  reviewCount: number;
  version: string;
  fileSize: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clickCount: number;
  setClickCount: (count: number) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  stats: {
    totalFiles: number;
    totalDownloads: number;
    totalUsers: number;
    dailyGrowth: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data for demonstration with real-looking stats
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'برنامج تحرير الصور المتقدم',
    description: 'برنامج قوي لتحرير الصور مع أدوات احترافية للتصميم والتعديل. يدعم جميع صيغ الصور الشائعة ويحتوي على فلاتر وتأثيرات متنوعة.',
    shortDescription: 'برنامج تحرير صور احترافي مع أدوات متقدمة',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'تصميم',
    tags: ['تصميم', 'صور', 'فوتوشوب', 'تحرير'],
    downloadCount: 15420,
    rating: 4.8,
    reviewCount: 1523,
    version: '2.1.0',
    fileSize: '125 MB',
    downloadUrl: '#',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'مدير الملفات الذكي',
    description: 'أداة قوية لإدارة وتنظيم الملفات على جهازك. يتضمن ميزات البحث المتقدم، النسخ الاحتياطي التلقائي، وتنظيف النظام.',
    shortDescription: 'أداة شاملة لإدارة وتنظيم الملفات',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'أدوات النظام',
    tags: ['إدارة', 'ملفات', 'تنظيم', 'نظام'],
    downloadCount: 8932,
    rating: 4.6,
    reviewCount: 892,
    version: '1.8.3',
    fileSize: '45 MB',
    downloadUrl: '#',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'محرر النصوص المطور',
    description: 'محرر نصوص متقدم يدعم البرمجة والكتابة الاحترافية. يحتوي على إبراز الأكواد، الإكمال التلقائي، ودعم اللغات المتعددة.',
    shortDescription: 'محرر نصوص احترافي للبرمجة والكتابة',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'برمجة',
    tags: ['برمجة', 'نصوص', 'كود', 'محرر'],
    downloadCount: 12451,
    rating: 4.7,
    reviewCount: 1205,
    version: '3.0.1',
    fileSize: '89 MB',
    downloadUrl: '#',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'مشغل الوسائط الشامل',
    description: 'مشغل وسائط قوي يدعم جميع صيغ الفيديو والصوت. واجهة بسيطة وأداء عالي مع دعم الترجمات والقوائم التشغيل.',
    shortDescription: 'مشغل وسائط متعدد الصيغ',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'وسائط',
    tags: ['فيديو', 'صوت', 'مشغل', 'وسائط'],
    downloadCount: 23156,
    rating: 4.9,
    reviewCount: 2341,
    version: '4.2.1',
    fileSize: '67 MB',
    downloadUrl: '#',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'أداة ضغط الملفات المتقدمة',
    description: 'برنامج ضغط ملفات قوي يدعم جميع صيغ الضغط الشائعة مع إمكانيات تشفير متقدمة.',
    shortDescription: 'أداة ضغط ملفات احترافية',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'أدوات النظام',
    tags: ['ضغط', 'أرشيف', 'تشفير'],
    downloadCount: 7834,
    rating: 4.5,
    reviewCount: 678,
    version: '2.3.1',
    fileSize: '32 MB',
    downloadUrl: '#',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-19'
  },
  {
    id: '6',
    name: 'محول صيغ الفيديو',
    description: 'محول فيديو سريع وموثوق يدعم أكثر من 200 صيغة مختلفة مع جودة عالية.',
    shortDescription: 'محول فيديو متعدد الصيغ',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'وسائط',
    tags: ['فيديو', 'تحويل', 'صيغ'],
    downloadCount: 18765,
    rating: 4.7,
    reviewCount: 1456,
    version: '1.9.2',
    fileSize: '78 MB',
    downloadUrl: '#',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-21'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const isAuthenticated = user !== null;
  const isAdmin = user?.isAdmin || false;

  // Calculate real stats from files
  const stats = {
    totalFiles: files.length,
    totalDownloads: files.reduce((sum, file) => sum + file.downloadCount, 0),
    totalUsers: Math.floor(files.reduce((sum, file) => sum + file.downloadCount, 0) * 0.15), // Estimate users as 15% of downloads
    dailyGrowth: Math.floor(Math.random() * 50) + 100 // Random daily growth between 100-150
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      files,
      setFiles,
      language,
      setLanguage,
      isAuthenticated,
      isAdmin,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      clickCount,
      setClickCount,
      showAdminLogin,
      setShowAdminLogin,
      stats
    }}>
      {children}
    </AppContext.Provider>
  );
};