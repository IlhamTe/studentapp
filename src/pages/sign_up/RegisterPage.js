import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {SelectList} from 'react-native-dropdown-select-list';
import {StackActions} from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterPage({navigation}) {
  const listHobbies = [
    {
      key: '1',
      value: 'Membaca',
    },
    {
      key: '2',
      value: 'Menulis',
    },
    {
      key: '3',
      value: 'Desain',
    },
    {
      key: '4',
      value: 'Mendengarkan Musik',
    },
    {
      key: '5',
      value: 'Memasak',
    },
    {
      key: '6',
      value: 'Olahraga',
    },
  ];
  const [isSaving, setSaving] = useState(false);

  const [nimValue, setNimValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('L');
  const [hobby, setHobby] = useState('');

  const nimRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const commentRef = useRef();
  const passRef = useRef();

  const [listGender, setListGender] = useState([
    {
      id: '1',
      label: 'Laki - Laki',
      value: 'L',
      selected: true,
      borderColor: 'white',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 16},
    },
    {
      id: '2',
      label: 'Perempuan',
      value: 'P',
      selected: false,
      borderColor: 'white',
      color: 'white',
      labelStyle: {color: 'white', fontSize: 16},
    },
  ]);

  function onPressRadioButton(selectedRadio) {
    const filteredRadio = selectedRadio.filter(data => data.selected === true);
    setSelectedGender(filteredRadio[0].label);
    setListGender(selectedRadio);
  }

  function doRegister() {
    setSaving(true);
    saveDataToSession()
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 2000);
  }

  async function saveDataToSession() {
    try {
      await AsyncStorage.setItem('nimUser',nimValue)
      await AsyncStorage.setItem('nameUser', nameValue)
      await AsyncStorage.setItem('passUser', passValue)
      await AsyncStorage.setItem('addressUser', addressValue)
      await AsyncStorage.setItem('genderUser', selectedGender)
      await AsyncStorage.setItem('hobbyUser', hobby)
      await AsyncStorage.setItem('commentUser', commentValue)
    } catch (error) {
      Alert.alert('Terjadi Kesalahan', error.message);
    }
  }

  function resetForm() {
    // setNimValue('')
    // setNameValue('')
    // setAddressValue('')
    // setHobby('')
    // setCommentValue('')

    nimRef.current.clear();
    nameRef.current.clear();
    addressRef.current.clear();
    commentRef.current.clear();
    passRef.current.clear();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{height: '20%'}}>
        <Image
          source={require('../../../assets/register_bg.jpg')}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View
        style={{
          height: '100%',
          top: -30,
          elevation: 3,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'rgb(6, 57, 112)',
          paddingHorizontal: 16,
          paddingTop: 60,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          FORM REGISTER
        </Text>

        <ScrollView
          style={{
            width: '70%',
            maxWidth: '70%',
          }}
          scrollEnabled={true}
          contentContainerStyle={{
            alignItems: 'flex-start',
            flexGrow: 1,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 45,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#063970',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <Icon
              style={{marginRight: 5}}
              name="id-card"
              size={20}
              color="#063970"
            />
            <TextInput
              style={{height: 50, flex: 1, color: '#063970', fontSize: 17}}
              placeholder="Masukkan NIM"
              placeholderTextColor="#063970"
              keyboardType="numeric"
              ref={nimRef}
              editable={!isSaving}
              onChangeText={value => setNimValue(value)}
              maxLength={30}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 45,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#063970',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <Icon
              style={{marginRight: 5}}
              name="user"
              size={20}
              color="#063970"
            />
            <TextInput
              style={{height: 50, flex: 1, color: '#063970', fontSize: 17}}
              placeholder="Masukkan Nama"
              placeholderTextColor="#063970"
              ref={nameRef}
              editable={!isSaving}
              onChangeText={value => setNameValue(value)}
              maxLength={30}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 45,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#063970',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <Icon
              style={{marginRight: 5}}
              name="key"
              size={20}
              color="#063970"
            />
            <TextInput
              style={{height: 50, flex: 1, color: '#063970', fontSize: 17}}
              placeholder="Masukkan Password"
              placeholderTextColor="#063970"
              ref={passRef}
              editable={!isSaving}
              onChangeText={value => setPassValue(value)}
              secureTextEntry={true}
              multiline={false}
              maxLength={10}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '98%',
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#063970',
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Icon
              style={{marginRight: 5, marginTop: 12}}
              name="home"
              size={20}
              color="#063970"
            />
            <TextInput
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                color: '#063970',
                textAlignVertical: 'top',
                fontSize: 17,
                paddingRight: 16,
              }}
              placeholder="Masukkan Alamat"
              placeholderTextColor="#063970"
              ref={addressRef}
              editable={!isSaving}
              onChangeText={value => setAddressValue(value)}
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <View
            style={{
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                marginBottom: 10,
                fontWeight: '700',
              }}>
              Pilih Jenis Kelamin
            </Text>
            <RadioGroup
              radioButtons={listGender}
              onPress={onPressRadioButton}
              layout="row"
              containerStyle={{
                left: -10,
              }}
            />
          </View>

          <View style={{width: '100%', marginVertical: 20}}>
            <SelectList
              data={listHobbies}
              setSelected={value => {
                console.log(listHobbies.filter(data => data.key === value))
                const getHobby = listHobbies.filter(data => data.key === value)
                setHobby(getHobby[0].value)
              }}
              notFoundText="Hobi tidak ditemukan"
              boxStyles={{
                backgroundColor: 'white',
                maxHeight: 50,
                width: '100%',
                maxWidth: '100%',
                borderRadius: 0,
              }}
              inputStyles={{fontSize: 15, color: '#063970'}}
              dropdownStyles={{backgroundColor: 'white'}}
              dropdownTextStyles={{fontSize: 15, color: '#063970'}}
              arrowicon={<Icon name="chevron-down" size={17} color="#063970" />}
              searchPlaceholder="Cari Hobi"
              placeholder="Pilih Hobi"
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              maxWidth: '98%',
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#063970',
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Icon
              style={{marginRight: 5, marginTop: 12}}
              name="commenting-o"
              size={20}
              color="#063970"
            />
            <TextInput
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                color: '#063970',
                textAlignVertical: 'top',
                fontSize: 17,
                paddingRight: 16,
              }}
              placeholder="Tulis komentar ..."
              placeholderTextColor="#063970"
              ref={commentRef}
              editable={!isSaving}
              onChangeText={value => setCommentValue(value)}
              multiline={true}
              numberOfLines={3}
            />
          </View>

          {!isSaving ? (
            <View style={{flexDirection: 'row', maxWidth: '100%'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#063970',
                  borderRadius: 20,
                }}
                onPress={resetForm}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#063970',
                    fontWeight: 'bold',
                  }}>
                  RESET
                </Text>
              </TouchableOpacity>
              <View style={{width: 20}} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#063970',
                  borderRadius: 20,
                }}
                onPress={doRegister}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#063970',
                    fontWeight: 'bold',
                  }}>
                  SIMPAN
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <ActivityIndicator
                animating={true}
                color="white"
                size={'large'}
              />
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  fontSize: 20,
                }}>
                Menyimpan data
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
