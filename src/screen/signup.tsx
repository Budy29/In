import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { Wave1, Wave2 } from "../asset";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";



const App = () => {

    const { width, height } = Dimensions.get('window');


    const [namaKaryawan, setNamaKaryawan] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigation = useNavigation();

    const [message, setMessage] = useState({
        password: "",
        confirm_password: ""
    })

    const handleSubmit = async () => {
        console.log("loading true")
        try {
            const response = await axios.post("https://api-inventory.drabsky.com/register", {
                nama: namaKaryawan,
                username: username,
                email: email,
                password: password,
                password_confirm: confirmPassword
            })
            console.log(response)
            Alert.alert("Registrasi Berhasil")
            navigation.navigate('Scr')
            console.log("loading false")
        } catch (error: any) {
            console.log("loading false")
            const errors = error.response.data.errors;

            let errorMessages = '';
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    if (errors[key] == 'The password field must be at least 8 characters in length.') {
                        errorMessages += `Password kurang dari 8 karakter\n`;
                    } else {
                        errorMessages += `${errors[key]}\n`;
                    }
                }
            }
            Alert.alert('Error', errorMessages);
        }
    }

    // const handleSubmit = async () => {
    //     console.log("loading true")
    //     await axios.post("https://api-inventory.drabsky.com/register", {
    //                 nama: namaKaryawan,
    //                 username: username,
    //                 email: email,
    //                 password: password,
    //                 password_confirm: confirmPassword
    //             })
    //             .then(res => {
    //                 console.log(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 Alert.alert(message.password)
    //             })
    // }


    return (
        <View style={styles.container}>
            <Wave2 />
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Daftar</Text>
            </View>
            <View style={styles.containerBoxInput}>
                <TextInput placeholder="Nama Karyawan" style={styles.input1} onChangeText={text => setNamaKaryawan(text)} />
                <TextInput placeholder="Username" style={styles.input} onChangeText={text => setUsername(text)} />
                <TextInput placeholder="Email" style={styles.input1} onChangeText={text => setEmail(text)} />
                <TextInput placeholder="Password" style={styles.input} onChangeText={text => setPassword(text)} />
                <TextInput placeholder="Konfirmasi Password" style={styles.input1} onChangeText={text => setConfirmPassword(text)} />
                <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text style={styles.btnTitle} >Daftar</Text>
                </TouchableOpacity>
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
        marginTop: '5%'
    },
    title: {
        fontSize: 32,
        color: '#000000',
        fontWeight: 'bold'
    },
    containerBoxInput: {
        width: '100%',
        // backgroundColor: 'red',
        height: '40%',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '15%'
    },
    input1: {
        width: '80%',
        height: 60,
        backgroundColor: '#E6E6E6',
        marginTop: '1%',
        borderRadius: 5,
        borderBottomWidth: 3,
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    input: {
        width: '80%',
        height: 60,
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
        marginBottom: '0%'


    },
    btnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    }



});