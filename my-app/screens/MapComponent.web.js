import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapComponent({ regionData, onMarkerPress }) {
  return (
    <View style={styles.webMessageContainer}>
      <Text style={styles.webMessage}>
        地图功能在移动设备上可用。请使用Expo Go应用在手机上查看交互式地图。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});