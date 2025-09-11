import { useCatalog } from '@/hooks/useCatelog';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThreeScene from "../../components/threeScene/threeScene";


const Model3dDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { items } = useCatalog();
    const router = useRouter();

    const product = items.find((item) => item._id === id);

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-lg">Product not found</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-green-400 px-6 py-3 rounded-xl"
                >
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-2 bg-black/80">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white/20 p-2 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <Text className="text-white text-lg font-bold flex-1 text-center mr-10">
                    {product.name} 3D Model
                </Text>
            </View>

            {/* 3D Scene */}
            <View className="flex-1">
                <ThreeScene modelPath={require('../../assets/model3d/ABB.glb')} />
            </View>

            {/* Bottom Info */}
            <View className="bg-black/80 p-4">
                <Text className="text-white text-center text-sm opacity-70">
                    Drag to rotate • Pinch to zoom • Two fingers to pan
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Model3dDetails

const styles = StyleSheet.create({});