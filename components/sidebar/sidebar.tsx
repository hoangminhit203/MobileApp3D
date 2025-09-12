import { useCatalog } from '@/hooks/useCatelog';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThreeScene from "../../components/threeScene/threeScene";

const Model3dBuilder = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { items } = useCatalog();
    const router = useRouter();
    const [isMuted, setIsMuted] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    const product = items.find((item) => item._id === id);

    useEffect(() => {
        // Tự động xoay ngang khi vào trang
        const setLandscapeMode = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        };

        setLandscapeMode();

        // Theo dõi thay đổi orientation
        const handleOrientationChange = ({ orientationInfo }: { orientationInfo: ScreenOrientation.OrientationChangeEvent['orientationInfo'] }) => {
            const isLandscapeOrientation =
                orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
                orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
            setIsLandscape(isLandscapeOrientation);
        };

        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

        // Cleanup function
        return () => {
            subscription.remove();
            // Trở về portrait khi rời khỏi trang
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, []);

    const handleBackPress = async () => {
        // Trở về portrait trước khi quay lại
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        router.back();
    };

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-lg">Product not found</Text>
                <TouchableOpacity
                    onPress={handleBackPress}
                    className="mt-4 bg-green-400 px-6 py-3 rounded-xl"
                >
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            {isLandscape ? (
                // Layout ngang: chỉ giữ phần 3D Scene và thanh bar dưới
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-2 bg-black/80">
                        <TouchableOpacity
                            onPress={handleBackPress}
                            className="bg-white/20 p-2 rounded-full"
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>

                        <Text className="text-white text-lg font-bold flex-1 text-center mr-10">
                            {product.name} 3D Builder
                        </Text>
                    </View>

                    {/* 3D Scene */}
                    <View className="flex-1">
                        <ThreeScene modelPath={require('../../assets/model3d/ABB.glb')} />
                    </View>

                    {/* Bottom Info */}
                    <View className="bg-gray-200 p-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-orange-500 font-bold">Mattress</Text>
                            <Text className="text-gray-700 text-sm">
                                Add the mattress to the top or bottom pallets for comfortable seating.
                            </Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity onPress={handleBackPress}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="checkmark" size={24} color="orange" />
                            </TouchableOpacity>
                            <Text className="text-gray-700">10/10</Text>
                        </View>
                    </View>
                </View>
            ) : (
                // Layout dọc: chỉ giữ phần 3D Scene và thanh bar dưới
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-2 bg-black/80">
                        <TouchableOpacity
                            onPress={handleBackPress}
                            className="bg-white/20 p-2 rounded-full"
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>

                        <Text className="text-white text-lg font-bold flex-1 text-center mr-10">
                            {product.name} 3D Builder
                        </Text>
                    </View>

                    {/* 3D Scene */}
                    <View className="flex-1">
                        <ThreeScene modelPath={require('../../assets/model3d/ABB.glb')} />
                    </View>

                    {/* Bottom Info */}
                    <View className="bg-gray-200 p-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-orange-500 font-bold">Mattress</Text>
                            <Text className="text-gray-700 text-sm">
                                Add the mattress to the top or bottom pallets for comfortable seating.
                            </Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity onPress={handleBackPress}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="checkmark" size={24} color="orange" />
                            </TouchableOpacity>
                            <Text className="text-gray-700">10/10</Text>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Model3dBuilder;

const styles = StyleSheet.create({});