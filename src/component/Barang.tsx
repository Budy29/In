import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { Add_icon, IconLeft } from '../asset';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import { useAuthStore } from '../stores/useAuthStore';
import { Product } from '../constants/Model';
import { useProducts } from '../stores/useInventoryStore';

const App = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { products, setProducts } = useProducts()

  const { accessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
  }));

  const getDataProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/barang`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      setProducts(response.data.messages.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProducts();
  }, []);

  const handleDelete = async (id: number) => {
    setModalVisible(false);
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASE_API_URL}/barang/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getDataProducts();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [idHapus, setIdHapus] = useState(0);

  const ModalcConfirm = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Apakah anda yakin ingin menghapus barang ini ?
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Pressable
                  style={[styles.button, styles.buttonNext]}
                  onPress={() => handleDelete(idHapus)}>
                  <Text style={styles.textStyle}>Ya, Hapus!</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Tidak</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {modalVisible && <ModalcConfirm />}
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft />
        </TouchableOpacity>
        <View style={{ width: '80%', left: '10%', alignItems: 'center' }}>
          <Text style={styles.title}>Barang</Text>
        </View>
      </View>
      <View style={styles.container_Box}>
        <ScrollView style={styles.containerScrool}>
          {products.map(item => (
            <View key={item.id} style={styles.contentProduk}>
              <View style={styles.Imageview}>
                {/* <Image source={item.gambar} style={styles.Image} /> */}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '83%',
                }}>
                <View
                  style={{
                    marginLeft: '4%',
                  }}>
                  <Text style={styles.titleProduk}>{item.nama_barang}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.produkIsi}>{item.barcode}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.produkIsi}>{item.harga_barang}</Text>
                    <Text style={styles.produkIsi}>,</Text>
                    <Text style={styles.produkIsi}>
                      kategori: {item.id_kategori}
                    </Text>
                  </View>
                  <Text style={styles.produkIsi}>
                    Catatan : {item.catatan != '' ? item.catatan : '-'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                    // backgroundColor: 'yellow'
                  }}>
                  <View style={{ width: 70, maxWidth: 75, left: 15 }}>
                    <Text style={styles.stock}>Stok: {item.stok}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setIdHapus(parseInt(item.id));
                      setModalVisible(true);
                    }}>
                    <Text style={{ color: '#ff0000' }}>hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('TambahBarang' as never)}
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
  Imageview: {
    backgroundColor: '#D9D9D9',
    width: 45,
    height: 45,
    borderRadius: 100,
    maxWidth: 45,
    maxHeight: 45,
    marginTop: 20,
  },
  Image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    maxHeight: 45,
    maxWidth: 45,
  },
  titleProduk: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
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

  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonNext: {
    backgroundColor: '#ff0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },
});
