import { OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedModelR3F from "../AnimatedModelR3F";

interface Model3DProps {
    modelPath: string;
}
type Props = {
    modelPath: string;
    animationData: any;
    phaseIndex: number;
    subStepIndex: number;
};

// Component để tải mô hình GLB
function Model3D({ modelPath }: Model3DProps) {
    const gltf = useGLTF(modelPath);

    if (gltf.scene) {
        gltf.scene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                if (child.material.dispersion !== undefined) {
                    child.material.dispersion = 0;
                }
                child.material.needsUpdate = true;
            }
        });
    }

    return gltf.scene;
}

// Component để thiết lập môi trường 3D
function Scene({ modelPath, animationData, phaseIndex, subStepIndex }: Props) {
    const gltf = useGLTF(modelPath);

    return (
        <>
            {/* Ánh sáng */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Model + animation */}
            <Suspense fallback={null}>
                <group
                    position={[0, -0.4, 0]}
                    rotation={[0, 0, 0]}
                    scale={[4, 4, 4]}
                >
                    <AnimatedModelR3F
                        scene={gltf.scene}
                        animationData={animationData}
                        phaseIndex={phaseIndex}
                        subStepIndex={subStepIndex}
                    />
                </group>
            </Suspense>

            {/* Orbit controls */}
            <OrbitControls
                enableZoom
                enablePan
                enableRotate
                minDistance={2}
                maxDistance={8}
                autoRotate={false}
                enableDamping
                dampingFactor={0.1}
            />
        </>
    );
}

// Component chính
export default function ThreeScene({ modelPath, animationData, phaseIndex, subStepIndex }: Props) {
    return (
        <View style={styles.container}>
            <Canvas
                camera={{ position: [-5, 0, 0], fov: 60 }}
                style={styles.canvas}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene
                    modelPath={modelPath}
                    animationData={animationData}
                    phaseIndex={phaseIndex}
                    subStepIndex={subStepIndex}
                />
            </Canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7f8c8d',
    },
    canvas: {
        flex: 1,
    },
});
