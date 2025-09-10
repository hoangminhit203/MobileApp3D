import { searchItems } from "@/Service/itemService";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, QrCodeIcon } from "react-native-heroicons/outline";

interface SearchBarProps {
    onSearchResults?: (results: any[]) => void;
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            setIsSearching(true);
            const results = await searchItems(searchQuery);

            if (onSearchResults) {
                onSearchResults(results);
            } else {
                // Navigate to search results page
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = () => {
        handleSearch();
    };

    return (
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm mb-4">
            {/* Icon Search */}
            <TouchableOpacity onPress={handleSearch} disabled={isSearching}>
                <MagnifyingGlassIcon size={20} color={isSearching ? "#ccc" : "gray"} />
            </TouchableOpacity>

            {/* Input */}
            <TextInput
                placeholder="Search products..."
                placeholderTextColor="gray"
                className="flex-1 px-2 text-base text-gray-700"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                editable={!isSearching}
            />

            {/* Icon QR Code */}
            <TouchableOpacity>
                <QrCodeIcon size={22} color="gray" />
            </TouchableOpacity>
        </View>
    );
}
