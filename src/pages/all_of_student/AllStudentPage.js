import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function AllStudentPage({navigation}) {
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
    {
      id: '6',
      nim: '6581723',
      name: 'Bima',
      gender: 'L',
      hobby: 'Mendegarkan Musik',
      address: 'Bandung, Jawa Barat',
      comment: '',
    },
    {
      id: '7',
      nim: '6581723',
      name: 'Yusuf',
      gender: 'L',
      hobby: 'Mendegarkan Musik',
      address: 'Bandung, Jawa Barat',
      comment: '',
    },
    {
      id: '8',
      nim: '6581723',
      name: 'Bagas',
      gender: 'L',
      hobby: 'Mendegarkan Musik',
      address: 'Bandung, Jawa Barat',
      comment: '',
    },
    {
      id: '9',
      nim: '6581723',
      name: 'Jaka',
      gender: 'L',
      hobby: 'Mendegarkan Musik',
      address: 'Bandung, Jawa Barat',
      comment: '',
    },
  ];

  return (
    <View style={{flex: 1, padding: 20}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingBottom: 10,
          marginBottom:20
        }}
        onPress={() => navigation.goBack()}>
        <IonicIcon name="chevron-back-outline" size={40} color="#063970" />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#063970',
            marginLeft:10
          }}>
          Data Semua Mahasiswa
        </Text>
      </TouchableOpacity>

      <View style={{flex: 1}}>
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
    </View>
  );
}
