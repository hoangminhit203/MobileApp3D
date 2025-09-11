// COMMENTED OUT API CALL - USING SEED DATA INSTEAD
// import { getType } from "@/api/apiClient";
import FoUContainer from "@/components/FoUContainer";
import { images } from "@/constants/images";
import { useCatalog } from "@/hooks/useCatelog";
import seedData from "@/interfaces/seedData";
import { CatalogType } from "@/types/catalog";
import { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { items, loading } = useCatalog();
  //console.log(items, "itemsitems")
  // State xác định sticky header
  const [isSticky, setIsSticky] = useState(false);
  const [catalogs, setCatalog] = useState([] as CatalogType[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // Convert seed data to catalog types
        const catalogTypes: CatalogType[] = seedData.map(section => ({
          _id: section.route,
          name: section.sectionTitle
        }));

        setCatalog(catalogTypes);
        console.log("Using seed data for catalogs:", catalogTypes);

        // COMMENTED OUT API CALL
        // const data = await getType(); // payload mẫu
        // console.log("===>>>>", data)
        // setCatalog(data);
        // console.log("getType result:", data);
      } catch (error) {
        console.error("Failed to fetch type:", error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setIsSticky(y > 80); // khi cuộn xuống quá 80px thì stick header
  };
  return (
    // Đây là trang for you, hiển thị các sản phẩm được đề xuất
    <SafeAreaView className="flex-1" edges={["left", "right",]}>
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />
      {/* Header */}
      <ImageBackground
        source={isSticky ? images.bg : null} // hình khi sticky
        className={`w-full ${isSticky ? "absolute top-0 left-0 right-0 z-10 pt-10" : "relative pt-20"
          }`}
        resizeMode="cover"
      >
        <Text
          className={`uppercase font-extrabold px-4 text-slate-200 ${isSticky ? "text-2xl text-center py-3" : "text-4xl"
            }`}
        >
          For You
        </Text>
      </ImageBackground>

      <ScrollView
        className="px-4"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 60 }}
      >

        {/* Product Sections */}
        {catalogs.map((catalog) => (
          <FoUContainer
            key={catalog._id}
            sectionTitle={catalog.name}
            route={catalog.name}
            _id={catalog._id}
            items={items.filter(item => {
              return item.typeId === catalog._id
            }).slice(0, 6)}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
