import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const CustomDrawer = () => {
    return (
        <View style={{ flex: 1, paddingTop: 0, paddingHorizontal: 0 }}>
            <View style={{ backgroundColor: '#B9E1D3', width: '100%', height: '20%', justifyContent: 'center', paddingHorizontal: '5%', paddingBottom: '5%', alignItems: 'center' }}>
                <Text style={{ color: '#000000', fontSize: 32, fontWeight: '400', fontFamily: 'Fredoka-Bold' }}>Okkey_Shop</Text>
            </View>
            {/* <View style={styles.container}>

            </View> */}
        </View>
    );
};

export default CustomDrawer;
const styles = StyleSheet.create({
    container: {

    }
})
