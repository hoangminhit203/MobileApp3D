import ProductList from "@/components/ProductList";
import { images } from "@/constants/images";
import { useCatalog } from "@/hooks/useCatalog";
import { useMemo, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { items, catalogs, loading } = useCatalog();
  // State xác định sticky header
  const [isSticky, setIsSticky] = useState(false);
  // memorize catalogItem
  const catalogItemsMap = useMemo(() => {
    const map: Record<string, typeof items> = {};
    catalogs.forEach((catalog) => {
      map[catalog._id] = items
        .filter((item) => item.typeId === catalog._id)
        .slice(0, 6);
    });
    return map;
  }, [catalogs, items]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setIsSticky(y > 80); // khi cuộn xuống quá 80px thì stick header
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />
      {/* SafeAreaView Content */}
      <SafeAreaView className="flex-1 px-4">
        {/* Header */}
        <ImageBackground
          source={isSticky ? images.bg : null} // hình khi sticky
          className={` ${isSticky
            ? "absolute top-0 left-0 right-0 z-10 pt-10"
            : "relative pt-16"
            }`}
          resizeMode="cover"
        >
          <Text
            className={`uppercase font-extrabold text-light ${isSticky ? "text-2xl text-center py-3" : "text-4xl"
              }`}
          >
            For You
          </Text>
        </ImageBackground>

        {/* ScrollView Content */}
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 50 }}
        >
          {/* Product Sections */}
          {catalogs.map((catalog) => (
            <ProductList
              key={catalog._id}
              catalogName={catalog.name}
              href={catalog.name}
              catalogId={catalog._id}
              items={catalogItemsMap[catalog._id] || []}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
