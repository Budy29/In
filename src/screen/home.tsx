import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Book, Box, ReportAtivity, Dollars, Menu, Add_icon } from "../asset";
import { useNavigation, DrawerActionType, DrawerActions } from "@react-navigation/native";


const App = () => {
    const navigation = useNavigation();
    const open = () => {
        navigation.navigate('Drawer');
    }
    // const [modalKategori, setModalKategori] = useState('');
    // const openModal = (volume, id) => {
    //     setModalKategori(true);
    // };

    return (
        <View style={styles.container}>
            <View style={styles.container_header}>
                {/* <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} > */}
                <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                    <Menu onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </TouchableOpacity>
            </View>
            <View style={styles.container_Box}>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row', padding: '5%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Barang')} style={{ width: '45%', height: '100%', backgroundColor: '#B9E1D3', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Box />
                        <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800' }}>Barang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Dokumen')} style={{ width: '45%', height: '100%', backgroundColor: '#44E7AC', marginLeft: '5%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Book style={{ marginTop: '5%' }} />
                        <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800', marginTop: '5%' }}>Dokumen</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row', padding: '5%', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biaya')} style={{ width: '45%', height: '100%', backgroundColor: '#44E7AC', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: '-10%' }}>
                        <Dollars style={{ marginTop: '5%' }} />
                        <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800', marginTop: '2%' }}>Biaya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Laporan')} style={{ width: '45%', height: '100%', backgroundColor: '#B9E1D3', marginLeft: '5%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: '-10%' }}>
                        <ReportAtivity />
                        <Text style={{ color: '#000000', fontSize: 24, fontWeight: '800' }}>Laporan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container_Category}>
                <View style={{ flexDirection: 'row', marginLeft: '10%', width: '100%', height: '7%', alignItems: 'center' }}>
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: '800' }}>Category</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TambahKategori')} style={{ marginLeft: '52%', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Add_icon style={{ marginLeft: '0%' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.box_scrol}>
                    <View style={styles.conten_scrol}>
                        <Text style={styles.conten_title}>Kategori 1</Text>
                        <Text style={styles.conten_title_tgl}>24/09/2023</Text>
                        <Text style={styles.conten_category}>Lorem ipsum asdas asfajfjsb asdasfajbsf asdasfa asfasdasfasfasfasf safasfasfas</Text>
                        <Text style={styles.conten_user}>User</Text>
                    </View>
                    <View style={styles.conten_scrol}>
                        <Text style={styles.conten_title}>Kategori 2</Text>
                        <Text style={styles.conten_title_tgl}>24/09/2023</Text>
                        <Text style={styles.conten_category}>Lorem ipsum asdas asfajfjsb asdasfajbsf asdasfa asfasdasfasfasfasf safasfasfas</Text>
                        <Text style={styles.conten_user}>User</Text>
                    </View>
                    <View style={styles.conten_scrol}>
                        <Text style={styles.conten_title}>Kategori 3</Text>
                        <Text style={styles.conten_title_tgl}>24/09/2023</Text>
                        <Text style={styles.conten_category}>Lorem ipsum asdas asfajfjsb asdasfajbsf asdasfa asfasdasfasfasfasf safasfasfas</Text>
                        <Text style={styles.conten_user}>User</Text>
                    </View>
                    <View style={styles.conten_scrol}>
                        <Text style={styles.conten_title}>Kategori 4</Text>
                        <Text style={styles.conten_title_tgl}>24/09/2023</Text>
                        <Text style={styles.conten_category}>Lorem ipsum asdas asfajfjsb asdasfajbsf asdasfa asfasdasfasfasfasf safasfasfas</Text>
                        <Text style={styles.conten_user}>User</Text>
                    </View>
                </ScrollView>
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
        width: '100%',
        height: 70,
        // backgroundColor: '#B9E1D3',
        justifyContent: 'center',
        paddingLeft: '8%'
    },
    container_Box: {
        width: '100%',
        height: '35%',
        // backgroundColor: 'yellow',
        // padding: '8%',
    },
    container_Category: {
        width: '100%',
        // backgroundColor: '#B9E1',
        height: '55%',

    },
    box_scrol: {
        width: '100%',
        // backgroundColor: '#B9E1D3',
    },
    conten_scrol: {
        // backgroundColor: 'red',
        width: '85%',
        height: 140,
        marginTop: '3%',
        borderRadius: 20,
        marginLeft: '7%',
        borderWidth: 1
    },
    conten_title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginLeft: '8%',
        marginTop: '3%'
    },
    conten_title_tgl: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        marginLeft: '8%',
        marginTop: '3%'
    },
    conten_category: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        marginLeft: '8%',
    },
    conten_user: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        marginLeft: '8%',
        marginTop: '3%'
    }
});