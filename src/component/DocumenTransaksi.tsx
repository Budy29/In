import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Batal, Magnifier, Camera, Cross } from '../asset';
import ImageCropPicker from 'react-native-image-crop-picker';
import { AdditionalPrice, Product } from '../constants/Model';
import { useAuthStore } from '../stores/useAuthStore';
import { BASE_API_URL } from '@env';
import axios from 'axios';

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
}

const DocumenTransaksi: React.FC<Props> = ({
  openModal,
  setOpenModal,
  onCloseModal,
}) => {
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  const addImage = async () => {
    try {
      const imageStyle = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setUploadedImage(imageStyle);
      console.log('image selected:', imageStyle);
    } catch (error) {
      console.log('eror selecting image :', error);
    }
  };

  const CancelUploud = () => {
    setUploadedImage(null);
  };

  const [barang, setBarang] = useState<Product[]>([]);
  const [harga, setHarga] = useState<number>(0);
  const [biayaTambahan, setBiayaTambahan] = useState<number>(0);
  const [catatan, setCatatan] = useState<string>('');
  const [jumlah, setJumlah] = useState<number>(0);
  const [totalBiaya, setTotalBiaya] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);

  const getDataProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/barang`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      setBarang(response.data.messages.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
      // setBiayaTambahan(response.data.messages)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/transaksi`,
        {
          id_barang: 1,
          biaya_tambahan: biayaTambahan,
          catatan,
          jumlah,
          total_biaya: harga * jumlah + biayaTambahan,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setIsLoading(false);
      console.log(response);
      // setBiayaTambahan(response.data.messages)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProducts();
    getBiayaTambahan();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={onCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={{ left: '40%', top: '-5%' }} onPress={onCloseModal}>
              <Cross />
            </TouchableOpacity>
            <ScrollView
              style={{ width: '100%' }}
              contentContainerStyle={{ alignItems: 'center' }}>
              {/* dropdown */}
              <TextInput
                placeholder="Barang"
                placeholderTextColor="#000000"
                style={styles.input}
              />
              {/* otomatis diambil dari barang yang dipilih */}
              <TextInput
                placeholder="Harga"
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={text => setHarga(parseInt(text))}
              />
              <TextInput
                placeholder="Jumlah "
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={text => setJumlah(parseInt(text))}
              />
              <TextInput
                placeholder="Catatan"
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={text => setCatatan(text)}
              />
              {/* dropdown */}
              <TextInput
                placeholder="Biaya Tambahan"
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={text => setBiayaTambahan(parseInt(text))}
              />
              {/* <View style={styles.input}>
                {!uploadedImage ? (
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 16,
                      fontFamily: 'Fredoka-Bold',
                      marginTop: '2%',
                    }}>
                    Tambah Gambar
                  </Text>
                ) : (
                  <ImageBackground
                    source={{uri: uploadedImage.path}}
                    style={{
                      width: 250,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: '0%',
                    }}>
                    <TouchableOpacity
                      onPress={CancelUploud}
                      style={{
                        marginLeft: '90%',
                        marginTop: '-5%',
                        borderRadius: 25,
                      }}>
                      <Batal />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
              </View> */}
              <TouchableOpacity style={styles.btn1} onPress={handleSubmit}>
                <Text style={styles.btnTitle1}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '4%',
                  position: 'absolute',
                  left: '82%',
                }}>
                <Magnifier />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={addImage}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '57%',
                  position: 'absolute',
                  left: '82%',
                }}>
                <Camera />
              </TouchableOpacity> */}
            </ScrollView>
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
      </Modal>
    </View>
  );
};

export default DocumenTransaksi;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    width: '100%',
    height: '75%',
    marginTop: '5%',
    // backgroundColor: 'red',
  },
  container_Box1: {
    width: '100%',
    backgroundColor: '#FFF',
    height: '80%',
    alignItems: 'center',
    marginTop: '30%',
  },
  input: {
    // backgroundColor: '#FFFFFF',
    width: '85%',
    borderBottomWidth: 2,
    paddingTop: '1%',
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
    color: '#000000',
    marginTop: '5%',
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    height: 40,
    paddingLeft: 20,
  },
  btn1: {
    backgroundColor: '#D9D9D9',
    width: '85%',
    height: 45,
    borderRadius: 5,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle1: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  modalView: {
    width: '90%',
    height: '60%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },
});
