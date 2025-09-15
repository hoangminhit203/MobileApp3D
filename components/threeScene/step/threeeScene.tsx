import { use3DModel } from '@/hooks/use3DModel';
import { OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas, useThree } from '@react-three/fiber/native';
import { Suspense, useEffect, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as THREE from 'three';

// Import WebGL fixes BEFORE Three.js usage
import '@/utils/webglFixes';

// ===== Hàm fit model vào view =====
function fitModelToView(model: THREE.Object3D, camera: THREE.Camera, controls?: any) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Căn giữa model
    model.position.set(-center.x, -center.y, -center.z);

    // Tính scale để vừa khung hình
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2 / maxDim : 1;
    model.scale.setScalar(scale);

    // Fit camera dựa theo kích thước model (chỉ cho PerspectiveCamera)
    if (camera instanceof THREE.PerspectiveCamera) {
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        // Đặt camera xa gấp đôi để model không bị cắt
        camera.position.set(center.x, center.y, cameraZ * 2);
    } else {
        // Fallback cho camera khác
        camera.position.set(0, 0, 10);
    }

    camera.lookAt(0, 0, 0);

    // Nếu có OrbitControls thì update luôn
    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }
}

// ===== Component Model =====
const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    useEffect(() => {
        if (modelRef.current && scene) {
            const clonedScene = scene.clone();

            // Clear children trước khi add mới
            modelRef.current.clear();
            modelRef.current.add(clonedScene);

            // Fit model vào camera
            fitModelToView(modelRef.current, camera, controlsRef.current);
        }
    }, [scene]);

    return (
        <>
            <group ref={modelRef} />
            <OrbitControls
                ref={controlsRef}
                enablePan
                enableZoom
                enableRotate
                enableDamping
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={50}
            />
        </>
    );
};

// ===== Loader fallback =====
const ModelLoader = () => (
    <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#666" wireframe />
    </mesh>
);

// ===== ThreeScene chính =====
const ThreeScene = ({ itemId, glbUrl, enableDebug = false }: { itemId?: string; glbUrl?: string; enableDebug?: boolean }) => {
    const { modelUrl, loading, error } = use3DModel(itemId, glbUrl, enableDebug);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading 3D model...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

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
                    position: [0, 0, 10],
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                }}
                gl={{
                    antialias: false, // Tắt antialiasing để tránh lỗi multisampling
                    alpha: true,
                    depth: true,
                    stencil: false,
                    powerPreference: "default",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                }}
                onCreated={({ gl }) => {
                    // Disable multisampling functions that cause crashes
                    const glContext = gl.getContext() as any;
                    if (glContext && typeof glContext.renderbufferStorageMultisample === 'function') {
                        // Override the problematic function
                        glContext.renderbufferStorageMultisample = () => {
                            // Do nothing - prevents the EXGL error
                        };
                    }

                    // Additional WebGL context fixes
                    if (glContext) {
                        // Disable other multisampling-related functions
                        if (typeof glContext.getParameter === 'function') {
                            const originalGetParameter = glContext.getParameter;
                            glContext.getParameter = function (pname: number) {
                                // Return 0 for multisampling parameters
                                if (pname === glContext.MAX_SAMPLES ||
                                    pname === glContext.SAMPLES) {
                                    return 0;
                                }
                                return originalGetParameter.call(this, pname);
                            };
                        }
                    }
                }}
            >
                {/* Ánh sáng */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />

                {/* Model */}
                <Suspense fallback={<ModelLoader />}>
                    <Model url={modelUrl} />
                </Suspense>
            </Canvas>
        </View>
    );
};

export default ThreeScene;
