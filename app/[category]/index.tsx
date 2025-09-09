import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import { ForUItem } from "@/components";
import seed from "@/interfaces/seedData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const tags = ["Bench", "Beds", "Kitchens", "Tables", "Chairs"];
  const products = seed.find(
    (item) => item.route.toLowerCase() === category?.toLowerCase()
  );

  return (
    <SafeAreaView edges={['left', 'right', 'top']} className="flex-1 bg-red-400 ">
      <View className="pb-10 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="flex-1 text-3xl font-bold text-white text-center">
            {categoryName}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              className="bg-white px-4 py-2 rounded-xl mr-2"
            >
              <Text className="text-gray-700">{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="py-5 px-3 rounded-t-3xl bg-white"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {products?.data.map((item) => (
            <ForUItem
              key={item.id}
              route={category}
              id={item.id}
              title={item.title}
              category={item.category}
              code={item.code}
              imageUrl={item.imageUrl}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
