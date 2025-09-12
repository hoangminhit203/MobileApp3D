

import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from "react-native";

interface SubStep {
    id: string;
    description?: string;
}

interface Phase {
    id: string;
    name: string;
    subSteps: SubStep[];
}

type InstructionPanelProps = {
    animationData: Phase[];
    currentPhaseIndex: number;
    currentSubStepIndex: number;
    isPlaying: boolean;
    onPrevPhase: () => void;
    onNextPhase: () => void;
    onPlayToggle: () => void;
    onClose: () => void;
};

export default function InstructionPanel({
    animationData,
    currentPhaseIndex,
    currentSubStepIndex,
    isPlaying,
    onPrevPhase,
    onNextPhase,
    onPlayToggle,
    onClose,
}: InstructionPanelProps) {

    const currentPhase = animationData[currentPhaseIndex];
    const currentStep = currentPhase?.subSteps[currentSubStepIndex];
    const totalStepsInPhase = currentPhase?.subSteps.length || 0;

    return (
        <View className="absolute bottom-0 left-0 right-0 h-32 bg-white/80 backdrop-blur-md shadow-lg flex flex-row items-center justify-between px-6 py-4 border-t border-gray-200">
            {/* Left side - Step info and description */}
            <View className="flex-1 mr-4">
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xl font-bold text-gray-800">
                        Step {currentSubStepIndex + 1}
                    </Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <X size={18} color="#4b5563" />
                    </TouchableOpacity>
                </View>
                <Text className="text-gray-700 text-sm line-clamp-2">
                    {currentStep?.description || "Install the glass into the frame and attach the hinge.Xin chào"}
                </Text>
            </View>

            {/* Center - Controls */}
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity
                    onPress={onPrevPhase}
                    disabled={currentPhaseIndex === 0}
                    className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                >
                    <ChevronLeft size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPlayToggle}
                    className="p-3 rounded-full bg-blue-500"
                >
                    {isPlaying ? (
                        <Pause size={24} color="#fff" />
                    ) : (
                        <Play size={24} color="#fff" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onNextPhase}
                    disabled={currentPhaseIndex >= animationData.length - 1}
                    className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                >
                    <ChevronRight size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Right side - Progress dots */}
            <View className="flex-row items-center space-x-1 ml-4">
                {Array.from({ length: totalStepsInPhase }).map((_, index) => (
                    <View
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentSubStepIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                ))}
            </View>
        </View>
    );
}
