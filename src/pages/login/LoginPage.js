import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function doLogin() {
    setIsLoading(true);
    if(email !== '' & password !== ''){
      validateLogin();
    }else{
      Alert.alert('LOGIN', 'Masukkan NIM dan Password!')
    }
    setIsLoading(false);
  }

  async function saveSession() {
    try {
      await AsyncStorage.setItem('loginUser', email);
    } catch (err) {
      console.warn(err);
    }
  }
  async function validateLogin() {
    try {
      const getNIM = await AsyncStorage.getItem('nimUser');
      const getPassword = await AsyncStorage.getItem('passUser');
      console.log('NIM ', getNIM, getPassword);
      if (getNIM === email && getPassword === password) {
        saveSession()
        navigation.dispatch(StackActions.replace('Home'));
      }else{
        Alert.alert('LOGIN', 'NIM atau Password Salah!')
      }
    } catch (err) {
      console.warn(err);
    }
  }

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
        style={{width: 250, height: 250}}
        resizeMode="cover"
      />

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '70%',
          height: 45,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#063970',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <FontAwIcon
          style={{marginRight: 5}}
          name="id-card"
          size={20}
          color="#063970"
        />
        <TextInput
          style={{height: 50, flex: 1, color: '#063970', fontSize: 17}}
          placeholder="Masukkan NIM"
          placeholderTextColor="#063970"
          maxLength={30}
          keyboardType="numeric"
          onChangeText={value => setEmail(value)}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '70%',
          height: 45,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#063970',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <Icon style={{marginRight: 5}} name="key" size={20} color="#063970" />
        <TextInput
          style={{height: 50, flex: 1, color: '#063970', fontSize: 17}}
          placeholder="Masukkan password"
          placeholderTextColor="#063970"
          secureTextEntry={true}
          multiline={false}
          maxLength={10}
          onChangeText={value => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#063970',
          height: 45,
          width: '30%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={doLogin}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          LOGIN
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 15}}>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize: 15, color: '#063970', fontWeight: 'bold'}}>
            Daftar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
