import * as React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './drawerNavigator';
import Splace from '../component/splash';
import Login from '../screen/login';
import Signup from '../screen/signup';
import Scr from '../screen/scrn';
import Barang from '../component/Barang';
import Dokumen from '../screen/Document';
import Laporan from '../component/Laporan';
import Biaya from '../component/BiayaTambahan';
import BiayaTambahan from '../component/TambahBiayaTambahan';
import TambahKategiori from '../component/TambahKategori';
import TambahBarang from '../component/TambahBarang';
// import Drawer from './drawerNavigator';

import Home from '../screen/home';
import TabDocument from '../screen/TabDocument';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splace"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'none',
      }}>
      <Stack.Screen
        name="Splace"
        component={Splace}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Scr" component={Scr} options={{headerShown: false}} />
      <Stack.Screen
        name="Barang"
        component={Barang}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dokumen"
        component={TabDocument}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Biaya"
        component={Biaya}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BiayaTambahan"
        component={BiayaTambahan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahKategori"
        component={TambahKategiori}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahBarang"
        component={TambahBarang}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Drawer" component={DrawerNavigation} /> */}
    </Stack.Navigator>
  );
}

export default Navigation;
