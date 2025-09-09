import { Image, Text, View } from "react-native";

type Props = {
  title: string;
  category: string;
  code: string,
  imageUrl: string;
};

const ForUItem: React.FC<Props> = ({ title, category, code, imageUrl }) => {
  return (
    <View className="bg-white rounded-lg shadow-xl w-48 mr-4 py-4 px-3">
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
    </View>
  );
};

export default ForUItem;
