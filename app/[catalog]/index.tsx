import ProductItem from "@/components/ProductItem";
import { images } from "@/constants/images";
import { useCatalog } from "@/hooks/useCatalog";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { catalog, catalogId } = useLocalSearchParams<{
    catalog: string;
    catalogId: string;
  }>();
  const [categories, setCategories] = useState<any[]>([]);
  const { items, loading } = useCatalog();
  const checkFilter = items.filter((item) => item.typeId === catalogId); // find item
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1  pt-4"
    >
      <Image source={images.bg} className="absolute w-full h-full" />
      {/* Header */}
      <View className="pb-10 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="flex-1 text-3xl font-bold text-white text-center">
            {catalog?.charAt(0).toUpperCase() + catalog?.slice(1)}
          </Text>
        </View>
      </View>

      {/* Products Content */}
      <ScrollView
        className="py-5 px-3 rounded-t-3xl bg-bgColor pb-5"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="flex-row flex-wrap justify-center gap-3">
          {checkFilter.map((item) => (
            <ProductItem
              key={item._id}
              href={catalog}
              id={item._id}
              name={item.properties.product?.item3D.name}
              imageUrl={item.properties.product?.item3D.files?.poster}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
