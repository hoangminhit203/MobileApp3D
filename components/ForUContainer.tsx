import React from "react";
import { ScrollView, Text, View } from "react-native";
import ForUItem from "./ForUItem";

type Item = {
  id: string;
  title: string;
  category: string;
  code: string;
  imageUrl: string;
};

type Props = {
  sectionTitle: string;
  items: Item[];
};

const ForUContainer: React.FC<Props> = ({ sectionTitle, items }) => {
  return (
    <View className="mb-6">
      <View className="flex flex-row justify-between items-center mb-3 px-1">
        <Text className="text-lg font-bold uppercase">{sectionTitle}</Text>
        <Text className="text-sm text-gray-500">See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <ForUItem
            key={item.id}
            title={item.title}
            category={item.category}
            code={item.code}
            imageUrl={item.imageUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ForUContainer;
