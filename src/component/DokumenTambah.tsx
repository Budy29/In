import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Cancel, Batal, Magnifier, Camera} from '../asset';
import ImageCropPicker from 'react-native-image-crop-picker';

const App = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.container_Box}>
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
                  fontSize: 20,
                  fontFamily: 'Fredoka-Bold',
                  marginTop: '5%',
                }}>
                Tambah Gambar
              </Text>
            ) : (
              <ImageBackground
                source={{uri: uploadedImage.path}}
                style={{
                  width: 250,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: '15%',
                }}>
                <TouchableOpacity
                  onPress={CancelUploud}
                  style={{marginLeft: '90%', marginTop: '-12%'}}>
                  <Batal />
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTitle}>Simpan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '7%',
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
              marginTop: '84%',
              position: 'absolute',
              left: '82%',
            }}>
            <Camera />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: '20%',
    backgroundColor: 'red',
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
    backgroundColor: 'red',
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
    paddingLeft: 20,
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
