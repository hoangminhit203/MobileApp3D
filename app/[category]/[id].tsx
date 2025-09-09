import seed from "@/interfaces/seedData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="bg-white">
        {/* Img area */}
        <View className="relative">
          <Image
            source={{ uri: product.imageUrl }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute mt-3 left-4 bg-white/80 p-2 rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className="p-4 rounded-t-3xl bg-red-500">
          <Text className="text-3xl uppercase font-bold mt-5 mb-1">{product.title}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
