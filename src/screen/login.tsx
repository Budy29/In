import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Wave1, Wave3, Eye, EyeLock } from '../asset';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '@env';
import { useAuthStore } from '../stores/useAuthStore';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigation = useNavigation();
  const { accessToken, setAccessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
    setAccessToken: state.setAccessToken,
  }));

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, {
        email,
        password,
      });
      setIsLoading(false);
      setAccessToken(response.data.token);
      console.log("berhasil", response.data.token)
      if (response.data.token) {
        navigation.navigate('Home' as never);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response.data.message);
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Wave3 style={{ top: '-1%' }} />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.containerBoxInput}>
        <TextInput
          placeholderTextColor="#000"
          placeholder="Email"
          style={styles.input}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          placeholderTextColor="#000"
          placeholder="Password"
          style={styles.input}
          onChangeText={e => setPassword(e)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'relative', top: '-14%', left: '35%' }}>
          {showPassword ? (
            <Eye />
          ) : (
            <EyeLock />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnTitle}>Login</Text>
        </TouchableOpacity>
      </View>
      <Wave1 />
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
  },
  containerTitle: {
    marginTop: '25%',
  },
  title: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
  },
  containerBoxInput: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    marginTop: '15%',

    // backgroundColor: 'red',
  },

  input: {
    width: '80%',
    height: 64,
    marginTop: 10,
    borderRadius: 5,
    borderBottomWidth: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    padding: 10,
  },
  btn: {
    backgroundColor: '#B9E1D3',
    width: '40%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '5%',
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  // ey: {
  //     position: 'relative',
  //     top: '-25%',
  //     left: '37%',
  // }
});
