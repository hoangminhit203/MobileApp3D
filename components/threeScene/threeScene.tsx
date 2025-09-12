import { use3DModel } from '@/hooks/use3DModel';
import { OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense, useEffect, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as THREE from 'three';

// Import WebGL fixes
import '@/utils/webglFixes';

// Component to load and display the 3D model
const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url); // Load the GLB model
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (modelRef.current && scene) {
            // Clone the scene to avoid modifying the original
            const clonedScene = scene.clone();

            // Calculate the bounding box of the model
            const box = new THREE.Box3().setFromObject(clonedScene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Debug logging
            if (__DEV__) {
                console.log('Model bounds:', {
                    center: { x: center.x, y: center.y, z: center.z },
                    size: { x: size.x, y: size.y, z: size.z },
                    maxDim: Math.max(size.x, size.y, size.z)
                });
            }

            // Center the model
            clonedScene.position.set(-center.x, -center.y, -center.z);

            // Scale the model to fit in view (max dimension = 4 units)
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = maxDim > 0 ? 4 / maxDim : 1;
            clonedScene.scale.setScalar(scale);

            // Clear previous children and add the cloned scene
            modelRef.current.clear();
            modelRef.current.add(clonedScene);
        }
    }, [scene]);

    return <group ref={modelRef} />;
};

// Loading fallback component
const ModelLoader = () => (
    <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
            color="#666666"
            transparent={true}
            opacity={0.5}
            wireframe={true}
        />
    </mesh>
);

interface ThreeSceneProps {
    itemId?: string; // ID của item để fetch từ API
    glbUrl?: string; // Hoặc truyền trực tiếp URL (fallback)
    enableDebug?: boolean; // Enable debug logging
}

// Main ThreeScene component
const ThreeScene = ({ itemId, glbUrl, enableDebug = false }: ThreeSceneProps) => {
    const { modelUrl, loading, error, itemData } = use3DModel(itemId, glbUrl, enableDebug);

    // Hiển thị loading state
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Đang tải 3D model...</Text>
            </View>
        );
    }

    // Hiển thị error state
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

    // Không có model URL
    if (!modelUrl) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Không có 3D model để hiển thị</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Canvas
                style={{ flex: 1 }}
                camera={{
                    position: [5, 5, 5],
                    fov: 45,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: false, // Tắt antialiasing
                    alpha: true,
                    depth: true,
                    stencil: false,
                    powerPreference: "default",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
                frameloop="demand" // Only render when needed
                onCreated={({ gl, scene, camera }) => {
                    // Force disable multisampling and related features
                    try {
                        // Override problematic methods to prevent EXGL errors
                        const glContext = gl.getContext();
                        if (glContext && (glContext as any).renderbufferStorageMultisample) {
                            (glContext as any).renderbufferStorageMultisample = () => { };
                        }

                        // Set basic render settings
                        gl.setClearColor(0x222222, 1); // Dark gray background
                        gl.setPixelRatio(1);

                        // Set up camera to look at center
                        camera.lookAt(0, 0, 0);
                    } catch (error) {
                        // Silently ignore any errors during setup
                    }
                }}
            >
                {/* Better lighting setup */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={1}
                    castShadow={false}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />

                {/* Load the 3D model with Suspense for better loading */}
                <Suspense fallback={<ModelLoader />}>
                    <Model url={modelUrl} />
                </Suspense>

                {/* Orbit controls with better settings */}
                <OrbitControls
                    target={[0, 0, 0]} // Look at center
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.05}
                    minDistance={2}
                    maxDistance={20}
                    maxPolarAngle={Math.PI} // Allow full rotation
                    minPolarAngle={0}
                />
            </Canvas>
        </View>
    );
};

export default ThreeScene;
