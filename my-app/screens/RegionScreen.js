import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import MapComponent from './MapComponent';
import { fetchUniversitiesByRegion } from '../lib/insforge-client';

export default function RegionScreen({ route, navigation }) {
  const { regionId, regionName } = route.params;
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUniversities();
  }, [regionId]);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      const universitiesData = await fetchUniversitiesByRegion(regionId);
      setUniversities(universitiesData);
    } catch (error) {
      console.error('加载大学数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 仅在非Web平台显示地图视图选项
  const showMapView = Platform.OS !== 'web';

  const handleMarkerPress = (university) => {
    navigation.navigate('UniversityDetail', { 
      universityId: university.id, 
      universityName: university.name,
      regionId: regionId
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  // 为地图组件构建地区数据结构
  const regionDataForMap = {
    id: regionId,
    name: regionName,
    universities: universities
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{regionName}的交换院校</Text>
        
        {/* 添加视图切换按钮 */}
        {showMapView && (
          <View style={styles.viewToggleContainer}>
            <TouchableOpacity 
              style={[styles.viewToggleButton, viewMode === 'list' && styles.activeViewToggle]}
              onPress={() => setViewMode('list')}
            >
              <Text style={[styles.viewToggleText, viewMode === 'list' && styles.activeViewToggleText]}>列表</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.viewToggleButton, viewMode === 'map' && styles.activeViewToggle]}
              onPress={() => setViewMode('map')}
            >
              <Text style={[styles.viewToggleText, viewMode === 'map' && styles.activeViewToggleText]}>地图</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {viewMode === 'list' || !showMapView ? (
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {universities.map((university) => (
            <TouchableOpacity
              key={university.id}
              style={styles.universityItem}
              onPress={() => navigation.navigate('UniversityDetail', { 
                universityId: university.id, 
                universityName: university.name,
                regionId: regionId
              })}
            >
              <Text style={styles.universityName}>{university.name}</Text>
              <Text style={styles.universityLocation}>{university.location}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.mapContainer}>
          <MapComponent 
            regionData={regionDataForMap} 
            onMarkerPress={handleMarkerPress} 
          />
        </View>
      )}
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 4,
  },
  viewToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  activeViewToggle: {
    backgroundColor: '#fff',
  },
  viewToggleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  activeViewToggleText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  universityItem: {
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
  universityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  universityLocation: {
    fontSize: 14,
    color: '#666',
  },
});
