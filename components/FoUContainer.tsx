import { Link } from "expo-router";
import React from "react";

import { CatalogItem } from "@/types/catalog";
import { ScrollView, Text, View } from "react-native";
import ForUItem from "./ForUItem";


type Props = {
  sectionTitle: string;
  route: string;
  items: CatalogItem[];
};

const ForUContainer: React.FC<Props> = ({ sectionTitle, route, items }) => {
  return (
    <View className="mb-6">
      <View className="flex flex-row justify-between items-center mb-3 px-1">
        <Text className="text-lg font-bold uppercase text-slate-200">
          {sectionTitle}
        </Text>
        <Link className="text-sm text-slate-200" href={`/${route}` as any}>
          See all
        </Link>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-x-4">
          {items.map((item) => (
            <ForUItem
              key={item._id}
              route={route}
              id={item._id}
              title={item.name}
              imageUrl={item.properties.product?.item3D.files?.poster}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ForUContainer;
