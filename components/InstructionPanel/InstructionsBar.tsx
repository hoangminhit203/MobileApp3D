import { Step } from "@/types/catalog";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface InstructionsBarProps {
    steps: Step[];
    currentStep: number;
    onStepChange: (index: number) => void;
    onCameraChange: (camera: any) => void;
    isPlaying: boolean;
    onPlayPause: () => void;
}

const InstructionsBar = ({
    steps,
    currentStep,
    onStepChange,
    onCameraChange,
    isPlaying,
    onPlayPause,
}: InstructionsBarProps) => {
    const step = steps[currentStep];

    return (
        <View className="flex-1 flex-col p-4 bg-white">
            {/* Nội dung hướng dẫn */}
            <Text className="text-lg font-bold text-orange-600 mb-1">
                {step?._id || `Step ${currentStep + 1}`}
            </Text>
            <Text className="text-gray-700 flex-1">
                {step?.tts || "No description available."}
            </Text>

            {/* Thanh điều khiển */}
            <View className="flex-row items-center justify-between mt-2">
                {/* Nút lùi */}
                <TouchableOpacity
                    onPress={() =>
                        currentStep > 0 && onStepChange(currentStep - 1)
                    }
                    disabled={currentStep === 0}
                    className="p-2"
                >
                    <Ionicons
                        name="chevron-back-circle"
                        size={32}
                        color={currentStep === 0 ? "gray" : "black"}
                    />
                </TouchableOpacity>

                {/* Nút Play / Pause */}
                <TouchableOpacity
                    onPress={onPlayPause}
                    className="p-3 bg-purple-600 rounded-full"
                >
                    <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={28}
                        color="white"
                    />
                </TouchableOpacity>

                {/* Nút tới */}
                <TouchableOpacity
                    onPress={() =>
                        currentStep < steps.length - 1 &&
                        onStepChange(currentStep + 1)
                    }
                    disabled={currentStep === steps.length - 1}
                    className="p-2"
                >
                    <Ionicons
                        name="chevron-forward-circle"
                        size={32}
                        color={
                            currentStep === steps.length - 1 ? "gray" : "black"
                        }
                    />
                </TouchableOpacity>
            </View>

            {/* Chỉ số step */}
            <Text className="text-center text-sm text-gray-500 mt-1">
                {currentStep + 1}/{steps.length}
            </Text>
        </View>
    );
};

export default InstructionsBar;
