import seed from "@/interfaces/seedData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Detail() {
    const { category, id } = useLocalSearchParams<{ category: string, id: string }>();
    const products = seed.find(
        (item) => item.route.toLowerCase() === category?.toLowerCase()
    );
    const product = products?.data.find(
        (item) => item.id.toLowerCase() === id?.toLowerCase()
    )
    const router = useRouter();


    if (!product) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>{category}</Text>
                <Text>{id}</Text>
                <Text className="text-gray-500">Product not found</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="relative">
                <Image
                    source={{ uri: product.imageUrl }}
                    className="w-full h-72"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
                >
                </TouchableOpacity>
            </View>

            <View className="p-4">
                <Text className="text-2xl font-bold mb-1">{product.title}</Text>
                <Text className="text-gray-500 mb-4">{product.code}</Text>

                <View className="flex-row justify-between mb-6">
                    <View className="items-center">
                        <Text className="text-sm">x1</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-sm">10</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-sm">1m</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-sm">10</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-sm">1</Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-green-500 py-3 rounded-xl mb-6">
                    <Text className="text-center text-white font-bold text-lg">
                        BUILD AGAIN
                    </Text>
                </TouchableOpacity>

                <Text className="text-gray-700 leading-6">
                    {product.description}
                </Text>
            </View>
        </ScrollView>
    );
}