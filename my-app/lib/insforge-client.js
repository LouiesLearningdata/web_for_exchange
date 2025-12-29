// 使用InsForge SDK
const { createClient } = require('@insforge/sdk');

const client = createClient({
  baseUrl: 'https://zd8jv2d5.us-east.insforge.app',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMTUxNjd9.LN34lgoWtVnVNZDihwuy-FO7htj7xS1n8DZM2GawbKM'
});

const { database } = client;

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

// 根据地区ID获取大学数据
export const fetchUniversitiesByRegion = async (regionId) => {
  try {
    const { data, error } = await database
      .from('universities')
      .select()
      .eq('region_id', regionId);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error) {
    console.error('获取大学数据失败:', error);
    throw error;
  }
};

// 根据ID获取大学详情
export const fetchUniversityById = async (universityId) => {
  try {
    const { data, error } = await database
      .from('universities')
      .select()
      .eq('id', universityId)
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error('获取大学详情失败:', error);
    throw error;
  }
};

// 插入新地区
export const insertRegion = async (region) => {
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
export const insertUniversity = async (university) => {
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
export const updateUniversity = async (id, updates) => {
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
