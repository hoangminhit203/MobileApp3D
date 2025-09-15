import InstructionsBar from "@/components/InstructionPanel/InstructionsBar";
import ThreeScene from "@/components/threeScene/step/threeeScene";
import { useCatalog } from "@/hooks/useCatalog";
import { useInstructions } from "@/hooks/useInstructions";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { BookOpen } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Model3dDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log('=== Model3D Component Debug ===');
    console.log('URL param id:', id);
    console.log('URL param id type:', typeof id);

    const { items, loading } = useCatalog();
    const router = useRouter();

    const {
        steps,
        loading: instructionsLoading,
        error: instructionsError,
        hasInstructions,
    } = useInstructions(id);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true); // Mặc định hiển thị

    const cameraControlRef = useRef<any>(null);

    useEffect(() => {
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
        return () => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        };
    }, []);

    useEffect(() => {
        if (hasInstructions && !instructionsLoading) {
            setShowInstructions(true);
        }
    }, [hasInstructions, instructionsLoading]);

    // Debug logging
    console.log('Model3D Debug:', {
        hasInstructions,
        instructionsLoading,
        showInstructions,
        stepsLength: steps.length,
        instructionsError
    });

    const product = items.find((item) => item._id === id);
    console.log('Found product:', product ? 'YES' : 'NO');
    console.log('Items count:', items.length);
    if (items.length > 0) {
        console.log('First item ID for reference:', items[0]._id);
    }

    const handleCameraChange = (camera: {
        cameraOrbit: string;
        fieldOfView: string;
        target: string;
    }) => {
        if (cameraControlRef.current) {
            cameraControlRef.current.updateCamera(camera);
        }
    };

    const handleCameraControlReady = (controller: any) => {
        cameraControlRef.current = controller;
    };

    const handleStepChange = (stepIndex: number) => {
        setCurrentStep(stepIndex);
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);

        if (!isPlaying && steps[currentStep]?.time) {
            const duration = parseFloat(steps[currentStep].time || "0") * 1000;
            setTimeout(() => {
                if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsPlaying(false);
                }
            }, duration);
        }
    };

    if (loading || instructionsLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="green" />
                <Text className="mt-4 text-lg">Loading Model 3D...</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <Text className="text-gray-500 text-lg">
                    Not Found Model 3D
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-green-600 py-2 px-6 rounded-lg"
                >
                    <Text className="text-white font-bold">Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 bg-white/10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white/20 p-2 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <Text
                    className="text-white text-lg font-bold flex-1 text-center mx-4"
                    numberOfLines={1}
                >
                    {product.properties.product?.item3D.name}
                </Text>

                {hasInstructions ? (
                    <TouchableOpacity
                        onPress={() => setShowInstructions(!showInstructions)}
                        className="bg-white/20 p-2 rounded-full"
                    >
                        <BookOpen size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <View className="w-10" />
                )}
            </View>

            {/* Main Content */}
            <View className="flex-1 flex-col">
                {/* 3D Model */}
                <View style={{ flex: 1 }}>
                    <ThreeScene
                        itemId={id}
                        enableDebug={__DEV__}
                        onCameraControlReady={handleCameraControlReady}
                    />
                </View>

                {/* Instructions dưới */}
                {showInstructions && hasInstructions && steps.length > 0 && (
                    <View style={{ height: 160, backgroundColor: "white" }}>
                        <InstructionsBar
                            steps={steps}
                            currentStep={currentStep}
                            onStepChange={handleStepChange}
                            onCameraChange={handleCameraChange}
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Model3dDetails;
