import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Wave1, Wave2} from '../asset';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {BASE_API_URL} from '@env';

const App = () => {
  const {width, height} = Dimensions.get('window');

  const [namaKaryawan, setNamaKaryawan] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const [message, setMessage] = useState({
    password: '',
    confirm_password: '',
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_API_URL}/register`, {
        nama: namaKaryawan,
        username: username,
        email: email,
        password: password,
        password_confirm: confirmPassword,
      });
      setIsLoading(true);
      Alert.alert('Registrasi Berhasil');
      navigation.navigate('Scr' as never);
    } catch (error: any) {
      setIsLoading(false);
      const errors = error.response.data.errors;

      let errorMessages = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          if (
            errors[key] ==
            'The password field must be at least 8 characters in length.'
          ) {
            errorMessages += `Password kurang dari 8 karakter\n`;
          } else {
            errorMessages += `${errors[key]}\n`;
          }
        }
      }
      Alert.alert('Error', errorMessages);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Wave2 />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Daftar</Text>
      </View>
      <View style={styles.containerBoxInput}>
        <ScrollView
          style={{width: '100%', height: 700}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={{width: '100%', height: 450, alignItems: 'center'}}>
            <TextInput
              placeholder="Nama Karyawan"
              placeholderTextColor="#000"
              style={styles.input1}
              onChangeText={text => setNamaKaryawan(text)}
            />
            <TextInput
              placeholderTextColor="#000"
              placeholder="Username"
              style={styles.input}
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              placeholderTextColor="#000"
              placeholder="Email"
              style={styles.input1}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholderTextColor="#000"
              placeholder="Password"
              style={styles.input}
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              placeholderTextColor="#000"
              placeholder="Konfirmasi Password"
              style={styles.input1}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btnTitle}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={{top: -90}}>
        <Wave1 />
      </View>
      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#B9E1D3" />
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
  containerTitle: {
    marginTop: '5%',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
  },
  containerBoxInput: {
    width: '100%',
    // backgroundColor: 'red',
    height: '50%',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '15%',
  },
  input1: {
    width: '85%',
    height: 60,
    backgroundColor: '#E6E6E6',
    marginTop: '1%',
    borderRadius: 5,
    borderBottomWidth: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    paddingLeft: 15,
  },
  input: {
    width: '85%',
    height: 60,
    marginTop: '1%',
    borderRadius: 5,
    borderBottomWidth: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    paddingLeft: 15,
  },
  btn: {
    backgroundColor: '#B9E1D3',
    width: '40%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '10%',
    marginBottom: '0%',
    zIndex: 2,
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
