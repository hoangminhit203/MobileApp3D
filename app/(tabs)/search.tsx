import CategoryCard from "@/components/CategoriesCard";
import ProductItem from "@/components/ProductItem";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogItem, CatalogType } from "@/types/catalog";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Move Dimensions usage inside the component to avoid initialization issues
const getCardWidth = () => {
  const { width } = Dimensions.get("window");
  return (width - 16 * 2 - 12) / 2;
};
// width màn hình - padding ngang - khoảng cách giữa 2 card

export default function Index() {
  const { catalogs, loading } = useCatalog();
  const [searchResults, setSearchResults] = useState<CatalogItem[]>([]);

  const handleSearchResults = (results: CatalogItem[]) => {
    setSearchResults(results);
  };

  const handleCategoryPress = (catalog: CatalogType) => {
    if (catalog._id) {
      router.push({
        pathname: "/[catalog]",
        params: { catalog: catalog.name, catalogId: catalog._id },
      });
    }
  };
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />
      <SafeAreaView edges={["left", "right", "top"]} className="flex-1">
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          stickyHeaderIndices={[1]}
        >
          {/* Logo */}
          <Image
            source={icons.logoInservio}
            className="w-14 h-14 mt-16 mb-4 mx-auto"
          />

          {/* Search */}
          <View className="mt-16">
            <SearchBar onSearchResults={handleSearchResults} />
          </View>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-white mt-4 mb-4">
                SEARCH RESULTS ({searchResults.length})
              </Text>
              <View className="flex-row flex-wrap justify-center gap-4">
                {searchResults.map((item) => (
                  <ProductItem
                    key={item._id}
                    href={"search"}
                    id={item._id}
                    name={item.properties.product?.item3D.name}
                    imageUrl={item.properties.product?.item3D.files?.poster}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Grid Categories - Now using only fake data */}
          {searchResults.length <= 0 && catalogs.length > 0 && (
            <View>
              <Text className="text-lg font-bold text-white mt-4 mb-4">
                BROWSE BY CATEGORIES
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {catalogs.map((cat) => (
                  <View key={cat._id} className="basis-[48%] mb-4">
                    <CategoryCard
                      title={cat.name}
                      images={images.hansrobot}
                      onPress={() => handleCategoryPress(cat)}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Show message if no categories loaded */}
          {catalogs.length === 0 && (
            <View className="py-8">
              <Text className="text-white text-center">
                No categories available
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
