import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, FileText, Image } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const UploadFile: React.FC = () => {
  const { isAdmin, files, setFiles } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    category: 'تصميم',
    tags: '',
    version: '1.0.0'
  });
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'تصميم',
    'أدوات النظام',
    'برمجة',
    'وسائط',
    'ألعاب',
    'مكتبية'
  ];

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-900 border border-red-700 rounded-xl p-8">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-300 mb-2">غير مصرح</h2>
          <p className="text-red-400">
            عذراً، هذه الصفحة متاحة للمدير فقط. يرجى تسجيل الدخول كمدير للوصول إلى هذه الميزة.
          </p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add new file to the list
    const newFile = {
      id: (files.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      image: imagePreview || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      downloadCount: 0,
      rating: 5.0,
      reviewCount: 0,
      version: formData.version,
      fileSize: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
      downloadUrl: '#',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setFiles([...files, newFile]);
    setIsSubmitting(false);
    setSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: '',
        shortDescription: '',
        description: '',
        category: 'تصميم',
        tags: '',
        version: '1.0.0'
      });
      setFile(null);
      setImage(null);
      setImagePreview('');
    }, 3000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">تم رفع الملف بنجاح!</h2>
          <p className="text-gray-300 mb-6">
            تم رفع الملف وإضافته إلى المكتبة. سيكون متاحاً للمستخدمين فوراً.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• تم حفظ الملف في النظام</p>
            <p>• تم إنشاء صفحة التفاصيل</p>
            <p>• الملف متاح الآن للتحميل</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">رفع ملف جديد</h1>
        <p className="text-gray-400 mt-2">
          أضف ملفاً جديداً إلى المكتبة. املأ النموذج أدناه لبدء الرفع.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">المعلومات الأساسية</h2>
          
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الملف *
            </label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1">
                <label className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    {file ? (
                      <div>
                        <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-white">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">اضغط لرفع الملف</p>
                        <p className="text-xs text-gray-500">جميع أنواع الملفات مدعومة</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              صورة الملف *
            </label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="h-20 w-20 rounded-xl bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="معاينة الصورة" className="h-full w-full object-cover" />
                ) : (
                  <Image className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center space-x-2 rtl:space-x-reverse bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>رفع صورة</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG حتى 5MB</p>
              </div>
            </div>
          </div>

          {/* File Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              اسم الملف *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="أدخل اسم الملف"
            />
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              وصف مختصر *
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="وصف مختصر للملف (حد أقصى 100 حرف)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.shortDescription.length}/100 حرف
            </p>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الوصف التفصيلي *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="وصف تفصيلي لميزات الملف وطريقة استخدامه"
            />
          </div>

          {/* Category, Tags, and Version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                الفئة *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                العلامات
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="تصميم، صور، فوتوشوب"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رقم الإصدار *
              </label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="1.0.0"
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-medium mb-1">قبل رفع الملف:</p>
              <ul className="space-y-1 text-xs">
                <li>• تأكد من أن الملف آمن وخالي من الفيروسات</li>
                <li>• يجب أن يكون المحتوى قانونياً ومناسباً</li>
                <li>• تأكد من دقة المعلومات المقدمة</li>
                <li>• احترم حقوق الطبع والنشر</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className="px-6 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            <span>{isSubmitting ? 'جاري الرفع...' : 'رفع الملف'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;