import CategoryCard from "@/components/CategoriesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const categories = [
    { id: 1, title: "FURNITURE", image: images.hansrobot },
    { id: 2, title: "TOYS", image: images.hubspot },
    { id: 3, title: "SPORTS", image: images.yamaha },
    { id: 4, title: "BABY + KIDS", image: images.hansrobot },
    { id: 5, title: "ELECTRONICS", image: images.hubspot },
    { id: 6, title: "HOBBIES", image: images.yamaha },
  ]
  return (
    <View
      className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        {/* Logo */}
        <Image source={icons.logoInservio} className="w-14 h-14 mt-20 mb-4 mx-auto" />
        <View className="flex-1 mt-5">
          {/* Search */}
          <SearchBar />
        </View>
        {/* Categories */}
        <Text className="text-lg font-bold text-white mt-8 mb-4">
          BROWSE BY CATEGORIES
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              imagaes={cat.image}
              onPress={() => console.log("Go to", cat.title)}
            />
          ))}
        </View>

      </ScrollView>



    </View>
  );
}
