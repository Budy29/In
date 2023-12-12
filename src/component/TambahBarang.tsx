import React, { useState, useEffect } from 'react';
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
import { Cancel, Save, Camera } from '../asset';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import { useAuthStore } from '../stores/useAuthStore';
import { Category } from '../constants/Model';
import SelectDropdown from 'react-native-select-dropdown';

interface AppProps { }
const App: React.FC<AppProps> = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string>('');
  const [data, setData] = useState<string>('scane something');
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  useEffect(() => {
    if (scanned) {
      console.log('Barcode Data:', barcodeData);
      setScanned(false);
    }
  }, [scanned, barcodeData]);
  const handleBarCodeScanned = ({ data }: BarCodeReadEvent) => {
    setScanned(true);
    setBarcodeData(data || '');
  };

  const startScan = () => {
    setIsCameraVisible(true);
  };
  const handleQRCodeClose = () => {
    setIsCameraVisible(false);
  };

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

  const [namaBarang, setNamaBarang] = useState<string>('');
  const [harga, setHarga] = useState<string>('');
  const [stok, setStok] = useState<string>('');
  const [catatan, setCatatan] = useState<string>('');
  const [kategori, setKategori] = useState<string>('');

  const accessToken = useAuthStore(state => state.accessToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [catergories, setCategories] = useState<Category[]>([
    {
      id: '',
      nama_kategori: '',
      created_at: '',
      updated_at: '',
      keterangan: '',
    },
  ]);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/kategori`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsLoading(false);
      setCategories(response.data.messages.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/barang`,
        {
          barcode: barcodeData,
          nama_barang: namaBarang,
          harga_barang: harga,
          stok,
          catatan,
          id_kategori: kategori,
          gambar: uploadedImage,
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Cancel />
        </TouchableOpacity>
        <View style={{ width: '70%', marginLeft: '2%', alignItems: 'center' }}>
          <Text style={styles.title}>Tambahkan Barang</Text>
        </View>
        {/* <TouchableOpacity style={{marginLeft: '5%'}}>
          <Save />
        </TouchableOpacity> */}
      </View>
      <View style={styles.container_Box}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <TextInput
            placeholder="Barcode"
            placeholderTextColor="#000000"
            style={styles.input}
            value={barcodeData}
            onChangeText={text => setBarcodeData(text)}
          />
          <TextInput
            placeholder="Nama Barang"
            placeholderTextColor="#000000"
            style={styles.input}
            onChangeText={text => setNamaBarang(text)}
          />
          <TextInput
            placeholder="Harga"
            placeholderTextColor="#000000"
            style={styles.input}
            onChangeText={text => setHarga(text)}
          />
          <TextInput
            placeholder="Stock"
            placeholderTextColor="#000000"
            style={styles.input}
            onChangeText={text => setStok(text)}
          />
          <TextInput
            placeholder="Catatan"
            placeholderTextColor="#000000"
            style={styles.input}
            onChangeText={text => setCatatan(text)}
          />
          <SelectDropdown
            data={catergories}
            onSelect={(selectedItem, index) => {
              setKategori(selectedItem.id);
            }}
            defaultButtonText="Pilih Kategori"
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.nama_kategori;
            }}
            rowTextForSelection={(item, index) => {
              return item.nama_kategori;
            }}
            dropdownIconPosition={'left'}
            buttonStyle={{
              width: '85%',
              borderBottomWidth: 2,
              paddingTop: '1%',
              marginTop: '5%',
              backgroundColor: '#E6E6E6',
              borderRadius: 5,
              height: 74,
              paddingLeft: 15,
            }}
            buttonTextStyle={{
              fontFamily: 'Fredoka-Bold',
              color: '#000',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          />
          {/* <TextInput
            placeholder="Kategori"
            placeholderTextColor="#000000"
            style={styles.input}
            onChangeText={text => setNamaBarang(text)}
          /> */}
          {uploadedImage && ( // Menampilkan gambar yang diunggah jika ada
            <View>
              <Image
                source={{ uri: uploadedImage.path }}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: '5%',
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                onPress={CancelUploud}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  left: '15%',
                  top: '15%',
                }}>
                <Cancel style={{ widh: '70%', height: '70%' }} />
              </TouchableOpacity>
            </View>
          )}
          {!uploadedImage && (
            <TouchableOpacity style={styles.btn} onPress={addImage}>
              <Text style={styles.btnTitle}>Tambah Gambar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={startScan}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '7%',
              position: 'absolute',
              left: '82%',
            }}>
            <Camera />
          </TouchableOpacity>
          {isCameraVisible && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={isCameraVisible}
              onRequestClose={() => setIsCameraVisible(false)}>
              <QRCodeScanner
                onRead={({ data }) => {
                  setData(data);
                  handleBarCodeScanned({ data });
                  handleQRCodeClose(); // Menutup QRCodeScanner setelah berhasil memindai
                }}
                reactivate={true}
                reactivateTimeout={500}
                showMarker={true}
                topContent={
                  <View>
                    <Text
                      style={{
                        color: '#000000',
                        padding: 2,
                        fontSize: 20,
                        margin: 100,
                        width: '100%',
                        height: 40,
                        fontFamily: 'Fredoka- Bold',
                      }}>
                      Silahkan Arahkan Camera Ke Barcode
                    </Text>
                  </View>
                }
                bottomContent={
                  <View
                    style={{
                      width: '100%',
                      height: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 20,
                        height: 40,
                        fontFamily: 'Fredoka- Bold',
                      }}>
                      QR code scanner
                    </Text>
                    <TouchableOpacity onPress={handleQRCodeClose}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 20,
                          height: 40,
                          fontFamily: 'Fredoka- Bold',
                        }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </Modal>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#D9D9D9',
              width: '85%',
              height: 60,
              borderRadius: 5,
              marginTop: '4%',
              marginBottom: '10%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.btnTitle}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: '87%',
    alignItems: 'center',
    marginTop: '10%',
  },
  title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    // marginLeft: '20%',
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
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    height: 74,
    paddingLeft: 15,
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
