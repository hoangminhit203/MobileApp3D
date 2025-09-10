import ForUItem from "@/components/ForUItem";
import seed from "@/interfaces/seedData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //     async function loadData() {
  //         try {
  //             setLoading(true);

  //             // Fetch categories for the filter tags
  //             const categoriesData = await fetchAllCategories();
  //             setCategories(categoriesData);

  //             // Fetch items by category if category is provided
  //             if (category) {
  //                 const itemsData = await fetchItemsByCategory(category);
  //                 setItems(itemsData);
  //             } else {
  //                 // Fallback to seed data if no category specified
  //                 const products = seed.find(
  //                     (item) => item.route.toLowerCase() === category?.toLowerCase()
  //                 );
  //                 setItems(products?.data || []);
  //             }
  //         } catch (err: any) {
  //             console.error("Failed to fetch data:", err);
  //             setError(err.message);

  //             // Fallback to seed data on error
  //             const products = seed.find(
  //                 (item) => item.route.toLowerCase() === category?.toLowerCase()
  //             );
  //             setItems(products?.data || []);
  //         } finally {
  //             setLoading(false);
  //         }
  //     }

  //     loadData();
  // }, [category]);

  const products = seed.find(
    (item) => item.route.toLowerCase() === category?.toLowerCase()
  );
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

      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500">Error: {error}</Text>
            <Text className="text-gray-500 mt-2">Showing cached data</Text>
          </View>
        ) : null}

        <ScrollView
          className="py-5 px-3 rounded-t-3xl bg-white pb-5"
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View className="flex-row flex-wrap justify-center gap-3">
            {products?.data.map((item) => (
              <ForUItem
                key={item.id}
                route={category}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
