import { ScrollView, Text } from "react-native";

import { ForUContainer } from "@/components";
import seed from "@/interfaces/seedData";

export default function App() {
  

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-10">
      <Text className="uppercase text-2xl font-extrabold mb-10">For You</Text>
        {seed.map((item, index) => (
            <ForUContainer key={index} sectionTitle={item.sectionTitle} route={item.route} items={item.data} />
        ))}
    </ScrollView>
  );
}