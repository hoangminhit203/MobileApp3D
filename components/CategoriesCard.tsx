import { Image, Text, TouchableOpacity, View } from "react-native";

type CategoryCardProps = {
    title: string;
    imagaes: any;
    onPress?: () => void;
}
export default function CategoriesCard({ title, imagaes, onPress }: CategoryCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="w-[48%] bg-white rounded-2xl overflow-hidden mb-4"
        >
            <Image source={imagaes} className="w-full h-32" resizeMode="cover" />
            <View className="absolute bottom-2 left-2">
                <Text className="text-white font-bold text-base">{title}</Text>
            </View>


        </TouchableOpacity>
    );
}
