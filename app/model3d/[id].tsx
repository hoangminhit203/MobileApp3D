import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Model3dDetails = () => {
    const { id } = useLocalSearchParams();
    return (
        // Dùng id này để hiện từng sản phẩm 3d lên cho app mobile
        <View>
            <Text>Product Details: {id} </Text>
        </View>
    )
}
export default Model3dDetails
const styles = StyleSheet.create({});