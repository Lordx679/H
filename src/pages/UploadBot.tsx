import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const UploadBot: React.FC = () => {
  const { language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    category: 'Music',
    tags: '',
    prefix: '!',
    inviteUrl: '',
    supportServer: ''
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Music',
    'Moderation',
    'Economy',
    'Fun',
    'Utility',
    'Gaming'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: '',
        shortDescription: '',
        description: '',
        category: 'Music',
        tags: '',
        prefix: '!',
        inviteUrl: '',
        supportServer: ''
      });
      setAvatar(null);
      setAvatarPreview('');
    }, 3000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bot Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your bot has been submitted for review. You'll receive an email once it's approved.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Review typically takes 24-48 hours</p>
            <p>• You'll receive email notifications about the status</p>
            <p>• Make sure your bot is online and functional</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('uploadTitle', language)}</h1>
        <p className="text-gray-600 mt-2">
          Share your Discord bot with the community. Fill out the form below to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          {/* Bot Avatar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bot Avatar
            </label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="h-20 w-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Bot Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('botName', language)} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              placeholder="Enter your bot's name"
            />
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              placeholder="Brief description for bot cards (max 100 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.shortDescription.length}/100 characters
            </p>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('botDescription', language)} *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              placeholder="Detailed description of your bot's features and capabilities"
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('category', language)} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tags', language)}
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
                placeholder="music, queue, spotify (comma-separated)"
              />
            </div>
          </div>

          {/* Prefix */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Command Prefix *
            </label>
            <input
              type="text"
              name="prefix"
              value={formData.prefix}
              onChange={handleInputChange}
              required
              maxLength={5}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent font-mono"
              placeholder="!"
            />
            <p className="text-xs text-gray-500 mt-1">
              The prefix users will use to trigger your bot's commands
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bot Links</h2>
          
          {/* Invite URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invite URL *
            </label>
            <input
              type="url"
              name="inviteUrl"
              value={formData.inviteUrl}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              placeholder="https://discord.com/oauth2/authorize?client_id=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Discord OAuth2 URL for inviting your bot to servers
            </p>
          </div>

          {/* Support Server */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Server
            </label>
            <input
              type="url"
              name="supportServer"
              value={formData.supportServer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-discord-blurple focus:border-transparent"
              placeholder="https://discord.gg/..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Discord server where users can get help with your bot
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Before submitting your bot:</p>
              <ul className="space-y-1 text-xs">
                <li>• Ensure your bot is online and functional</li>
                <li>• Bot must comply with Discord's Terms of Service</li>
                <li>• No NSFW content or malicious behavior</li>
                <li>• Provide accurate and complete information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {t('cancel', language)}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-discord-blurple hover:bg-discord-blurple-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            <span>{isSubmitting ? 'Submitting...' : t('submit', language)}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadBot;