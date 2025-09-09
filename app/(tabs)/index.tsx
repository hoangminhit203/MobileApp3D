import FoUContainer from "@/components/FoUContainer";
import { images } from "@/constants/images";
import seed from "@/interfaces/seedData";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  return (
    // Đây là trang for you, hiển thị các sản phẩm được đề xuất
    <View className="flex-1 bg-white">
      {/* Background */}
      <Image source={images.bg} className="absolute w-full h-full" />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 60 }}
      >
        {/* Product Sections */}
        {seed.map((section) => (
          <FoUContainer
            key={section.route}
            sectionTitle={section.sectionTitle}
            route={section.route}
            items={section.data.slice(0, 4)} // Hiển thị 4 sản phẩm đầu tiên
          />
        ))}
      </ScrollView>
    </View>
  );
}
