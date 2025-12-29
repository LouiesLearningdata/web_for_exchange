'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { database, fetchRegions, insertRegion, insertUniversity } from '@/lib/insforge-client';

interface Region {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface UniversityFormData {
  // 基本信息
  region_id: string;
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  
  // 学术信息
  semester: string;
  recommended_course: string;
  course_info: string;
  course_assessment: string;
  credit_transfer: string;
  
  // 体验分享
  favorite: string;
  complaint: string;
  learning_experience: string;
  special_thanks: string;
  
  // 实务信息
  visa: string;
  preparation: string;
  flight: string;
  items_needed: string;
  other_procedures: string;
  
  // 生活信息
  accommodation: string;
  accommodation_life: string;
  dining: string;
  bank: string;
  insurance: string;
  others: string;
  
  // 活动信息
  clubs: string;
  transportation: string;
  travel: string;
  entertainment: string;
}

interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  isAnalyzing?: boolean;
}

export default function AddUniversityPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');
  const [showNewRegionForm, setShowNewRegionForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState<UniversityFormData>({
    // 基本信息
    region_id: '',
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    
    // 学术信息
    semester: '',
    recommended_course: '',
    course_info: '',
    course_assessment: '',
    credit_transfer: '',
    
    // 体验分享
    favorite: '',
    complaint: '',
    learning_experience: '',
    special_thanks: '',
    
    // 实务信息
    visa: '',
    preparation: '',
    flight: '',
    items_needed: '',
    other_procedures: '',
    
    // 生活信息
    accommodation: '',
    accommodation_life: '',
    dining: '',
    bank: '',
    insurance: '',
    others: '',
    
    // 活动信息
    clubs: '',
    transportation: '',
    travel: '',
    entertainment: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (isAuthenticated) {
      fetchRegionsData();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchRegionsData = async () => {
    try {
      setLoading(true);
      const data = await fetchRegions();
      setRegions(data || []);
    } catch (error) {
      console.error('获取地区数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UniversityFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddNewRegion = async () => {
    if (!newRegionName.trim()) return;
    
    try {
      const newRegion = {
        id: `region_${Date.now()}`,
        name: newRegionName.trim(),
        latitude: 0,
        longitude: 0
      };
      
      const createdRegion = await insertRegion(newRegion);
      setRegions(prev => [...prev, createdRegion]);
      setFormData(prev => ({ ...prev, region_id: createdRegion.id }));
      setNewRegionName('');
      setShowNewRegionForm(false);
    } catch (error) {
      console.error('添加地区失败:', error);
      alert('添加地区失败，请重试');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.region_id) {
      alert('请填写学校名称并选择地区');
      return;
    }

    try {
      setSubmitLoading(true);
      
      const universityData = {
        id: `uni_${Date.now()}`,
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      await insertUniversity(universityData);
      alert('大学信息添加成功！');
      router.push('/');
    } catch (error) {
      console.error('添加大学失败:', error);
      alert('添加大学失败，请重试');
    } finally {
      setSubmitLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    
    Array.from(files).forEach(file => {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert(`文件 ${file.name} 不是图片格式，请选择图片文件`);
        return;
      }

      // 检查文件大小（限制为5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert(`文件 ${file.name} 太大，请选择小于5MB的图片`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newImages.push({
        id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        file,
        previewUrl
      });
    });

    setUploadedImages(prev => [...prev, ...newImages]);
    event.target.value = ''; // 重置input
  };

  // 删除图片
  const handleRemoveImage = (id: string) => {
    setUploadedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // 智能合并表单数据
  const mergeFormData = (currentData: UniversityFormData, newData: Partial<UniversityFormData>): UniversityFormData => {
    const merged = { ...currentData };
    
    // 遍历所有字段，根据不同类型进行智能合并
    Object.keys(newData).forEach(key => {
      const field = key as keyof UniversityFormData;
      const currentValue = currentData[field];
      const newValue = newData[field];
      
      if (!newValue || newValue.trim() === '') {
        // 新值为空，保留原值
        return;
      }
      
      if (!currentValue || currentValue.trim() === '') {
        // 原值为空，直接使用新值
        merged[field] = newValue;
        return;
      }
      
      // 根据字段类型进行智能合并
      switch (field) {
        // 基本信息字段 - 优先使用新值（除非新值明显不完整）
        case 'name':
        case 'location':
        case 'latitude':
        case 'longitude':
          // 如果新值更详细或更完整，使用新值
          if (newValue.length > currentValue.length) {
            merged[field] = newValue;
          }
          break;
          
        // 文本描述字段 - 追加内容
        case 'semester':
        case 'recommended_course':
        case 'course_info':
        case 'course_assessment':
        case 'credit_transfer':
        case 'favorite':
        case 'complaint':
        case 'learning_experience':
        case 'special_thanks':
        case 'visa':
        case 'preparation':
        case 'flight':
        case 'items_needed':
        case 'other_procedures':
        case 'accommodation':
        case 'accommodation_life':
        case 'dining':
        case 'bank':
        case 'insurance':
        case 'others':
        case 'clubs':
        case 'transportation':
        case 'travel':
        case 'entertainment':
          // 追加新内容，避免重复
          if (!currentValue.includes(newValue)) {
            const separator = currentValue.endsWith('.') || currentValue.endsWith('。') ? ' ' : '。';
            merged[field] = `${currentValue}${separator}${newValue}`;
          }
          break;
          
        default:
          // 其他字段使用新值
          merged[field] = newValue;
      }
    });
    
    return merged;
  };

  // AI分析图片
  const handleAnalyzeImage = async (imageId: string) => {
    const imageIndex = uploadedImages.findIndex(img => img.id === imageId);
    if (imageIndex === -1) return;

    setIsAnalyzing(true);
    
    // 标记图片正在分析中
    setUploadedImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, isAnalyzing: true } : img
    ));

    try {
      const image = uploadedImages[imageIndex];
      
      // 将图片转换为base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(image.file);
      });

      // 调用AI分析API
      const response = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!response.ok) {
        throw new Error(`分析失败: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // 智能合并表单数据，而不是简单覆盖
        setFormData(prev => mergeFormData(prev, result.data));
        
        alert('AI分析完成！已智能合并表单信息。');
      } else {
        throw new Error(result.error || '分析失败');
      }
    } catch (error) {
      console.error('AI分析错误:', error);
      alert(`分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsAnalyzing(false);
      // 移除分析状态
      setUploadedImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, isAnalyzing: false } : img
      ));
    }
  };

  // 批量分析所有图片
  const handleAnalyzeAllImages = async () => {
    if (uploadedImages.length === 0) {
      alert('请先上传图片');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      for (const image of uploadedImages) {
        await handleAnalyzeImage(image.id);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">基本信息</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择地区 *</label>
              <div className="space-y-3">
                <select
                  value={formData.region_id}
                  onChange={(e) => handleInputChange('region_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择地区</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                
                <button
                  type="button"
                  onClick={() => setShowNewRegionForm(!showNewRegionForm)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + 添加新地区
                </button>
                
                {showNewRegionForm && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRegionName}
                      onChange={(e) => setNewRegionName(e.target.value)}
                      placeholder="新地区名称"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddNewRegion}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      添加
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学校名称 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入学校名称"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学校位置</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入学校详细地址"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">纬度</label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 39.9042"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">经度</label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 116.4074"
                />
              </div>
            </div>

            {/* 图片上传区域 */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">图片上传与AI识别</h3>
              <p className="text-sm text-gray-600 mb-4">
                上传院校相关图片（如录取通知书、课程表、校园地图等），使用AI自动识别并填充信息
              </p>
              
              {/* 图片上传控件 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">上传图片</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <div className="text-gray-600">
                        <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>点击选择图片或拖拽到此处</p>
                        <p className="text-xs mt-1">支持 JPG, PNG, WebP 格式，最大 5MB</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </label>
                  
                  {uploadedImages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleAnalyzeAllImages}
                      disabled={isAnalyzing}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? '分析中...' : '批量AI分析'}
                    </button>
                  )}
                </div>
              </div>

              {/* 图片预览区域 */}
              {uploadedImages.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">已上传图片 ({uploadedImages.length})</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image.previewUrl}
                            alt="预览"
                            className="w-full h-full object-cover"
                          />
                          {image.isAnalyzing && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                                <p className="text-xs">AI分析中...</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleAnalyzeImage(image.id)}
                            disabled={isAnalyzing || image.isAnalyzing}
                            className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {image.isAnalyzing ? '分析中' : 'AI分析'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI分析结果提示 */}
              {isAnalyzing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <p className="text-blue-700 text-sm">AI正在分析图片，请稍候...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">学术信息</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学期安排</label>
              <textarea
                value={formData.semester}
                onChange={(e) => handleInputChange('semester', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="描述学期的时间安排和特点"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">推荐课程</label>
              <textarea
                value={formData.recommended_course}
                onChange={(e) => handleInputChange('recommended_course', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="推荐给其他同学的课程"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">课程信息</label>
              <textarea
                value={formData.course_info}
                onChange={(e) => handleInputChange('course_info', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="课程的详细信息和特点"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">课程评估方式</label>
              <textarea
                value={formData.course_assessment}
                onChange={(e) => handleInputChange('course_assessment', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="作业、考试、项目等评估方式"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学分转换</label>
              <textarea
                value={formData.credit_transfer}
                onChange={(e) => handleInputChange('credit_transfer', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="学分转换的相关信息"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">体验分享</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">最喜欢的</label>
              <textarea
                value={formData.favorite}
                onChange={(e) => handleInputChange('favorite', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="交换期间最喜欢的人事物"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">抱怨/建议</label>
              <textarea
                value={formData.complaint}
                onChange={(e) => handleInputChange('complaint', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="遇到的问题或改进建议"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学习体验</label>
              <textarea
                value={formData.learning_experience}
                onChange={(e) => handleInputChange('learning_experience', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="整体的学习感受和收获"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">特别感谢</label>
              <textarea
                value={formData.special_thanks}
                onChange={(e) => handleInputChange('special_thanks', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="想要感谢的人或机构"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">实务信息</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">签证信息</label>
              <textarea
                value={formData.visa}
                onChange={(e) => handleInputChange('visa', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="签证申请流程和注意事项"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">行前准备</label>
              <textarea
                value={formData.preparation}
                onChange={(e) => handleInputChange('preparation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="出发前需要准备的事项"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">航班信息</label>
              <textarea
                value={formData.flight}
                onChange={(e) => handleInputChange('flight', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="推荐的航班或航线信息"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">必备物品</label>
              <textarea
                value={formData.items_needed}
                onChange={(e) => handleInputChange('items_needed', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="交换期间必需的物品清单"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">其他手续</label>
              <textarea
                value={formData.other_procedures}
                onChange={(e) => handleInputChange('other_procedures', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="其他需要办理的手续"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">生活信息</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">住宿</label>
              <textarea
                value={formData.accommodation}
                onChange={(e) => handleInputChange('accommodation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="住宿选择和相关建议"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">住宿生活</label>
              <textarea
                value={formData.accommodation_life}
                onChange={(e) => handleInputChange('accommodation_life', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="住宿生活的体验分享"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">餐饮</label>
              <textarea
                value={formData.dining}
                onChange={(e) => handleInputChange('dining', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="当地餐饮推荐和注意事项"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">银行</label>
              <textarea
                value={formData.bank}
                onChange={(e) => handleInputChange('bank', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="银行开户和金融服务"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">保险</label>
              <textarea
                value={formData.insurance}
                onChange={(e) => handleInputChange('insurance', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="保险购买和使用建议"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">其他</label>
              <textarea
                value={formData.others}
                onChange={(e) => handleInputChange('others', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="其他生活相关信息"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">活动信息</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">社团活动</label>
              <textarea
                value={formData.clubs}
                onChange={(e) => handleInputChange('clubs', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="推荐的社团和活动"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">交通</label>
              <textarea
                value={formData.transportation}
                onChange={(e) => handleInputChange('transportation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="当地交通方式和建议"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">旅行</label>
              <textarea
                value={formData.travel}
                onChange={(e) => handleInputChange('travel', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="周边旅行推荐和攻略"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">娱乐</label>
              <textarea
                value={formData.entertainment}
                onChange={(e) => handleInputChange('entertainment', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="当地娱乐活动和推荐"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">信息确认</h3>
              <p className="text-blue-700">
                学校名称: <strong>{formData.name || '未填写'}</strong><br/>
                所在地区: <strong>{regions.find(r => r.id === formData.region_id)?.name || '未选择'}</strong><br/>
                位置: <strong>{formData.location || '未填写'}</strong>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← 返回首页
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-800">添加新院校</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">欢迎, {user?.name || user?.email}</span>
                <button
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
          
          {/* 步骤指示器 */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 6 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>基本信息</span>
            <span>学术信息</span>
            <span>体验分享</span>
            <span>实务信息</span>
            <span>生活信息</span>
            <span>活动信息</span>
          </div>
        </div>

        {/* 表单内容 */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {renderStepContent()}
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            上一步
          </button>

          {currentStep === 6 ? (
            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLoading ? '提交中...' : '完成并提交'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
