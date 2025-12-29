import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchUniversityById } from '../lib/insforge-client';

export default function UniversityDetailScreen({ route, navigation }) {
  const { universityId, universityName, regionId } = route.params;
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUniversity();
  }, [universityId]);

  const loadUniversity = async () => {
    try {
      setLoading(true);
      const universityData = await fetchUniversityById(universityId);
      setUniversity(universityData);
    } catch (error) {
      console.error('加载大学详情失败:', error);
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

  if (!university) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回</Text>
          </TouchableOpacity>
          <Text style={styles.title}>院校详情</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>找不到该院校信息</Text>
        </View>
      </View>
    );
  }

  // 渲染信息块的辅助函数
  const renderInfoBlock = (title, content) => {
    if (!content) return null;
    
    return (
      <View style={styles.card} key={title}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>
      </View>
    );
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
        <Text style={styles.title}>{universityName}</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {renderInfoBlock("学期时间&重要假期", university.semester)}
        {renderInfoBlock("最喜欢的一点", university.favorite)}
        {renderInfoBlock("最想吐槽的一点", university.complaint)}
        {renderInfoBlock("最推荐的课程", university.recommended_course)}
        {renderInfoBlock("特别鸣谢", university.special_thanks)}
        {renderInfoBlock("签证申请", university.visa)}
        {renderInfoBlock("行前准备", university.preparation)}
        {renderInfoBlock("机票预订", university.flight)}
        {renderInfoBlock("课程介绍", university.course_info)}
        {renderInfoBlock("课程考核", university.course_assessment)}
        {renderInfoBlock("学分转换", university.credit_transfer)}
        {renderInfoBlock("学习体验", university.learning_experience)}
        {renderInfoBlock("物品准备", university.items_needed)}
        {renderInfoBlock("其他手续", university.other_procedures)}
        {renderInfoBlock("住宿条件", university.accommodation)}
        {renderInfoBlock("住宿生活", university.accommodation_life)}
        {renderInfoBlock("餐饮条件", university.dining)}
        {renderInfoBlock("银行", university.bank)}
        {renderInfoBlock("保险", university.insurance)}
        {renderInfoBlock("其他方面", university.others)}
        {renderInfoBlock("社团活动", university.clubs)}
        {renderInfoBlock("交通出行", university.transportation)}
        {renderInfoBlock("旅游", university.travel)}
        {renderInfoBlock("娱乐", university.entertainment)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1976D2',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
});
