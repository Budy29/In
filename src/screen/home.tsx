import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Book, Box, ReportAtivity, Dollars, Menu, Add_icon } from '../asset';
import {
  useNavigation,
  DrawerActionType,
  DrawerActions,
} from '@react-navigation/native';
import { Category } from '../constants/Model';
import { useAuthStore } from '../stores/useAuthStore';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import { useCategoryStore } from '../stores/useInventoryStore';

const App: React.FC = ({ drawerRef }) => {

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Category[]>([]);

  const { categories, setCategories } = useCategoryStore()

  const accessToken = useAuthStore(state => state.accessToken);

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
      console.log("response", response)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };


  // const getUserProfile = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`${BASE_API_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     setIsLoading(false);
  //     console.log(response.data.messages.data);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getCategories();
    // getUserProfile();
  }, []);
  console.log('AKSES Token', accessToken)

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        {/* <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} > */}
        <TouchableOpacity

          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Menu
            onPress={() => navigation.navigate('Drawer')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container_Box}>
        <View
          style={{
            width: '100%',
            height: '50%',
            flexDirection: 'row',
            padding: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Barang' as never)}
            style={{
              width: '45%',
              height: '100%',
              backgroundColor: '#B9E1D3',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box />
            <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800' }}>
              Barang
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dokumen' as never)}
            style={{
              width: '45%',
              height: '100%',
              backgroundColor: '#44E7AC',
              marginLeft: '5%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Book style={{ marginTop: '5%' }} />
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                fontWeight: '800',
                marginTop: '5%',
              }}>
              Dokumen
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: '50%',
            flexDirection: 'row',
            padding: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Biaya' as never)}
            style={{
              width: '45%',
              height: '100%',
              backgroundColor: '#44E7AC',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-10%',
            }}>
            <Dollars style={{ marginTop: '5%' }} />
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                fontWeight: '800',
                marginTop: '2%',
              }}>
              Biaya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Laporan' as never)}
            style={{
              width: '45%',
              height: '100%',
              backgroundColor: '#B9E1D3',
              marginLeft: '5%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-10%',
            }}>
            <ReportAtivity />
            <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800' }}>
              Laporan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container_Category}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '10%',
            width: '100%',
            height: '7%',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: '800' }}>
            Category
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TambahKategori' as never)}
            style={{
              marginLeft: '52%',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Add_icon style={{ marginLeft: '0%' }} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.box_scrol}>
          {categories.map(item => (
            <View style={styles.conten_scrol} key={item.id}>
              <Text style={styles.conten_title}>{item.nama_kategori}</Text>
              <Text style={styles.conten_title_tgl}>{item.created_at}</Text>
              <Text style={styles.conten_category}>
                Keterangan: {item.keterangan == '' ? '-' : item.keterangan}
              </Text>
            </View>
          ))}
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
  },
  container_header: {
    width: '100%',
    height: 70,
    // backgroundColor: '#B9E1D3',
    justifyContent: 'center',
    paddingLeft: '8%',
  },
  container_Box: {
    width: '100%',
    height: '35%',
    // backgroundColor: 'yellow',
    // padding: '8%',
  },
  container_Category: {
    width: '100%',
    // backgroundColor: '#B9E1',
    height: '55%',
  },
  box_scrol: {
    width: '100%',
    // backgroundColor: '#B9E1D3',
  },
  conten_scrol: {
    // backgroundColor: 'red',
    width: '85%',
    height: 140,
    marginTop: '3%',
    borderRadius: 20,
    marginLeft: '7%',
    borderWidth: 1,
  },
  conten_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '8%',
    marginTop: '3%',
  },
  conten_title_tgl: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: '8%',
    marginTop: '3%',
  },
  conten_category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: '8%',
  },
  conten_user: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: '8%',
    marginTop: '3%',
  },
});
