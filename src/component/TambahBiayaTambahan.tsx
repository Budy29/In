import React from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet, TextInput } from "react-native";
import { Cancel } from "../asset";
import { useNavigation } from "@react-navigation/native";

const App = () => {
    const navigation = useNavigation();
    return (
        <Modal style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Cancel />
                </TouchableOpacity>
                <Text style={styles.title}>Tambahkan Barang</Text>
            </View>
            <View style={styles.container_Box}>
                <TextInput placeholder="Nama Barang" placeholderTextColor='#000000' style={styles.input} />
                <TextInput placeholder="Harga" placeholderTextColor='#000000' style={styles.input} />
                <TextInput placeholder="Keterangan" placeholderTextColor='#000000' style={styles.input} />
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnTitle}>Simpan</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
export default App;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    container_header: {
        backgroundColor: '#B9E1D3',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%'

    },
    container_Box: {
        width: '100%',
        // backgroundColor: 'red',
        height: '40%',
        alignItems: 'center',
        marginTop: '10%'
    },
    title: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 20,
        fontWeight: '400',
        marginLeft: '20%',
        marginTop: '8%',
        color: '#FFFFFF'

    },
    input: {
        // backgroundColor: '#FFFFFF',
        width: '85%',
        borderBottomWidth: 2,
        paddingTop: '1%',
        fontSize: 20,
        fontFamily: 'Fredoka-Bold',
        color: '#000000',
        marginTop: '5%'
    },
    btn: {
        backgroundColor: '#D9D9D9',
        width: '85%',
        height: 60,
        borderRadius: 5,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTitle: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 20,
        fontWeight: '400',
        color: '#000000'


    }
});
