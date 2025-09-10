import ForUItem from "@/components/ForUItem";
import seed from "@/interfaces/seedData";
import { fetchAllCategories } from "@/Service/categoryService";
import { fetchItemsByCategory } from "@/Service/itemService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CategoryPage() {
    const { category } = useLocalSearchParams<{ category: string }>();
    const [categories, setCategories] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                // Fetch categories for the filter tags
                const categoriesData = await fetchAllCategories();
                setCategories(categoriesData);

                // Fetch items by category if category is provided
                if (category) {
                    const itemsData = await fetchItemsByCategory(category);
                    setItems(itemsData);
                } else {
                    // Fallback to seed data if no category specified
                    const products = seed.find(
                        (item) => item.route.toLowerCase() === category?.toLowerCase()
                    );
                    setItems(products?.data || []);
                }
            } catch (err: any) {
                console.error("Failed to fetch data:", err);
                setError(err.message);

                // Fallback to seed data on error
                const products = seed.find(
                    (item) => item.route.toLowerCase() === category?.toLowerCase()
                );
                setItems(products?.data || []);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [category]);

    const products = seed.find(
        (item) => item.route.toLowerCase() === category?.toLowerCase()
    );

    return (
        <View className="flex-1">
            <View className="pt-12 pb-6 px-4 rounded-b-3xl">
                <Text className="text-3xl font-bold text-white text-center">
                    {category?.charAt(0).toUpperCase() + category?.slice(1)}
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-4"
                >
                    {categories.length > 0 ? (
                        categories.slice(0, 5).map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                className="bg-white px-4 py-2 rounded-full mr-2"
                            >
                                <Text className="text-gray-700">{cat.name}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        ["Bench", "Beds", "Kitchens", "Tables", "Chairs"].map((tag) => (
                            <TouchableOpacity
                                key={tag}
                                className="bg-white px-4 py-2 rounded-full mr-2"
                            >
                                <Text className="text-gray-700">{tag}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>

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

            <ScrollView className="px-4 mt-4">
                <View className="flex-row flex-wrap justify-between gap-y-4">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <ForUItem
                                key={item.id}
                                route={category}
                                id={item.id}
                                title={item.title}
                                category={item.category}
                                code={item.code}
                                imageUrl={item.imageUrl}
                            />
                        ))
                    ) : (
                        products?.data.map((item) => (
                            <ForUItem
                                key={item.id}
                                route={category}
                                id={item.id}
                                title={item.title}
                                category={item.category}
                                code={item.code}
                                imageUrl={item.imageUrl}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}