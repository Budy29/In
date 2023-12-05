import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './drawerNavigator';
import Splace from '../component/splash';
import Login from '../screen/login';
import Signup from '../screen/signup';
import Scr from '../screen/scrn';
import Drawer from './drawerNavigator';
import Home from '../screen/home'



const Stack = createNativeStackNavigator();

function Navigation() {
    return (

        <Stack.Navigator
            initialRouteName='Splace'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'none'
            }}
        >
            <Stack.Screen name='Splace' component={Splace} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='Scr' component={Scr} options={{ headerShown: false }} />
            <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Drawer" component={DrawerNavigation} /> */}
        </Stack.Navigator>

    );
}

export default Navigation;