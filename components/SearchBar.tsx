import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, QrCodeIcon } from "react-native-heroicons/outline";

export default function SearchBar() {
    return (
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm">
            {/* Icon Search */}
            <MagnifyingGlassIcon size={20} color="gray" />

            {/* Input */}
            <TextInput
                placeholder="Search"
                placeholderTextColor="gray"
                className="flex-1 px-2 text-base text-gray-700"
            />

            {/* Icon QR Code */}
            <TouchableOpacity>
                <QrCodeIcon size={22} color="gray" />
            </TouchableOpacity>
        </View>
    );
}
