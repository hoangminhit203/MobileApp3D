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
            className="w-[48%] bg-cyan-800 rounded-2xl mb-4 shadow-md"
        >
            {/* Ảnh */}
            <View className="w-full h-20 rounded-t-2xl overflow-hidden bg-gray-100">
                <Image source={images} className="w-full h-full" resizeMode="cover" />
            </View>

            {/* Text */}
            <View className="p-3">
                <Text className="text-black font-bold text-sm">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
