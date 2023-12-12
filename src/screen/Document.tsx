import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {IconLeft, Add_icon, Camera, Magnifier, Batal} from '../asset';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';

const App = () => {
  const navigation = useNavigation();
  const [modalDokumen, setModalDokumen] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [selectedButton, setSelectedButton] = useState('semua');
  const [modal, setModal] = useState(false);
  const [dataMasuk, setDataMasuk] = useState([
    {
      nama: 'Pelembab Kulit',
      harga: 150,
      Catatan: 'Deskripsi Produk A',
      stok: 20,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Sosis Sonice',
      harga: 200,
      Catatan: 'Deskripsi Produk B',
      stok: 15,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Pelembab Kulit',
      harga: 150,
      Catatan: 'Deskripsi Produk A',
      stok: 20,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Sosis Sonice',
      harga: 200,
      Catatan: 'Deskripsi Produk B',
      stok: 15,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
  ]);
  const [dataKeluar, setDataKeluar] = useState([
    {
      nama: 'halo',
      harga: 150,
      Catatan: 'Deskripsi Produk A',
      stok: 20,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Gaga',
      harga: 200,
      Catatan: 'Deskripsi Produk B',
      stok: 15,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Pelet',
      harga: 150,
      Catatan: 'Deskripsi Produk A',
      stok: 20,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Sosice',
      harga: 200,
      Catatan: 'Deskripsi Produk B',
      stok: 15,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Pet',
      harga: 150,
      Catatan: 'Deskripsi Produk A',
      stok: 20,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
    {
      nama: 'Sonice',
      harga: 200,
      Catatan: 'Deskripsi Produk B',
      stok: 15,
      Kode_Barang: 1236371,
      Barcode: 21732798273,
      Jumlah: 42,
      kategori: 'ScenCare',
    },
  ]);

  let dataToDisplay: any = [];

  if (selectedButton === 'Semua') {
    dataToDisplay = dataMasuk.concat(dataKeluar);
  } else if (selectedButton === 'Masuk') {
    dataToDisplay = dataMasuk;
  } else if (selectedButton === 'Keluar') {
    dataToDisplay = dataKeluar;
  }
  const handleButtonPress = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

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
  const openModal = () => {
    setModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft />
        </TouchableOpacity>
        <View style={{width: '80%', left: '10%', alignItems: 'center'}}>
          <Text style={styles.title}>Dokumen</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleButtonPress('Semua')}
          style={[
            styles.btn,
            selectedButton === 'Semua' ? styles.selectedButton : null,
          ]}>
          <Text style={styles.btnTitle}>Semua</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress('Masuk')}
          style={[
            styles.btn,
            selectedButton === 'Masuk' ? styles.selectedButton : null,
          ]}>
          <Text style={styles.btnTitle}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress('Keluar')}
          style={[
            styles.btn,
            selectedButton === 'Keluar' ? styles.selectedButton : null,
          ]}>
          <Text style={styles.btnTitle}>Keluar</Text>
        </TouchableOpacity>
      </View>
      {!modal && (
        <View style={{width: '100%', height: '80%'}}>
          <ScrollView style={{width: '100%', height: '100%', paddingTop: 20}}>
            {dataToDisplay.map((data: any, index: any) => (
              <View key={index} style={styles.item}>
                <View style={styles.Imageview}>
                  <Image source={{}} style={styles.Image} />
                </View>
                <View style={{marginLeft: '5%'}}>
                  <Text style={styles.titleProduk}>{data.nama}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.produkIsi}>{data.Barcode} .</Text>
                    <Text style={styles.produkIsi}>{data.Kode_Barang}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.produkIsi}>{data.harga} . </Text>
                    <Text style={styles.produkIsi}>{data.Jumlah} . </Text>
                    <Text style={styles.produkIsi}>{data.Catatan} . </Text>
                    <Text style={styles.produkIsi}>{data.kategori} . </Text>
                    <Text style={styles.produkIsi}>{data.stok} </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {(selectedButton === 'Masuk' || selectedButton === 'Keluar') && (
            <View
              style={{
                width: 100,
                height: 80,
                marginTop: '0%',
                zIndex: 10,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                left: '75%',
                top: '75%',
              }}>
              <TouchableOpacity onPress={openModal} style={styles.addProduk}>
                <Add_icon />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      {modal && (
        <View style={styles.container1}>
          <View style={styles.container_Box1}>
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle={{alignItems: 'center'}}>
              <TextInput
                placeholder="Barang"
                placeholderTextColor="#000000"
                style={styles.input}
              />

              <TextInput
                placeholder="Harga"
                placeholderTextColor="#000000"
                style={styles.input}
              />
              <TextInput
                placeholder="Jumlah "
                placeholderTextColor="#000000"
                style={styles.input}
              />
              <TextInput
                placeholder="Catatan"
                placeholderTextColor="#000000"
                style={styles.input}
              />
              <TextInput
                placeholder="Biaya Tambahan"
                placeholderTextColor="#000000"
                style={styles.input}
              />
              <View style={styles.input}>
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
              </View>
              <TouchableOpacity style={styles.btn1}>
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
              <TouchableOpacity
                onPress={addImage}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '54%',
                  position: 'absolute',
                  left: '82%',
                }}>
                <Camera />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  container_header: {
    backgroundColor: '#44E7AC',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
  },
  title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    marginTop: '8%',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#44E7AC',
    height: 90,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 83,
    marginTop: '2%',
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  btn: {
    backgroundColor: '#44E7AC',
    width: '35%',
    alignItems: 'center',
    height: '50%',
    borderBottomWidth: 5,
    borderColor: 'transparent',
  },
  btnTitle: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  selectedButton: {
    borderColor: '#68A4D9',
  },

  Imageview: {
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 50,
    borderRadius: 100,
    maxWidth: 50,
    maxHeight: 50,
    marginTop: 0,
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  produkIsi: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 14,
  },

  dataContainer: {
    marginBottom: 20,
    width: '100%',
  },
  item: {
    borderColor: '#000000',
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
    height: 90,
  },
  btnAdd: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 5,
  },
  btnAddText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addProduk: {
    width: 70,
    height: 70,
    backgroundColor: '#D9D9D9',
    zIndex: 3,
    // marginLeft: '75%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    width: '100%',
    height: '75%',
    marginTop: '5%',
    // backgroundColor: 'red'
  },
  container_Box1: {
    width: '100%',
    // backgroundColor: 'red',
    height: '100%',
    alignItems: 'center',
    marginTop: '0%',
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
});
