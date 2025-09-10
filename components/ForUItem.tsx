import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type Props = {
    id: string;
    route: string;
    title: string;
    imageUrl: string;
};

const ForUItem: React.FC<Props> = ({ id, route, title, imageUrl }) => {
    return (
        <View className="bg-white rounded-lg shadow-xl w-48 py-4 px-3">
            <Link href={{ pathname: "/[category]/[id]", params: { category: route, id: id } }}>
                <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-40"
                    resizeMode="cover"
                />

                <View className="mt-3">
                    <Text className="text-lg">{title}</Text>
                </View>
            </Link>
        </View>
    );
};

export default ForUItem;