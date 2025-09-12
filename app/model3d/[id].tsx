import Model3DViewer from '@/components/Model3DViewer';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Model3dDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id || typeof id !== 'string') {
        return (
            <SafeAreaView className="flex-1 bg-gray-100">
                <View className="flex-1 justify-center items-center p-5">
                    <Text className="text-red-500 text-base text-center">
                        ID sản phẩm không hợp lệ
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <Model3DViewer
            itemId={id}
            enableDebug={__DEV__}
        />
    );
};

export default Model3dDetails;
