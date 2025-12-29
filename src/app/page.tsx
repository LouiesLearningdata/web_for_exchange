'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface University {
  id: string;
  region_id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  semester: string;
  favorite: string;
  complaint: string;
  recommended_course: string;
  special_thanks: string;
  visa: string;
  preparation: string;
  flight: string;
  course_info: string;
  course_assessment: string;
  credit_transfer: string;
  learning_experience: string;
  items_needed: string;
  other_procedures: string;
  accommodation: string;
  accommodation_life: string;
  dining: string;
  bank: string;
  insurance: string;
  others: string;
  clubs: string;
  transportation: string;
  travel: string;
  entertainment: string;
}

interface Region {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchData = async () => {
    try {
      // 使用Insforge SDK的正确方式
      const { database } = await import('@/lib/insforge-client');
      
      // 获取地区数据
      const { data: regionsData, error: regionsError } = await database
        .from('regions')
        .select('*');
      
      if (regionsError) {
        console.error('获取地区数据失败:', regionsError);
        setRegions([]);
      } else {
        setRegions(regionsData || []);
      }
      
      // 获取大学数据
      const { data: universitiesData, error: universitiesError } = await database
        .from('universities')
        .select('*');
      
      if (universitiesError) {
        console.error('获取大学数据失败:', universitiesError);
        setUniversities([]);
        setFilteredUniversities([]);
      } else {
        setUniversities(universitiesData || []);
        setFilteredUniversities(universitiesData || []);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    if (regionId === 'all') {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(universities.filter(uni => uni.region_id === regionId));
    }
  };

  const handleUniversityClick = (university: University) => {
    setSelectedUniversity(university);
  };

  const renderUniversityDetail = (university: University) => {
    const fields = [
      { label: '学期安排', key: 'semester' },
      { label: '最喜欢的', key: 'favorite' },
      { label: '抱怨', key: 'complaint' },
      { label: '推荐课程', key: 'recommended_course' },
      { label: '特别感谢', key: 'special_thanks' },
      { label: '签证信息', key: 'visa' },
      { label: '行前准备', key: 'preparation' },
      { label: '航班信息', key: 'flight' },
      { label: '课程信息', key: 'course_info' },
      { label: '课程评估', key: 'course_assessment' },
      { label: '学分转换', key: 'credit_transfer' },
      { label: '学习体验', key: 'learning_experience' },
      { label: '必备物品', key: 'items_needed' },
      { label: '其他手续', key: 'other_procedures' },
      { label: '住宿', key: 'accommodation' },
      { label: '住宿生活', key: 'accommodation_life' },
      { label: '餐饮', key: 'dining' },
      { label: '银行', key: 'bank' },
      { label: '保险', key: 'insurance' },
      { label: '其他', key: 'others' },
      { label: '社团', key: 'clubs' },
      { label: '交通', key: 'transportation' },
      { label: '旅行', key: 'travel' },
      { label: '娱乐', key: 'entertainment' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{university.name}</h3>
            <p className="text-gray-600 text-lg">📍 {university.location}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/edit-university/${university.id}`)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              编辑信息
            </button>
            <button
              onClick={() => setSelectedUniversity(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              返回列表
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ label, key }) => {
            const value = university[key as keyof University];
            if (!value) return null;
            
            return (
              <div key={key} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-blue-600 mb-2">{label}</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (selectedUniversity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {renderUniversityDetail(selectedUniversity)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">CEMS 交换院校指南</h1>
              <p className="text-gray-600">查看全球交换院校的详细信息</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-gray-600">欢迎, {user?.name || user?.email}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/add-university')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加院校
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <label className="font-medium text-gray-700">筛选地区:</label>
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">全部地区</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 大学列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <div
                key={university.id}
                onClick={() => handleUniversityClick(university)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{university.name}</h3>
                  <p className="text-gray-600 mb-3">📍 {university.location}</p>
                  
                  {university.favorite && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">最喜欢的:</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{university.favorite.substring(0, 100)}{university.favorite.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  
                  {university.recommended_course && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">推荐课程:</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{university.recommended_course.substring(0, 100)}{university.recommended_course.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  
                  <button className="mt-4 w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">暂无符合条件的交换院校</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
