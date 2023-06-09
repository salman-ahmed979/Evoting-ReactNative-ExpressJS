import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    return () => {
      stopLocationSubscription();
    };
  }, []);

  const getOneTimeLocation = async () => {
    setLocationStatus('Getting Location ...');
    try {
      const location = await Location.getLastKnownPositionAsync();
      if (location) {
        setLocationStatus('You are Here');
        setCurrentLocation(location.coords);
      }
    } catch (error) {
      setLocationStatus(error.message);
    }
  };

  const subscribeLocationLocation = async () => {
    try {
      const location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
        },
        newLocation => {
          setLocationStatus('You are Here');
          setCurrentLocation(newLocation.coords);
        },
      );
    } catch (error) {
      setLocationStatus(error.message);
    }
  };

  const stopLocationSubscription = () => {
    Location.stopLocationUpdatesAsync();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        zoomControlEnabled={true}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
            : null
        }>
        {currentLocation ? (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title={'City Campus'}
            description={'City Campus'}
          />
        ) : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
