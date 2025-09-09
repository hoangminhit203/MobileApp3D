import { Image, Text, TouchableOpacity, View } from "react-native";

type CategoryCardProps = {
    title: string;
    images: any;
    onPress?: () => void;
};

export default function CategoriesCard({ title, images, onPress }: CategoryCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            className="bg-white rounded-xl shadow-md overflow-hidden h-40" // cố định chiều cao
        >
            {/* Ảnh */}
            <View className="flex-1 items-center justify-center bg-gray-100">
                <Image source={images} className="w-20 h-20" resizeMode="contain" />
            </View>

            {/* Text */}
            <View className="py-2 items-center">
                <Text className="text-black font-bold text-xs uppercase text-center" numberOfLines={1}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
