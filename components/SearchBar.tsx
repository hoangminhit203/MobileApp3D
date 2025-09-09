import { icons } from "@/constants/icons";
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = () => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full pl-3 py-4 mr-auto ml-4 max-w-xs">
            <Image
                source={icons.search}
                className="w-4 h-4"
                resizeMode="center"
                style={{ tintColor: "#ffffff" }}
            />
            <TextInput
                placeholder="Search"
                placeholderTextColor="#ffffff"
                value=""
                onChangeText={() => { }}
                className="flex-1 ml-2 text-white"
                style={{ color: '#ffffff' }}
            />
        </View>
    )
}
export default SearchBar;
