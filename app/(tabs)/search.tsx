import CategoryCard from "@/components/CategoriesCard";
import ForUItem from "@/components/ForUItem";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchAllCategories } from "@/Service/categoryService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 16 * 2 - 12) / 2;
// width màn hình - padding ngang - khoảng cách giữa 2 card

export default function Index() {
    const [categories, setCategories] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // REMOVED FALLBACK - NOW USING FAKE DATA FROM SERVICE
    // const fallbackCategories = [
    //     { id: 1, title: "FURNITURE", image: images.hansrobot },
    //     { id: 2, title: "TOYS", image: images.hubspot },
    //     { id: 3, title: "SPORTS", image: images.yamaha },
    //     { id: 4, title: "BABY + KIDS", image: images.hansrobot },
    //     { id: 5, title: "ELECTRONICS", image: images.hubspot },
    //     { id: 6, title: "HOBBIES", image: images.yamaha },
    // ];

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                const data = await fetchAllCategories(); // Now returns fake data
                setCategories(data);
                setError(""); // Clear any previous errors
            } catch (err: any) {
                console.error("Failed to fetch categories:", err);
                setError(err.message);
                setCategories([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    const handleSearchResults = (results: any[]) => {
        setSearchResults(results);
    };

    const handleCategoryPress = (category: any) => {
        if (category.id) {
            router.push(`/category/${category.title.toLowerCase()}` as any);
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Background */}
            <Image source={images.bg} className="absolute w-full h-full" />

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Logo */}
                <Image
                    source={icons.logoInservio}
                    className="w-14 h-14 mt-16 mb-4 mx-auto"
                />

                {/* Search */}
                <SearchBar onSearchResults={handleSearchResults} />

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-white mt-4 mb-4">
                            SEARCH RESULTS ({searchResults.length})
                        </Text>
                        <View className="flex-row flex-wrap justify-between gap-y-4">
                            {searchResults.map((item) => (
                                <ForUItem
                                    key={item.id}
                                    route="search"
                                    id={item.id}
                                    title={item.title || item.name}
                                    category={item.category}
                                    code={item.code}
                                    imageUrl={item.imageUrl}
                                />
                            ))}
                        </View>
                    </View>
                )}

                {/* Tiêu đề */}
                <Text className="text-lg font-bold text-white mt-4 mb-4">
                    BROWSE BY CATEGORIES
                </Text>

                {loading && (
                    <View className="py-8">
                        <Text className="text-white text-center">Loading categories...</Text>
                    </View>
                )}

                {error && (
                    <View className="py-4">
                        <Text className="text-red-300 text-center">
                            Error: {error}
                        </Text>
                    </View>
                )}

                {/* Grid Categories - Now using only fake data */}
                {!loading && categories.length > 0 && (
                    <View className="flex-row flex-wrap justify-between">
                        {categories.map((cat: any) => (
                            <View key={cat.id} className="basis-[48%] mb-4">
                                <CategoryCard
                                    title={cat.title || cat.name}
                                    images={cat.image || images.hansrobot}
                                    onPress={() => handleCategoryPress(cat)}
                                />
                            </View>
                        ))}
                    </View>
                )}

                {/* Show message if no categories loaded */}
                {!loading && categories.length === 0 && !error && (
                    <View className="py-8">
                        <Text className="text-white text-center">No categories available</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
