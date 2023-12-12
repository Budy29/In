import * as React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {IconLeft, Add_icon} from '../asset';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../stores/useAuthStore';
import {BASE_API_URL} from '@env';
import axios from 'axios';
import {Product, Transactions} from '../constants/Model';
import {useState} from 'react';
import DocumenTransaksi from '../component/DocumenTransaksi';

const SecondRoute = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([
    {
      barcode: '',
      catatan: '',
      created_at: '',
      gambar: '',
      harga_barang: '',
      id: '',
      id_kategori: '',
      nama_barang: '',
      stok: '',
      updated_at: '',
    },
  ]);
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

  React.useEffect(() => {
    getDataProducts();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 20}}>
        {products.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.Imageview}>
              <Image source={{}} style={styles.Image} />
            </View>
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.titleProduk}>{item.nama_barang}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>{item.barcode} .</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>{item.harga_barang} . </Text>
                <Text style={styles.produkIsi}>{item.catatan} . </Text>
                <Text style={styles.produkIsi}>{item.id_kategori} . </Text>
                <Text style={styles.produkIsi}>{item.stok} </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const FirstRoute = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([
    {
      barcode: '',
      catatan: '',
      created_at: '',
      gambar: '',
      harga_barang: '',
      id: '',
      id_kategori: '',
      nama_barang: '',
      stok: '',
      updated_at: '',
    },
  ]);
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

  React.useEffect(() => {
    getDataProducts();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 20}}>
        {products.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.Imageview}>
              <Image source={{}} style={styles.Image} />
            </View>
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.titleProduk}>{item.nama_barang}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>{item.barcode} .</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>{item.harga_barang} . </Text>
                <Text style={styles.produkIsi}>{item.catatan} . </Text>
                <Text style={styles.produkIsi}>{item.id_kategori} . </Text>
                <Text style={styles.produkIsi}>{item.stok} </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ThridRoute = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAuthStore(state => state.accessToken);

  const [transaksi, setTransaksi] = useState<Transactions[]>([]);

  const getTransaksi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/transaksi`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTransaksi(response.data.messages.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getTransaksi();
  }, []);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={{width: '100%', height: '100%', paddingTop: 20}}>
        {transaksi.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.Imageview}>
              <Image source={{}} style={styles.Image} />
            </View>
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.titleProduk}>tambahi nama baran jun</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>{item.created_at} .</Text>
                <Text style={styles.produkIsi}>{item.id}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produkIsi}>Rp{item.total_biaya} . </Text>
                <Text style={styles.produkIsi}>{item.jumlah} . </Text>
                <Text style={styles.produkIsi}>{item.catatan} . </Text>
                <Text style={styles.produkIsi}>tambahi kategori jun </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {openModal && (
        <DocumenTransaksi
          onCloseModal={onCloseModal}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
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
        {!openModal && (
          <TouchableOpacity
            onPress={() => setOpenModal(true)}
            style={styles.addProduk}>
            <Add_icon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  thrid: ThridRoute,
});

export default function TabDocument() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Semua'},
    {key: 'second', title: 'Masuk'},
    {key: 'thrid', title: 'Keluar'},
  ]);

  const navigation = useNavigation();

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
      <View style={{flex: 1, width: '100%'}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar {...props} style={{backgroundColor: '#44E7AC'}} />
          )}
        />
      </View>
    </View>
  );
}

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
});
