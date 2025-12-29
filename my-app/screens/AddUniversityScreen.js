import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchRegions, insertRegion, insertUniversity } from '../lib/insforge-client';

export default function AddUniversityScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');
  const [showNewRegionModal, setShowNewRegionModal] = useState(false);
  
  const [formData, setFormData] = useState({
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

  const totalSteps = 6;

  useEffect(() => {
    fetchRegionsData();
  }, []);

  const fetchRegionsData = async () => {
    try {
      setLoading(true);
      const data = await fetchRegions();
      setRegions(data || []);
    } catch (error) {
      console.error('获取地区数据失败:', error);
      Alert.alert('错误', '获取地区数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddNewRegion = async () => {
    if (!newRegionName.trim()) {
      Alert.alert('错误', '请输入地区名称');
      return;
    }
    
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
      setShowNewRegionModal(false);
      Alert.alert('成功', '地区添加成功');
    } catch (error) {
      console.error('添加地区失败:', error);
      Alert.alert('错误', '添加地区失败，请重试');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.region_id) {
      Alert.alert('错误', '请填写学校名称并选择地区');
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
      Alert.alert('成功', '大学信息添加成功！', [
        { text: '确定', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('添加大学失败:', error);
      Alert.alert('错误', '添加大学失败，请重试');
    } finally {
      setSubmitLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>基本信息</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>选择地区 *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.region_id}
                  onValueChange={(value) => handleInputChange('region_id', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="请选择地区" value="" />
                  {regions.map((region) => (
                    <Picker.Item key={region.id} label={region.name} value={region.id} />
                  ))}
                </Picker>
              </View>
              
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowNewRegionModal(true)}
              >
                <Text style={styles.addButtonText}>+ 添加新地区</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>学校名称 *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="请输入学校名称"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>学校位置</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(value) => handleInputChange('location', value)}
                placeholder="请输入学校详细地址"
              />
            </View>

            <View style={styles.rowGroup}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>纬度</Text>
                <TextInput
                  style={styles.input}
                  value={formData.latitude}
                  onChangeText={(value) => handleInputChange('latitude', value)}
                  placeholder="例: 39.9042"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>经度</Text>
                <TextInput
                  style={styles.input}
                  value={formData.longitude}
                  onChangeText={(value) => handleInputChange('longitude', value)}
                  placeholder="例: 116.4074"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>学术信息</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>学期安排</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.semester}
                onChangeText={(value) => handleInputChange('semester', value)}
                placeholder="描述学期的时间安排和特点"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>推荐课程</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.recommended_course}
                onChangeText={(value) => handleInputChange('recommended_course', value)}
                placeholder="推荐给其他同学的课程"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>课程信息</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.course_info}
                onChangeText={(value) => handleInputChange('course_info', value)}
                placeholder="课程的详细信息和特点"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>课程评估方式</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.course_assessment}
                onChangeText={(value) => handleInputChange('course_assessment', value)}
                placeholder="作业、考试、项目等评估方式"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>学分转换</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.credit_transfer}
                onChangeText={(value) => handleInputChange('credit_transfer', value)}
                placeholder="学分转换的相关信息"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>体验分享</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>最喜欢的</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.favorite}
                onChangeText={(value) => handleInputChange('favorite', value)}
                placeholder="交换期间最喜欢的人事物"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>抱怨/建议</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.complaint}
                onChangeText={(value) => handleInputChange('complaint', value)}
                placeholder="遇到的问题或改进建议"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>学习体验</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.learning_experience}
                onChangeText={(value) => handleInputChange('learning_experience', value)}
                placeholder="整体的学习感受和收获"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>特别感谢</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.special_thanks}
                onChangeText={(value) => handleInputChange('special_thanks', value)}
                placeholder="想要感谢的人或机构"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>实务信息</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>签证信息</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.visa}
                onChangeText={(value) => handleInputChange('visa', value)}
                placeholder="签证申请流程和注意事项"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>行前准备</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.preparation}
                onChangeText={(value) => handleInputChange('preparation', value)}
                placeholder="出发前需要准备的事项"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>航班信息</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.flight}
                onChangeText={(value) => handleInputChange('flight', value)}
                placeholder="推荐的航班或航线信息"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>必备物品</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.items_needed}
                onChangeText={(value) => handleInputChange('items_needed', value)}
                placeholder="交换期间必需的物品清单"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>其他手续</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.other_procedures}
                onChangeText={(value) => handleInputChange('other_procedures', value)}
                placeholder="其他需要办理的手续"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>生活信息</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>住宿</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.accommodation}
                onChangeText={(value) => handleInputChange('accommodation', value)}
                placeholder="住宿选择和相关建议"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>住宿生活</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.accommodation_life}
                onChangeText={(value) => handleInputChange('accommodation_life', value)}
                placeholder="住宿生活的体验分享"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>餐饮</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.dining}
                onChangeText={(value) => handleInputChange('dining', value)}
                placeholder="当地餐饮推荐和注意事项"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>银行</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.bank}
                onChangeText={(value) => handleInputChange('bank', value)}
                placeholder="银行开户和金融服务"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>保险</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.insurance}
                onChangeText={(value) => handleInputChange('insurance', value)}
                placeholder="保险购买和使用建议"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>其他</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.others}
                onChangeText={(value) => handleInputChange('others', value)}
                placeholder="其他生活相关信息"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>活动信息</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>社团活动</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.clubs}
                onChangeText={(value) => handleInputChange('clubs', value)}
                placeholder="推荐的社团和活动"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>交通</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.transportation}
                onChangeText={(value) => handleInputChange('transportation', value)}
                placeholder="当地交通方式和建议"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>旅行</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.travel}
                onChangeText={(value) => handleInputChange('travel', value)}
                placeholder="周边旅行推荐和攻略"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>娱乐</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.entertainment}
                onChangeText={(value) => handleInputChange('entertainment', value)}
                placeholder="当地娱乐活动和推荐"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.confirmBox}>
              <Text style={styles.confirmTitle}>信息确认</Text>
              <Text style={styles.confirmText}>
                学校名称: {formData.name || '未填写'}{'\n'}
                所在地区: {regions.find(r => r.id === formData.region_id)?.name || '未选择'}{'\n'}
                位置: {formData.location || '未填写'}
              </Text>
            </View>
          </View>
        );

      default:
        return null;
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
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>添加新院校</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* 步骤指示器 */}
      <View style={styles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View key={index} style={styles.stepDotContainer}>
            <View
              style={[
                styles.stepDot,
                currentStep >= index + 1 ? styles.activeStepDot : styles.inactiveStepDot
              ]}
            >
              <Text
                style={[
                  styles.stepDotText,
                  currentStep >= index + 1 ? styles.activeStepDotText : styles.inactiveStepDotText
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < totalSteps - 1 && (
              <View
                style={[
                  styles.stepLine,
                  currentStep > index + 1 ? styles.activeStepLine : styles.inactiveStepLine
                ]}
              />
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.stepLabels}>
        <Text style={styles.stepLabel}>基本</Text>
        <Text style={styles.stepLabel}>学术</Text>
        <Text style={styles.stepLabel}>体验</Text>
        <Text style={styles.stepLabel}>实务</Text>
        <Text style={styles.stepLabel}>生活</Text>
        <Text style={styles.stepLabel}>活动</Text>
      </View>

      {/* 表单内容 */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {renderStepContent()}
      </ScrollView>

      {/* 导航按钮 */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={prevStep}
          disabled={currentStep === 1}
          style={[
            styles.navButton,
            styles.prevButton,
            currentStep === 1 && styles.disabledButton
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              currentStep === 1 && styles.disabledButtonText
            ]}
          >
            上一步
          </Text>
        </TouchableOpacity>

        {currentStep === totalSteps ? (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={submitLoading}
            style={[styles.navButton, styles.submitButton, submitLoading && styles.disabledButton]}
          >
            <Text
              style={[
                styles.navButtonText,
                submitLoading && styles.disabledButtonText
              ]}
            >
              {submitLoading ? '提交中...' : '完成并提交'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={nextStep}
            style={[styles.navButton, styles.nextButton]}
          >
            <Text style={styles.navButtonText}>下一步</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 添加新地区模态框 */}
      <Modal
        visible={showNewRegionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNewRegionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>添加新地区</Text>
            <TextInput
              style={styles.modalInput}
              value={newRegionName}
              onChangeText={setNewRegionName}
              placeholder="请输入地区名称"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowNewRegionModal(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddNewRegion}
              >
                <Text style={styles.confirmButtonText}>添加</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2196F3',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 50,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  stepDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepDot: {
    backgroundColor: '#2196F3',
  },
  inactiveStepDot: {
    backgroundColor: '#ddd',
  },
  stepDotText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeStepDotText: {
    color: '#fff',
  },
  inactiveStepDotText: {
    color: '#666',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 5,
  },
  activeStepLine: {
    backgroundColor: '#2196F3',
  },
  inactiveStepLine: {
    backgroundColor: '#ddd',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  stepLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  stepContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'medium',
  },
  confirmBox: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#ddd',
  },
  nextButton: {
    backgroundColor: '#2196F3',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#fff',
  },
  disabledButtonText: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
