import ForUItem from "@/components/ForUItem";
import { useCatalog } from '@/hooks/useCatelog';
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { category, _id } = useLocalSearchParams<{ category: string, _id: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const { items, loading } = useCatalog();
  const checkFilter = items.filter((item) => item.typeId === _id) // find item 
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-red-300">
      {/* Header */}
      <View className="pb-10 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="flex-1 text-3xl font-bold text-white text-center">
            {category?.charAt(0).toUpperCase() + category?.slice(1)}
          </Text>
        </View>

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
            : ["Bench", "Beds", "Kitchens", "Tables", "Chairs"].map((tag) => (
              <TouchableOpacity
                key={tag}
                className="bg-white px-4 py-2 rounded-full mr-2"
              >
                <Text className="text-gray-700">{tag}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>


      <ScrollView
        className="py-5 px-3 rounded-t-3xl bg-white pb-5"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap justify-center gap-3">
          {checkFilter.map((item) => (
            <ForUItem
              key={item._id}
              route={category}
              id={item._id}
              title={item.name}
              imageUrl={item.properties.product?.item3D.files?.poster}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
