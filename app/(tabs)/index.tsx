import { getType } from "@/api/apiClient";
import ProductList from "@/components/ProductList";
import { images } from "@/constants/images";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogType } from "@/types/catalog";
import { useEffect, useMemo, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { items, loading } = useCatalog();
  // State xác định sticky header
  const [isSticky, setIsSticky] = useState(false);
  const [catalogs, setCatalog] = useState([] as CatalogType[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getType(); // payload mẫu
        setCatalog(data);
      } catch (error) {
        console.error("Failed to fetch type:", error);
      }
    };

    fetchData();
  }, []);

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
  return (
    <View className="flex-1">
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />
      {/* SafeAreaView Content */}
      <SafeAreaView className="flex-1 px-4">
        {/* Header */}
        <ImageBackground
          source={isSticky ? images.bg : null} // hình khi sticky
          className={` ${
            isSticky
              ? "absolute top-0 left-0 right-0 z-10 pt-10"
              : "relative pt-16"
          }`}
          resizeMode="cover"
        >
          <Text
            className={`uppercase font-extrabold text-light ${
              isSticky ? "text-2xl text-center py-3" : "text-4xl"
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
