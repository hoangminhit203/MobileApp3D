import * as ScreenOrientation from "expo-screen-orientation";
import { BookOpen } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import InstructionPanel from "../../components/instructions/instructionBar";
import ThreeScene from "../../components/threeScene/threeScene";
import { models } from "../../constants/models";

interface Transform {
    position: [number, number, number];
    quaternion: [number, number, number, number];
    scale: [number, number, number];
}

interface CameraState {
    position: [number, number, number];
    target: [number, number, number];
}

interface SubStep {
    id: string;
    description?: string;
    transforms: Record<string, Transform>;
    visibility: Record<string, boolean>;
    cameraState?: CameraState;
}

interface Phase {
    id: string;
    name: string;
    subSteps: SubStep[];
    colorOverrides: Record<string, string>;
}

interface AnimationProject {
    environment: any;
    animationData: Phase[];
}

export default function Home() {
    const [projectData, setProjectData] = useState<AnimationProject | null>(null);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [subStepIndex, setSubStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPanelVisible, setIsPanelVisible] = useState(true);
    const [modelUri, setModelUri] = useState<string | null>(null);

    useEffect(() => {
        // Load animation data directly as a JSON file
        try {
            const data = require("../../assets/animation_data.json");
            setProjectData(data);
        } catch (err) {
            console.error("Can not load animation:", err);
        }

        // Load model asset
        const loadModel = async () => {
            try {
                const asset = models.ABB;
                await asset.downloadAsync();
                setModelUri(asset.uri);
            } catch (err) {
                console.error("Can not load model:", err);
            }
        };
        loadModel();

        // Set screen to landscape mode on load
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }, []);

    const animationData = projectData?.animationData;

    const handleNextPhase = useCallback(() => {
        if (!animationData || phaseIndex >= animationData.length - 1) return;
        const newPhaseIndex = phaseIndex + 1;
        setPhaseIndex(newPhaseIndex);
        setSubStepIndex(0);
        setIsPlaying(false);
    }, [animationData, phaseIndex]);

    useEffect(() => {
        if (!isPlaying || !animationData) return;

        const currentPhase = animationData[phaseIndex];
        if (!currentPhase) return;

        const interval = setInterval(() => {
            setSubStepIndex((prevIndex) => {
                const isLastStepInPhase = prevIndex >= currentPhase.subSteps.length - 1;
                if (isLastStepInPhase) {
                    const isLastPhaseOverall = phaseIndex >= animationData.length - 1;
                    if (isLastPhaseOverall) {
                        setIsPlaying(false);
                        return prevIndex;
                    } else {
                        handleNextPhase();
                        return -1;
                    }
                }
                return prevIndex + 1;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying, phaseIndex, animationData, handleNextPhase]);

    const handlePrevPhase = () => {
        if (phaseIndex <= 0) return;
        const newPhaseIndex = phaseIndex - 1;
        setPhaseIndex(newPhaseIndex);
        setSubStepIndex(0);
        setIsPlaying(false);
    };

    const handlePlayToggle = () => {
        if (!animationData) return;
        const currentPhase = animationData[phaseIndex];
        if (subStepIndex >= currentPhase.subSteps.length - 1) {
            const isLastPhase = phaseIndex >= animationData.length - 1;
            if (isLastPhase) {
                setPhaseIndex(0);
                setSubStepIndex(0);
            } else {
                handleNextPhase();
            }
        }
        setIsPlaying((prev) => !prev);
    };

    if (!projectData || !animationData || !modelUri) {
        return (
            <View className="w-screen h-screen flex items-center justify-center" >
                <Text>Loading Animation...</Text>
            </View>
        );
    }

    return (
        <View className="relative w-screen h-screen overflow-hidden">
            <ThreeScene
                modelPath={modelUri}
                animationData={animationData}
                phaseIndex={phaseIndex}
                subStepIndex={subStepIndex}
            />

            {!isPanelVisible && (
                <TouchableOpacity
                    onPress={() => setIsPanelVisible(true)}
                    className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
                >
                    <BookOpen size={24} color="#374151" />
                </TouchableOpacity>
            )}

            {isPanelVisible && (
                <InstructionPanel
                    animationData={animationData}
                    currentPhaseIndex={phaseIndex}
                    currentSubStepIndex={subStepIndex}
                    isPlaying={isPlaying}
                    onNextPhase={handleNextPhase}
                    onPrevPhase={handlePrevPhase}
                    onPlayToggle={handlePlayToggle}
                    onClose={() => setIsPanelVisible(false)}
                />
            )}
        </View>
    );
}