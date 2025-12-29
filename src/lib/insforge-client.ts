import { createClient } from '@insforge/sdk';

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://zd8jv2d5.us-east.insforge.app',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
});

export const { database } = client;

// 获取地区数据
export const fetchRegions = async () => {
  try {
    const { data, error } = await database
      .from('regions')
      .select();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error) {
    console.error('获取地区数据失败:', error);
    throw error;
  }
};

// 插入新地区
export const insertRegion = async (region: { id: string; name: string; latitude?: number; longitude?: number }) => {
  try {
    const { data, error } = await database
      .from('regions')
      .insert(region)
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('插入地区数据失败:', error);
    throw error;
  }
};

// 插入新大学
export const insertUniversity = async (university: any) => {
  try {
    const { data, error } = await database
      .from('universities')
      .insert(university)
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('插入大学数据失败:', error);
    throw error;
  }
};

// 更新大学信息
export const updateUniversity = async (id: string, updates: any) => {
  try {
    const { data, error } = await database
      .from('universities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('更新大学数据失败:', error);
    throw error;
  }
};

export default client;
