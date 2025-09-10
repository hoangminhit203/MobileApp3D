import ForUItem from "@/components/ForUItem";
import seed from "@/interfaces/seedData";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CategoryPage() {
    const { category } = useLocalSearchParams<{ category: string }>();

    const products = seed.find(
        (item) => item.route.toLowerCase() === category?.toLowerCase()
    );

    return (
        <View className="flex-1">
            <View className="pt-12 pb-6 px-4 rounded-b-3xl">
                <Text className="text-3xl font-bold text-slate-200 text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-4"
                >
                    {["Bench", "Beds", "Kitchens", "Tables", "Chairs"].map((tag) => (
                        <TouchableOpacity
                            key={tag}
                            className="bg-white px-4 py-2 rounded-full mr-2"
                        >
                            <Text className="text-gray-700">{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView className="px-4 mt-4">
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
        </View>
    );
}