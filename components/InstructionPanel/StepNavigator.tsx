import { View } from "react-native";

interface StepNavigatorProps {
    stepCount: number;
    currentStep: number;
}

export default function StepNavigator({
    stepCount,
    currentStep,
}: StepNavigatorProps) {
    return (
        <View className="flex-row justify-center items-center mt-3">
            {Array.from({ length: stepCount }).map((_, idx) => (
                <View
                    key={idx}
                    className={`w-2 h-2 mx-1 rounded-full ${idx === currentStep ? "bg-blue-500" : "bg-gray-300"
                        }`}
                />
            ))}
        </View>
    );
}
