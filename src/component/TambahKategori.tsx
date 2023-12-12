import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Cancel } from '../asset';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../stores/useAuthStore';
import axios from 'axios';
import { BASE_API_URL } from '@env';

const App = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);

  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/kategori`,
        {
          nama_kategori: name,
          keterangan: note,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Cancel />
        </TouchableOpacity>
        <Text style={styles.title}>Tambahkan Kategori</Text>
      </View>
      <View style={styles.container_Box}>
        <TextInput
          placeholder="Kategori"
          placeholderTextColor="#000000"
          style={styles.input}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Keterangan"
          placeholderTextColor="#000000"
          style={styles.input}
          onChangeText={text => setNote(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTitle}>Simpan</Text>
        </TouchableOpacity>
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
    </Modal>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  container_header: {
    backgroundColor: '#B9E1D3',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
  },
  container_Box: {
    width: '100%',
    // backgroundColor: 'red',
    height: '40%',
    alignItems: 'center',
    marginTop: '10%',
  },
  title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: '20%',
    marginTop: '8%',
    color: '#FFFFFF',
  },
  input: {
    // backgroundColor: '#FFFFFF',
    width: '85%',
    borderBottomWidth: 2,
    paddingTop: '1%',
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    color: '#000000',
    marginTop: '5%',
  },
  btn: {
    backgroundColor: '#D9D9D9',
    width: '85%',
    height: 60,
    borderRadius: 5,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
});
