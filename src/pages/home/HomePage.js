import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, StackActions} from '@react-navigation/native';
import UrlApi from '../../utils/UrlApi';

export default function HomePage() {
  const [infoLocation, setInfoLocation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [name, setName] = useState('');
  const [nim, setNIM] = useState('');
  const [hobby, setHobby] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const navigation = useNavigation();

  const listDummyData = [
    {
      id: '1',
      nim: '22111333',
      name: 'Abdi',
      gender: 'L',
      hobby: 'Membaca',
      address: 'Surabaya, Jawa Timur',
      comment: '',
    },
    {
      id: '2',
      nim: '3345981',
      name: 'Jimmy',
      gender: 'L',
      hobby: 'Desain',
      address: 'Sidoarjo, Jawa Timur',
      comment: '',
    },
    {
      id: '3',
      nim: '8179102',
      name: 'Rossa',
      gender: 'P',
      hobby: 'Memasak',
      address: 'Malang, Jawa Timur',
      comment: '',
    },
    {
      id: '4',
      nim: '9877761',
      name: 'Nana',
      gender: 'P',
      hobby: 'Olahraga',
      address: 'Jakarta Pusat',
      comment: '',
    },
    {
      id: '5',
      nim: '6581723',
      name: 'Raka',
      gender: 'L',
      hobby: 'Mendegarkan Musik',
      address: 'Bandung, Jawa Barat',
      comment: '',
    },
  ];

  async function getLocation() {
    // Geocoder.init('GOOGLE_API_KEY');
    Geolocation.getCurrentPosition(
      position => {
        let result = JSON.stringify(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setInfoLocation(result);

      //   Geocoder.from(position.coords.latitude, position.coords.longitude)
      //     .then(json => {
      //       var addressComponent = json.results[0].address_components[0];
      //       console.log(addressComponent);
      //     })
      //     .catch(error => console.warn(error));
      },
      error =>
        Alert.alert('Error Posisi Tidak Ditemukan', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  }

  async function getDataFromSession() {
    try {
      const getNIM = await AsyncStorage.getItem('nimUser');
      const getName = await AsyncStorage.getItem('nameUser');
      const getHobby = await AsyncStorage.getItem('hobbyUser');
      const getAddress = await AsyncStorage.getItem('addressUser');
      const getGender = await AsyncStorage.getItem('genderUser');
      setNIM(getNIM)
      setName(getName)
      setHobby(getHobby)
      setAddress(getAddress)
      setGender(getGender)
    } catch (error) {
      console.warn(error);
    }
  }

  function confirmLogout() {
    console.log(UrlApi.LOGIN);
    Alert.alert('Konfirmasi Logout', 'Apakah anda yakin untuk logout', [
      {
        text: 'TIDAK',
      },
      {
        text: 'YA',
        onPress: () => {
          AsyncStorage.clear();
          navigation.dispatch(StackActions.replace('Login'));
        },
      },
    ]);
  }

  useEffect(() => {
    getLocation();
    getDataFromSession();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
      <StatusBar backgroundColor="#063970" barStyle="light-content" />
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 40,
          width: '100%',
        }}>
        <Image
          source={require('../../../assets/profile.png')}
          resizeMode="cover"
          style={{height: 150, width: 150}}
        />
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#063970'}}>
            Hi,
            <Text style={{color: 'black'}}> {name} ({gender})</Text>
          </Text>

          <Text style={{color: '#063970', fontSize: 17, marginTop: 10}}>
            <Icon
              style={{marginRight: 5}}
              name="id-card"
              size={20}
              color="#063970"
            />{' '}
            {nim}
          </Text>

          <Text style={{color: '#063970', fontSize: 17, marginTop: 10}}>
            <Icon
              style={{marginRight: 5}}
              name="bicycle"
              size={20}
              color="#063970"
            />{' '}
            {hobby}
          </Text>

          <Text style={{color: '#063970', fontSize: 17, marginTop: 10}}>
            <Icon
              style={{marginRight: 5}}
              name="home"
              size={20}
              color="#063970"
            />{' '}
            {address}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: '#063970', fontSize: 20, fontWeight: 'bold'}}>
          DATA MAHASISWA
        </Text>

        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}
          onPress={() => navigation.navigate('AllStudent')}>
          <Text style={{alignSelf: 'flex-end', fontSize: 15, color: '#063970'}}>
            Lihat semua data
          </Text>
          <IonicIcon
            style={{marginLeft: 5, top: 1}}
            name="chevron-down-outline"
            size={20}
            color="#063970"
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20, flex: 1}}>
        <FlatList
          data={listDummyData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: 15,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                elevation: 3,
              }}>
              <Image
                source={
                  item.gender === 'L'
                    ? require('../../../assets/boy.png')
                    : require('../../../assets/girl.png')
                }
                resizeMode="contain"
                style={{height: 100, width: 100}}
              />
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#063970',
                  }}>
                  {item.name}
                </Text>

                <Text style={{color: '#063970', fontSize: 15, marginTop: 10}}>
                  <Icon name="id-card" size={18} color="#063970" /> {item.nim}
                </Text>

                <Text style={{color: '#063970', fontSize: 15, marginTop: 10}}>
                  <Icon name="bicycle" size={18} color="#063970" /> {item.hobby}
                </Text>

                <Text style={{color: '#063970', fontSize: 17, marginTop: 10}}>
                  <Icon name="home" size={20} color="#063970" /> {item.address}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 30,
          right: 20,
          height: 70,
          backgroundColor: '#063970',
          borderRadius: 100,
        }}
        onPress={confirmLogout}>
        <Icon name="sign-out" size={35} color="white" style={{marginLeft: 6}} />
      </TouchableOpacity>
    </View>
  );
}
