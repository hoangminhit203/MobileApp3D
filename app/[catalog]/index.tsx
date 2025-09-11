import ProductItem from "@/components/ProductItem";
import { useCatalog } from '@/hooks/useCatalog';
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { catalog, catalogId } = useLocalSearchParams<{ catalog: string, catalogId: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const { items, loading } = useCatalog();
  const checkFilter = items.filter((item) => item.typeId === catalogId) // find item 
  const router = useRouter();

  return (
    <SafeAreaView edges={['top','left','right']} className="flex-1 bg-red-300 pt-4">
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
        {/* Tags Content */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {categories.length > 0
            ? categories.slice(0, 5).map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className="bg-white px-4 py-2 rounded-full mr-2"
              >
                <Text className="text-gray-700">{cat.name}</Text>
              </TouchableOpacity>
            ))
            : ["Bench", "Beds", "Kitchens"].map((tag) => (
              <TouchableOpacity
                key={tag}
                className="bg-white px-4 py-2 rounded-full mr-2"
              >
                <Text className="text-gray-700">{tag}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Products Content */}
      <ScrollView
        className="py-5 px-3 rounded-t-3xl bg-white pb-5"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="flex-row flex-wrap justify-center gap-3">
          {checkFilter.map((item) => (
            <ProductItem
              key={item._id}
              href={catalog}
              id={item._id}
              name={item.name}
              imageUrl={item.properties.product?.item3D.files?.poster}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
