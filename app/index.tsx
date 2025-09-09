import { ForUContainer } from "@/components";
import seed from "@/interfaces/seedData";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="bg-gray-100" stickyHeaderIndices={[0]}>
        {/* Header */}
        <View className="bg-gray-100 p-4">
          <Text className="uppercase text-4xl font-extrabold text-center">
            For You
          </Text>
        </View>
        {/* Load Containers */}
        <View className="p-4">
          {seed.map((item, index) => (
            <ForUContainer
              key={index}
              sectionTitle={item.sectionTitle}
              route={item.route}
              items={item.data}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
