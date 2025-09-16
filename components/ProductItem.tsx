import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type Props = {
  id: string;
  href: string;
  name: string;
  imageUrl: string;
};

const ProductItem: React.FC<Props> = ({ id, href, name, imageUrl }) => {
  return (
    <View className="bg-white rounded-lg shadow-md w-48 py-4 px-3">
      <Link
        href={{
          pathname: "/[catalog]/[id]" as any,
          params: { catalog: href, id: id },
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-40"
          resizeMode="cover"
        />

        <View className="pt-3">
          <Text
            className="text-xl"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
        </View>
      </Link>
    </View>
  );
};
export default ProductItem;
