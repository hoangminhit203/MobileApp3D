import FoUContainer from "@/components/FoUContainer";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import seed from "@/interfaces/seedData";
<<<<<<< Updated upstream
import { Image, ScrollView, View } from "react-native";
=======
import { Image, ScrollView } from "react-native";
>>>>>>> Stashed changes

export default function Index() {
  return (
    // Đây là trang for you, hiển thị các sản phẩm được đề xuất
    <View className="flex-1 bg-white">
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />
<<<<<<< Updated upstream
=======
      {/* Header */}
      <ImageBackground
        source={isSticky ? images.bg : null} // hình khi sticky
        className={`w-full ${isSticky ? "absolute top-0 left-0 right-0 z-10 pt-10" : "relative pt-20"
          }`}
        resizeMode="cover"
      >
        <Text
          className={`uppercase font-extrabold px-4 ${isSticky ? "text-2xl text-center py-3" : "text-4xl"
            }`}
        >
          For You
        </Text>
      </ImageBackground>
>>>>>>> Stashed changes

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 60 }}
      >
        {/* Search Bar */}
        <SearchBar />

        {/* Product Sections */}
        {items.length > 0 ? (
          <FoUContainer
            sectionTitle="Items from API"
            route="/items"
            items={items.slice(0, 4)} // Hiển thị 4 sản phẩm đầu tiên từ API
          />
        ) : (
          seed.map((section) => (
            <FoUContainer
              key={section.route}
              sectionTitle={section.sectionTitle}
              route={section.route}
              items={section.data.slice(0, 4)} // Fallback với dữ liệu seed
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
