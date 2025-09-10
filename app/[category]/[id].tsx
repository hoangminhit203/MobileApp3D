import seed from "@/interfaces/seedData";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const { category, id } = useLocalSearchParams<{
    category: string;
    id: string;
  }>();

  // Find products by category
  const products = seed.find(
    (item) => item.route.toLowerCase() === category?.toLowerCase()
  );
  // Find product by id
  const product = products?.data.find(
    (item) => item.id.toLowerCase() === id?.toLowerCase()
  );
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "100%"], []);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Background */}
      <Image
        source={{ uri: product.imageUrl }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Nút back */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 bg-white/80 p-2 rounded-full z-10"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // mở mặc định ở 50%
        snapPoints={snapPoints}
        backgroundStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        >
          <Text className="text-3xl uppercase font-bold mt-5 mb-1">
            {product.title}
          </Text>
          <Text className="text-gray-500 mb-4">{product.code}</Text>

          <View className="flex-row justify-between mb-6 px-4">
            <View className="items-center">
              <Ionicons name="person-outline" size={20} color="gray" />
              <Text className="text-md">x1</Text>
            </View>
            <View className="items-center">
              <Ionicons name="trending-up-outline" size={20} color="gray" />
              <Text className="text-md">10</Text>
            </View>
            <View className="items-center">
              <Ionicons name="time-outline" size={20} color="gray" />
              <Text className="text-md">1m</Text>
            </View>
            <View className="items-center">
              <Ionicons name="layers-outline" size={20} color="gray" />
              <Text className="text-md">10</Text>
            </View>
            <View className="items-center">
              <Ionicons name="construct-outline" size={20} color="gray" />
              <Text className="text-md">1</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-green-500 py-3 rounded-xl mb-6">
            <Text className="text-center text-white font-bold text-lg">
              BUILD AGAIN
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-700 leading-6">{product.description}</Text>
        </BottomSheetScrollView>
      </BottomSheet>
          

    </SafeAreaView>
  );
}
