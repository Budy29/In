// drawerNavigation.js
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/home';

import CustomDrawer from './customeDrawer';


const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName='Home'
        // drawerContent={(props) => <CustomDrawer {...props} />}
        >
            { }

        </Drawer.Navigator>
        // <Drawer.Navigator initialRouteName="Home">
        // </Drawer.Navigator>
    );
}

export default DrawerNavigation;
