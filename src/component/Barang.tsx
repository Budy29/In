import React from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet, TextInput, ScrollView, Image } from "react-native";
import { Add_icon, Cancel, IconLeft } from "../asset";
import { useNavigation } from "@react-navigation/native";

const App = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <IconLeft />
                </TouchableOpacity>
                <View style={{ width: '80%', left: '10%', alignItems: 'center' }}>
                    <Text style={styles.title}>Barang</Text>
                </View>
            </View>
            <View style={styles.container_Box}>
                <ScrollView style={styles.containerScrool}>
                    <View style={styles.contentProduk}>
                        <View style={styles.Imageview}>
                            <Image source={{}} style={styles.Image} />
                        </View>
                        <View style={{ marginLeft: '4%', width: '60%', justifyContent: 'center' }}>
                            <Text style={styles.titleProduk}>Pelembab Kulit</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.produkIsi}>Barcode</Text>
                                <Text style={styles.produkIsi}>.</Text>
                                <Text style={styles.produkIsi}>Kode Barang</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.produkIsi}>Harga</Text>
                                <Text style={styles.produkIsi}>.</Text>
                                <Text style={styles.produkIsi}>Kategori</Text>
                            </View>
                            <Text style={styles.produkIsi}>Catatan</Text>
                        </View>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.stock}> Stock</Text>
                        </View>
                    </View>
                    <View style={styles.contentProduk}>
                        <View style={styles.Imageview}>
                            <Image source={{}} style={styles.Image} />
                        </View>
                        <View style={{ marginLeft: '4%', width: '60%', justifyContent: 'center' }}>
                            <Text style={styles.titleProduk}>Pelembab Kulit</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.produkIsi}>Barcode</Text>
                                <Text style={styles.produkIsi}>.</Text>
                                <Text style={styles.produkIsi}>Kode Barang</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.produkIsi}>Harga</Text>
                                <Text style={styles.produkIsi}>.</Text>
                                <Text style={styles.produkIsi}>Kategori</Text>
                            </View>
                            <Text style={styles.produkIsi}>Catatan</Text>
                        </View>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.stock}> Stock</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('TambahBarang')} style={styles.addProduk}>
                    <Add_icon />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default App;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    container_header: {
        backgroundColor: '#44E7AC',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%'

    },
    container_Box: {
        width: '100%',
        // backgroundColor: 'red',
        height: '93%',


    },
    title: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 20,
        fontWeight: '400',
        // marginLeft: '30%',
        marginTop: '8%',
        color: '#FFFFFF'

    },
    containerScrool: {
        width: '100%',
        maxHeight: '96%',
        // backgroundColor: 'green'
    },
    contentProduk: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 83,
        marginTop: '2%',
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
        paddingLeft: '5%',

    },
    Imageview: {
        backgroundColor: '#D9D9D9',
        width: 45,
        height: 45,
        borderRadius: 100,
        maxWidth: 45,
        maxHeight: 45,
        marginTop: 20
    },
    Image: {
        width: 45,
        height: 45,
        borderRadius: 100,
        maxHeight: 45,
        maxWidth: 45
    },
    titleProduk: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 16,
        fontWeight: '400',
        color: '#000000'
    },
    produkIsi: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 12,
        fontWeight: '400',
        color: '#000000'
    },
    stock: {
        fontFamily: 'Fredoka-Bold',
        fontSize: 14,
        fontWeight: '400',
        color: '#000000'
    },
    addProduk: {
        width: 70,
        height: 70,
        backgroundColor: '#D9D9D9',
        zIndex: 3,
        marginLeft: '75%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-25%'
    }
});
