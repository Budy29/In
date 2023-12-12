// drawerNavigation.js
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/home';
import Laporan from '../component/Laporan';
import Barang from '../component/Barang';

import CustomDrawer from './customeDrawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  // const drawerRef = React.useRef(null);
  return (


    <Drawer.Navigator
      initialRouteName="Home"
      // ref={drawerRef}
      drawerContent={(props: any) => <CustomDrawer {...props} />}>


      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Laporan"
        component={Laporan}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>

  );
}

export default DrawerNavigation;
