import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: '#000044' }}>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logoInservio} className="w-14 h-14 mt-20 mb-4 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar />
        </View>
      </ScrollView>



    </View>
  );
}
