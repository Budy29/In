import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Add, Add_icon, Cancel, IconLeft } from '../asset';
import { useNavigation } from '@react-navigation/native';
import { AdditionalPrice } from '../constants/Model';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import { useAuthStore } from '../stores/useAuthStore';
import { useBiayaTambahan } from '../stores/useInventoryStore';

const App = () => {
  const navigation = useNavigation();

  // const [biayaTambahan, setBiayaTambahan] = useState<AdditionalPrice[]>([]);

  const { biayaTambahan, setBiayaTambahan } = useBiayaTambahan()

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);

  const getBiayaTambahan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/biayatambahan`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      // console.log(response);
      setBiayaTambahan(response.data.messages.data)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getBiayaTambahan();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft />
        </TouchableOpacity>
        <View style={{ width: '80%', left: '10%', alignItems: 'center' }}>
          <Text style={styles.title}>Biaya Tambahan</Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('BiayaTambahan' as never)}
          style={{
            width: '10%',
            height: 49,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Add />
        </TouchableOpacity> */}
      </View>
      <View style={styles.container_Box}>
        <ScrollView style={styles.containerScrool}>
          {biayaTambahan.map(item => (
            <View style={styles.contentProduk}>
              <View style={{ marginLeft: '0%', width: '65%', paddingLeft: '2%' }}>
                <Text style={styles.titleProduk}>{item.nama}</Text>
                <Text style={styles.produkIsi}>{item.keterangan}</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={styles.Price}>{item.harga}</Text>
                <Text style={styles.Price}>/Peces</Text>
              </View>
            </View>
          ))}


        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('BiayaTambahan' as never)}
          style={styles.addProduk}>
          <Add_icon />
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
    </View>
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
    height: '93%',
  },
  title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    // marginLeft: '30%',
    marginTop: '8%',
    color: '#FFFFFF',
  },
  containerScrool: {
    width: '100%',
    maxHeight: '96%',
    // backgroundColor: 'green'
  },
  contentProduk: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 83,
    marginTop: '2%',
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  titleProduk: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginTop: '5%',
    marginBottom: '2%',
  },
  produkIsi: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 12,
    fontWeight: '400',
    color: '#394240',
  },
  Price: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginTop: '20%',
  },
  addProduk: {
    width: 70,
    height: 70,
    backgroundColor: '#D9D9D9',
    zIndex: 3,
    marginLeft: '75%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-25%',
  },
});
