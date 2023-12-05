import { useEffect, useState, useRef } from 'react';
import React from "react";
import {
    View, Text, StyleSheet, Animated,
    Easing, Image
} from 'react-native'
import { LogoSplash } from '../asset';

import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';



const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Scr');
        }, 2000);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        return () => clearTimeout(timer);
    }, [fadeAnim, navigation]);
    return (
        <View style={styles.container}>
            <Animated.View>
                <LogoSplash style={{ left: '10%', top: '120%', }} />
            </Animated.View>
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 21, height: 21, borderRadius: 100, position: 'relative', marginLeft: '80%', marginTop: '-50%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 152, height: 146, borderRadius: 100, position: 'relative', marginLeft: '100%', marginTop: '30%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 181, height: 181, borderRadius: 100, position: 'relative', marginTop: '96%', marginRight: '70%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 40, height: 40, top: '5%', position: 'absolute', borderRadius: 100, }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 152, height: 146, borderRadius: 100, position: 'absolute', left: '-10%', top: '10%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 75, height: 75, borderRadius: 100, position: 'absolute', left: '60%', top: '15%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 75, height: 75, borderRadius: 100, position: 'absolute', left: '0%', top: '35%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 21, height: 21, borderRadius: 100, position: 'absolute', left: '65%', top: '62%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 21, height: 21, borderRadius: 100, position: 'absolute', left: '20%', top: '65%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 40, height: 40, borderRadius: 100, position: 'absolute', left: '35%', top: '70%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 40, height: 40, borderRadius: 100, position: 'absolute', left: '65%', top: '80%' }} />
            <Animated.View style={{ backgroundColor: '#B9E1D3', width: 192, height: 70, position: 'relative', justifyContent: 'center', alignItems: 'center', top: '-30%', left: '27%', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}>
                <Text style={{ fontSize: 32, color: '#FFFFFF', fontWeight: '400', fontFamily: 'FaguazOne-Reguler' }}>Let's Go</Text>
            </Animated.View>
        </View>
    );
};

export default App;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})
