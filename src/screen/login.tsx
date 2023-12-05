import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Wave1, Wave3 } from "../asset";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../constants/consta";
import axios from "axios";

const App = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = () => {
    //     fetch(API_URL + "login", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email, password }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };


    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://api-inventory.drabsky.com/login", {
                email,
                password
            })
            console.log(response)
            navigation.navigate('Home')
        } catch (error: any) {
            console.log(error.response.data.message)
            Alert.alert(error.response.data.message)
        }
    }
    return (
        <View style={styles.container}>
            <Wave3 style={{ top: '-1%', }} />
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.containerBoxInput}>
                <TextInput placeholder="Email" style={styles.input} onChangeText={e => setEmail(e)} />
                <TextInput placeholder="Password" style={styles.input} onChangeText={e => setPassword(e)} />
                <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={styles.btnTitle}>Login</Text></TouchableOpacity>
            </View>
            <Wave1 />

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
        flex: 1
    },
    containerTitle: {
        marginTop: '25%'
    },
    title: {
        fontSize: 32,
        color: '#000000',
        fontWeight: 'bold'
    },
    containerBoxInput: {
        width: '100%',
        height: '20%',
        maxHeight: '20%',
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '30%'

    },

    input: {
        width: '80%',
        height: 64,
        marginTop: 10,
        borderRadius: 5,
        borderBottomWidth: 3,
        fontSize: 20,
        fontWeight: '700',
        color: '#000000'
    },
    btn: {
        backgroundColor: '#B9E1D3',
        width: '40%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: '10%',
        // zIndex: 1,
        marginBottom: '4%'
    },
    btnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    }



});