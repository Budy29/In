import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogoAwal } from "../asset";
import { useNavigation } from "@react-navigation/native";

const App = () => {
    const navigation = useNavigation();
    const handleCreateAccountPress = () => {
        navigation.navigate('Signup'); // Navigasi ke halaman SignUp
    }

    const handleLoginPress = () => {
        navigation.navigate('Login'); // Navigasi ke halaman Login
    }
    return (
        <View style={styles.container}>
            <View style={styles.titel}>
                <Text style={styles.title}>Inevntory App</Text>
            </View>
            <View style={styles.logo}>
                <LogoAwal />
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleCreateAccountPress}>
                <Text style={styles.titleBtn} >Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={handleLoginPress}>
                <Text style={styles.titleBtn}>Login</Text >
            </TouchableOpacity>

        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    titel: {
        marginTop: '48%'
    },
    title: {
        fontFamily: 'FugazeOne-Reguler',
        fontSize: 32,
        fontWeight: '900',
        color: '#000000'
    },
    logo: {
        marginTop: '10%',
        marginBottom: '10%'
    },
    btn: {
        width: '55%',
        backgroundColor: '#B9E1D3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 58,
        borderRadius: 10,
        marginBottom: '5%'
    },
    btn2: {
        width: '55%',
        backgroundColor: '#B9E1D3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 58,
        borderRadius: 10
    },
    titleBtn: {
        color: '#000000',
        fontSize: 24,
        fontFamily: 'Fredoka-Regular',
        fontWeight: 'bold'
    }

});