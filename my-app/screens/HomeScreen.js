import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchRegions, fetchUniversitiesByRegion } from '../lib/insforge-client';

export default function HomeScreen({ navigation }) {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      setLoading(true);
      const regionsData = await fetchRegions();
      
      // 为每个地区获取大学数量
      const regionsWithCounts = await Promise.all(
        regionsData.map(async (region) => {
          const universities = await fetchUniversitiesByRegion(region.id);
          return {
            ...region,
            universityCount: universities.length
          };
        })
      );
      
      setRegions(regionsWithCounts);
    } catch (error) {
      console.error('加载地区数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CEMS 交换院校指南</Text>
        <Text style={styles.subtitle}>选择一个地区查看详细信息</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddUniversity')}
        >
          <Text style={styles.addButtonText}>+ 添加新院校</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {regions.map((region) => (
          <TouchableOpacity
            key={region.id}
            style={styles.regionItem}
            onPress={() => navigation.navigate('Region', { regionId: region.id, regionName: region.name })}
          >
            <Text style={styles.regionName}>{region.name}</Text>
            <Text style={styles.universityCount}>{region.universityCount} 所学校</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'medium',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  regionItem: {
    backgroundColor: '#ffffff',
    padding: 25,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  universityCount: {
    fontSize: 14,
    color: '#666',
  },
});
