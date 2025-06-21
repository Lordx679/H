export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    files: 'الملفات',
    dashboard: 'لوحة التحكم',
    upload: 'رفع ملف',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    
    // Home page
    welcomeTitle: 'مكتبة الملفات الشاملة',
    welcomeSubtitle: 'اكتشف وحمل أفضل البرامج والأدوات المفيدة',
    searchPlaceholder: 'البحث عن الملفات...',
    featuredFiles: 'الملفات المميزة',
    popularFiles: 'الملفات الشائعة',
    categories: 'الفئات',
    
    // File categories
    all: 'الكل',
    design: 'تصميم',
    system: 'أدوات النظام',
    programming: 'برمجة',
    media: 'وسائط',
    games: 'ألعاب',
    office: 'مكتبية',
    
    // File details
    downloads: 'التحميلات',
    rating: 'التقييم',
    version: 'الإصدار',
    size: 'الحجم',
    downloadFile: 'تحميل الملف',
    description: 'الوصف',
    details: 'التفاصيل',
    reviews: 'المراجعات',
    
    // Dashboard
    myFiles: 'ملفاتي',
    fileManagement: 'إدارة الملفات',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    
    // Upload
    uploadTitle: 'رفع ملف جديد',
    fileName: 'اسم الملف',
    fileDescription: 'وصف الملف',
    category: 'الفئة',
    tags: 'العلامات',
    submit: 'رفع الملف',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    back: 'رجوع'
  },
  en: {
    // Navigation
    home: 'Home',
    files: 'Files',
    dashboard: 'Dashboard',
    upload: 'Upload File',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    
    // Home page
    welcomeTitle: 'Comprehensive File Library',
    welcomeSubtitle: 'Discover and download the best programs and useful tools',
    searchPlaceholder: 'Search for files...',
    featuredFiles: 'Featured Files',
    popularFiles: 'Popular Files',
    categories: 'Categories',
    
    // File categories
    all: 'All',
    design: 'Design',
    system: 'System Tools',
    programming: 'Programming',
    media: 'Media',
    games: 'Games',
    office: 'Office',
    
    // File details
    downloads: 'Downloads',
    rating: 'Rating',
    version: 'Version',
    size: 'Size',
    downloadFile: 'Download File',
    description: 'Description',
    details: 'Details',
    reviews: 'Reviews',
    
    // Dashboard
    myFiles: 'My Files',
    fileManagement: 'File Management',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Upload
    uploadTitle: 'Upload New File',
    fileName: 'File Name',
    fileDescription: 'File Description',
    category: 'Category',
    tags: 'Tags',
    submit: 'Upload File',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    back: 'Back'
  }
};

export const t = (key: string, language: 'en' | 'ar') => {
  return translations[language][key as keyof typeof translations.en] || key;
};