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
import { IconLeft } from '../asset';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import { useAuthStore } from '../stores/useAuthStore';
import { Report } from '../constants/Model';
import { useBiayaTambahan, useProducts } from '../stores/useInventoryStore';

const App = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);
  const { biayaTambahan, setBiayaTambahan } = useBiayaTambahan();
  const { products, setProducts } = useProducts();
  const [totalHarga, setTotalHarga] = useState();
  const [totalBarang, setTotalBarang] = useState();


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
      console.log('ini merupakan laporan', response);
      setLaporan(response.data.messages);
    } catch (error) {
      setIsLoading(false);
      console.log('get data laporan', error);
    }
  };

  const getBiayaTambahan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/biayatambahan`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      console.log(response);
      const biayaTambahanData = response.data.messages.data;

      // Menghitung total harga dari seluruh item dalam array 'biayaTambahanData'
      const totalHarga = biayaTambahanData.reduce(
        (accumulator: number, currentItem: { harga: string; }) => accumulator + parseFloat(currentItem.harga),
        0
      );

      console.log('Total harga:', totalHarga);

      setBiayaTambahan(biayaTambahanData);
      setTotalHarga(totalHarga);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };


  const getDataProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/barang`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      // console.log('ini data barang :', response.data.messages.data)
      const Barang = response.data.messages.data;

      const totalBarang = Barang.reduce(
        (accumulator: number, currentItem: { stok: string }) => accumulator + parseFloat(currentItem.stok),
        0
      );
      console.log('total Stock :', totalBarang);
      setProducts(response.data.messages.data);
      setTotalBarang(totalBarang)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };


  useEffect(() => {
    getLaporan();
    getBiayaTambahan();
    getDataProducts();
  }, []);

  // const totalHarga = setBiayaTambahan.reduce((total: any, item: { harga: any; }) => total + item.harga, 0);
  // console.log(totalHarga);
  // const totalHarga : number = setBiayaTambahan.reduce((total, item) => total + item.harga, 0);
  // console.log(totalHarga);

  // const totalStock = setProducts.reduce((total: any, item: { stock: any; }) => total + item.stock, 0);
  // console.log(totalStock);

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft />
        </TouchableOpacity>
        <View style={{ width: '80%', left: '10%', alignItems: 'center' }}>
          <Text style={styles.title}>Laporan</Text>
        </View>
      </View>
      <View style={styles.container_Box}>
        <View
          style={{ flexDirection: 'row', marginTop: '10%', marginBottom: '5%' }}>
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
            style={{ marginLeft: '8%', width: '60%', justifyContent: 'center' }}>
            <Text style={styles.titleProduk}>
              {totalBarang}
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
            style={{ marginLeft: '8%', width: '60%', justifyContent: 'center' }}>
            <Text style={styles.titleProduk}>Rp. {totalHarga}</Text>
            <Text style={styles.titleProduk}>Biaya Tambahan</Text>
          </View>
        </View>
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
