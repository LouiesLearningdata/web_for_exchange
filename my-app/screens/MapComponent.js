import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapComponent({ regionData, onMarkerPress }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: regionData.latitude,
        longitude: regionData.longitude,
        latitudeDelta: 15,
        longitudeDelta: 15,
      }}
    >
      {regionData.universities.map((university) => (
        <Marker
          key={university.id}
          coordinate={{
            latitude: university.latitude,
            longitude: university.longitude,
          }}
          title={university.name}
          description={university.location}
          onPress={() => onMarkerPress(university)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});