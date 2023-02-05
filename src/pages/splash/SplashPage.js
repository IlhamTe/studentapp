import {
  View,
  Text,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  StatusBar
} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashPage({navigation}) {
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Akses Lokasi',
          message: 'Izinkan aplikasi mengakses data lokasi?',
          buttonNeutral: 'Tanyakan nanti',
          buttonNegative: 'TIDAK',
          buttonPositive: 'YA',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const getEmail = await AsyncStorage.getItem('loginUser');
        setTimeout(() => {
          if (getEmail === null || getEmail.length === 0 || getEmail === '') {
            navigation.dispatch(StackActions.replace('Login'));
          } else {
            navigation.dispatch(StackActions.replace('Home'));
          }
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Login'));
        }, 2000);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor="#063970" barStyle="light-content" />
      <Image
        source={require('../../../assets/logo_login.jpg')}
        style={{width: 300, height: 300}}
        resizeMode="cover"
      />
      <Text
        style={{
          color: '#063970',
          fontSize: 17,
          fontStyle: 'italic',
          marginBottom: 30,
        }}>
          Voice Your Interest
      </Text>
      <ActivityIndicator animating={true} color="#063970" size={'small'} />
    </View>
  );
}
