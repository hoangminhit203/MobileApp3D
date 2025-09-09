import CategoryCard from "@/components/CategoriesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 16 * 2 - 12) / 2;
// width màn hình - padding ngang - khoảng cách giữa 2 card

export default function Index() {
    const categories = [
        { id: 1, title: "FURNITURE", image: images.hansrobot },
        { id: 2, title: "TOYS", image: images.hubspot },
        { id: 3, title: "SPORTS", image: images.yamaha },
        { id: 4, title: "BABY + KIDS", image: images.hansrobot },
        { id: 5, title: "ELECTRONICS", image: images.hubspot },
        { id: 6, title: "HOBBIES", image: images.yamaha },
    ];

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
                <SearchBar />

                {/* Tiêu đề */}
                <Text className="text-lg font-bold text-white mt-4 mb-4">
                    BROWSE BY CATEGORIES
                </Text>
                {/* Grid Categories */}
                <View className="flex-row flex-wrap justify-between">
                    {categories.map((cat) => (
                        <View key={cat.id} className="basis-[48%] mb-4">
                            <CategoryCard
                                title={cat.title}
                                images={cat.image}
                                onPress={() => console.log("Go to", cat.title)}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
