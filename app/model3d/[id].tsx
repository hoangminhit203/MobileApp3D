import ThreeScene from "@/components/threeScene/step/threeeScene";
import { useCatalog } from "@/hooks/useCatalog";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Model3dDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { items, loading } = useCatalog();
    const router = useRouter();

    // 👉 Lock ngang khi vào, về dọc khi thoát
    useEffect(() => {
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );

        return () => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        };
    }, []);

    const product = items.find((item) => item._id === id);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="green" />
                <Text className="mt-4 text-lg">Đang tải model 3D...</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <Text className="text-gray-500 text-lg">Không tìm thấy sản phẩm</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-green-600 py-2 px-6 rounded-lg"
                >
                    <Text className="text-white font-bold">Quay lại</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 bg-white/10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white/20 p-2 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <Text
                    className="text-white text-lg font-bold flex-1 text-center mx-4"
                    numberOfLines={1}
                >
                    {product.properties.product?.item3D.name}
                </Text>

                <View className="w-10" />
            </View>

            {/* 3D Model Viewer */}
            <View className="flex-1">
                <ThreeScene
                    itemId={id}
                    enableDebug={__DEV__}
                />
            </View>

            {/* Bottom Controls */}
            <View className="p-4 bg-white/10">
                <Text className="text-white text-center text-sm opacity-75">
                    Vuốt để xoay • Chụm để phóng to/thu nhỏ
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Model3dDetails;
