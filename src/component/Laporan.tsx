import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {IconLeft} from '../asset';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_API_URL} from '@env';
import {useAuthStore} from '../stores/useAuthStore';
import {Report} from '../constants/Model';

const App = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);

  const [laporan, setLaporan] = useState<Report>({
    total_laba: '',
    total_terjual: '',
    biaya_tambahan: '',
    stok_sebelumnya: '',
    stok_sekarang: 0,
  });

  const getLaporan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/laporan/transaksi`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsLoading(false);
      // console.log(response);
      setLaporan(response.data.messages);
    } catch (error) {
      setIsLoading(false);
      console.log('get data laporan', error);
    }
  };

  useEffect(() => {
    getLaporan();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft />
        </TouchableOpacity>
        <View style={{width: '80%', left: '10%', alignItems: 'center'}}>
          <Text style={styles.title}>Laporan</Text>
        </View>
      </View>
      <View style={styles.container_Box}>
        <View
          style={{flexDirection: 'row', marginTop: '10%', marginBottom: '5%'}}>
          <View
            style={{
              width: '43%',
              height: 100,
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#44E7AC',
                width: 2,
                height: '90%',
                marginLeft: '8%',
                marginTop: '3%',
              }}
            />
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                paddingLeft: '6%',
              }}>
              <Text style={styles.titleLap}>Terjual</Text>
              <Text style={styles.titleAng}>{laporan.total_terjual}</Text>
            </View>
          </View>
          <View
            style={{
              width: '43%',
              height: 100,
              marginLeft: '4%',
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#45AAB8',
                width: 2,
                height: '90%',
                marginLeft: '8%',
                marginTop: '3%',
              }}
            />
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                paddingLeft: '6%',
              }}>
              <Text style={styles.titleLap}>Laba</Text>
              <Text style={styles.titleLap}>Rp{laporan.total_laba}</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentProduk}>
          <View style={styles.Imageview}>
            {/* <Image source={{}} style={styles.Image} /> */}
          </View>
          <View
            style={{marginLeft: '8%', width: '60%', justifyContent: 'center'}}>
            <Text style={styles.titleProduk}>
              {parseInt(laporan.stok_sebelumnya) + laporan.stok_sekarang}
            </Text>
            <Text style={styles.titleProduk}>Stock Seluruh Barang</Text>
          </View>
        </View>
        {/* <View style={styles.contentProduk}>
          <View style={styles.Imageview}>
            <Image source={{}} style={styles.Image} />
          </View>
          <View
            style={{marginLeft: '8%', width: '60%', justifyContent: 'center'}}>
            <Text style={styles.titleProduk}>20</Text>
            <Text style={styles.titleProduk}>Stock Rusak</Text>
          </View>
        </View> */}
        <View style={styles.contentProduk}>
          <View style={styles.Imageview}>
            {/* <Image source={{}} style={styles.Image} /> */}
          </View>
          <View
            style={{marginLeft: '8%', width: '60%', justifyContent: 'center'}}>
            <Text style={styles.titleProduk}>Rp{laporan.biaya_tambahan}</Text>
            <Text style={styles.titleProduk}>Biaya Tambahan</Text>
          </View>
        </View>
      </View>
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
    backgroundColor: '#44E7AC',
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
    alignItems: 'center',
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
    width: '90%',
    height: 90,
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    paddingLeft: '5%',
    borderRadius: 10,
  },
  Imageview: {
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 50,
    borderRadius: 100,
    maxWidth: 50,
    maxHeight: 50,
    marginTop: 20,
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    maxHeight: 50,
    maxWidth: 50,
  },
  titleProduk: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  produkIsi: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  stock: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
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
  titleLap: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  titleAng: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
  },
});
