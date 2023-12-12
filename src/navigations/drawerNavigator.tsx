// drawerNavigation.js
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screen/home';
import Laporan from '../component/Laporan';
import Barang from '../component/Barang';

import CustomDrawer from './customeDrawer';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: any) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
