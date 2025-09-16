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
        // 🔽 Thu nhỏ padding trên/dưới để bar thấp hơn
        <View className="w-full px-2 py-1 bg-white border-t border-gray-200">
            <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-2">
                    {/* 🔽 Giảm size chữ tiêu đề: text-base -> text-sm */}
                    <Text className="text-sm font-bold text-orange-600">
                        {`Step ${currentStep + 1}`}
                    </Text>
                    {/* 🔽 Giảm size chữ mô tả: text-sm -> text-xs và thêm leading-tight để dòng chữ dính nhau hơn */}
                    <Text className="text-gray-700 text-lg leading-tight">
                        {step?.tts || "No description available."}
                    </Text>
                </View>

                {/* Thanh điều khiển gom về bên phải */}
                <View className="flex-row items-center space-x-1">
                    {/* Nút lùi */}
                    <TouchableOpacity
                        onPress={() =>
                            currentStep > 0 && onStepChange(currentStep - 1)
                        }
                        disabled={currentStep === 0}
                        className="p-0.5"
                    >
                        <Ionicons
                            name="chevron-back-circle"
                            size={24}
                            color={currentStep === 0 ? "gray" : "black"}
                        />
                    </TouchableOpacity>

                    {/* Nút Play / Pause */}
                    <TouchableOpacity
                        onPress={onPlayPause}

                        className="p-1 bg-purple-600 rounded-full"
                    >

                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={16}
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

                        className="p-0.5"
                    >

                        <Ionicons
                            name="chevron-forward-circle"
                            size={24}
                            color={
                                currentStep === steps.length - 1
                                    ? "gray"
                                    : "black"
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>


            <Text className="text-right text-[10px] text-gray-500 mt-0.5">
                {currentStep + 1}/{steps.length}
            </Text>
        </View>
    );
};

export default InstructionsBar;
