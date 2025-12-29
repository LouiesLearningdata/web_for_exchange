import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import RegionScreen from './screens/RegionScreen';
import UniversityDetailScreen from './screens/UniversityDetailScreen';
import AddUniversityScreen from './screens/AddUniversityScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'CEMS 交换院校指南' }} 
        />
        <Stack.Screen 
          name="Region" 
          component={RegionScreen} 
          options={({ route }) => ({ title: route.params.regionName })}
        />
        <Stack.Screen 
          name="UniversityDetail" 
          component={UniversityDetailScreen} 
          options={({ route }) => ({ title: route.params.universityName })}
        />
        <Stack.Screen 
          name="AddUniversity" 
          component={AddUniversityScreen} 
          options={{ title: '添加新院校' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
