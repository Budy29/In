import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  DrawerHome,
  DrawerBarang,
  DrawerDokumen,
  DrawerDolasrs,
  DrawerLaporan,
  DrawerLogout,
} from '../asset';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');
  // const accessToken = useAuthStore(state => state.accessToken)
  // const Logout = () => {
  //   accessToken("");
  //   navigation.navigate('Login')
  // };

  return (
    <View style={{ flex: 1, paddingTop: 0, paddingHorizontal: 0 }}>
      <View
        style={{
          backgroundColor: '#B9E1D3',
          width: '100%',
          height: '20%',
          justifyContent: 'center',
          paddingHorizontal: '5%',
          paddingBottom: '5%',
          alignItems: 'center',
        }}>
        {/* <Text
          style={{
            color: '#000000',
            fontSize: 32,
            fontWeight: '400',
            fontFamily: 'Fredoka-Bold',
          }}>
          userprofile.name
        </Text> */}
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          style={styles.btn}>
          <DrawerHome />
          <Text style={styles.btn_title}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Barang' as never)}
          style={styles.btn}>
          <DrawerBarang />
          <Text style={styles.btn_title}>Barang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dokumen' as never)}
          style={styles.btn}>
          <DrawerDokumen />
          <Text style={styles.btn_title}>Dokumen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Biaya' as never)}
          style={styles.btn}>
          <DrawerDolasrs />
          <Text style={styles.btn_title}>Biaya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Laporan' as never)}
          style={styles.btn}>
          <DrawerLaporan />
          <Text style={styles.btn_title}>Laporan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <DrawerLogout />
          <Text style={styles.btn_title}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawer;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    width: '100%',
    height: '50%',
    marginTop: '10%',
  },
  btn: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '100%',
    height: 50,
    paddingLeft: 40,
    alignItems: 'center',
    marginTop: '5%',
  },
  btn_title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 20,
    marginLeft: '10%',
    color: '#000000',
  },
});
function useAuthStore(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}
