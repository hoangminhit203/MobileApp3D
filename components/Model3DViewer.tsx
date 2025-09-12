import ThreeScene from '@/components/threeScene/threeScene';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Model3DViewerProps {
    itemId: string;
    enableDebug?: boolean;
}

const Model3DViewer = ({
    itemId,
    enableDebug = false
}: Model3DViewerProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button - Fixed position */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Fullscreen 3D Scene */}
            <View style={styles.sceneContainer}>
                <ThreeScene
                    itemId={itemId}
                    enableDebug={enableDebug}
                />
            </View>
        </SafeAreaView>
    );
};

export default Model3DViewer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 12,
    },
    sceneContainer: {
        flex: 1,
    },
});
