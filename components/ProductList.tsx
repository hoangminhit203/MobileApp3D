import { Link } from "expo-router";
import React from "react";

import { CatalogItem } from "@/types/catalog";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ScrollView, Text, View } from "react-native";
import ProductItem from "./ProductItem";

type Props = {
  catalogName: string;
  href: string;
  catalogId: string;
  items: CatalogItem[];
  mainColor?: string;
  useBottomSheetScroll?: boolean;
};

const ProductList: React.FC<Props> = ({
  catalogName,
  href,
  catalogId,
  items,
  mainColor = "text-light",
  useBottomSheetScroll = false,
}) => {
  const Container: any = useBottomSheetScroll ? BottomSheetScrollView : ScrollView;
  return (
    <View className="mb-6 flex-1">
      {/* Header */}
      <View className="flex flex-row justify-between items-center mb-3 px-1">
        <Text className={`text-lg font-bold uppercase ${mainColor}`}>
          {catalogName}
        </Text>
        <Link
          className={`text-sm ${mainColor}`}
          href={{
            pathname: "/[catalog]",
            params: { catalog: href, catalogId },
          }}
        >
          See all
        </Link>
      </View>

      {/* empty items */}
      {items.length === 0 ? (
        <View className="px-1 py-6">
          <Text className="text-light text-center text-md italic">
            Không có sản phẩm nào
          </Text>
        </View>
      ) : (
        <Container horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-x-4">
            {items.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                href={href}
                name={item.name}
                imageUrl={item.properties.product?.item3D.files?.poster}
              />
            ))}
          </View>
        </Container>
      )}
    </View>
  );
};

export default ProductList;
