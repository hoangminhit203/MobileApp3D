import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type Props = {
  id: string;
  route: string;
  title: string;
  category: string;
  code: string,
  imageUrl: string;
};

const ForUItem: React.FC<Props> = ({ id, route, title, category, code, imageUrl }) => {
  return (
    <View className="bg-white rounded-lg shadow-xl w-48 mr-4 py-4 px-3">
      <Link  href={{ pathname: "/[category]/[id]", params: { category: route, id: id } }}>
          <Image
            source={{uri: imageUrl}}
            className="w-full h-40"
            resizeMode="cover"
          />

          <View className="mt-3">
            <Text className="text-lg">{title}</Text>
            <Text className="text-sm">{code}</Text>
            <Text className="text-gray-600 text-sm mt-1">{category}</Text>
          </View>
      </Link>
    </View>
  );
};

export default ForUItem;
