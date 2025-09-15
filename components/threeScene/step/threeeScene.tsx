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

    // Tăng scale để model to hơn (từ 6 lên 10)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 10 / maxDim : 1.5;
    model.scale.setScalar(scale);

    // Fit camera dựa theo kích thước model (chỉ cho PerspectiveCamera)
    if (camera instanceof THREE.PerspectiveCamera) {
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        // Đặt camera ở vị trí xoay ngang, xa hơn để model không bị cắt
        camera.position.set(cameraZ * 2.5, center.y, center.z);
    } else {
        // Fallback cho camera khác - vị trí xoay ngang
        camera.position.set(12, 2, 0);
    }

    camera.lookAt(0, 0, 0);

    // Nếu có OrbitControls thì update luôn
    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }
}

// ===== Component Model =====
const Model = ({ url, onCameraControlReady }: { url: string; onCameraControlReady?: (controller: any) => void }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    // Create camera controller
    const cameraController = useRef({
        updateCamera: (cameraData: {
            cameraOrbit: string;
            fieldOfView: string;
            target: string;
        }) => {
            try {
                // Parse camera orbit (e.g., "335.76deg 61.04deg 0.25m")
                const orbitParts = cameraData.cameraOrbit.split(' ');
                if (orbitParts.length === 3) {
                    const azimuth = parseFloat(orbitParts[0].replace('deg', '')) * (Math.PI / 180);
                    const polar = parseFloat(orbitParts[1].replace('deg', '')) * (Math.PI / 180);
                    const radius = parseFloat(orbitParts[2].replace('m', ''));

                    // Parse target position
                    const targetParts = cameraData.target.split(' ');
                    const target = new THREE.Vector3(
                        parseFloat(targetParts[0]?.replace('m', '') || '0'),
                        parseFloat(targetParts[1]?.replace('m', '') || '0'),
                        parseFloat(targetParts[2]?.replace('m', '') || '0')
                    );

                    // Calculate new camera position
                    const x = target.x + radius * Math.sin(polar) * Math.cos(azimuth);
                    const y = target.y + radius * Math.cos(polar);
                    const z = target.z + radius * Math.sin(polar) * Math.sin(azimuth);

                    // Update camera
                    if (camera instanceof THREE.PerspectiveCamera) {
                        const fov = parseFloat(cameraData.fieldOfView.replace('deg', ''));
                        camera.fov = fov;
                        camera.updateProjectionMatrix();
                    }

                    camera.position.set(x, y, z);
                    camera.lookAt(target);

                    // Update controls
                    if (controlsRef.current) {
                        controlsRef.current.target.copy(target);
                        controlsRef.current.update();
                    }

                    console.log('Camera updated to:', { position: { x, y, z }, target, fov: cameraData.fieldOfView });
                }
            } catch (error) {
                console.error('Failed to update camera:', error);
            }
        }
    });

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

    // Expose camera controller
    useEffect(() => {
        if (onCameraControlReady) {
            onCameraControlReady(cameraController.current);
        }
    }, [onCameraControlReady]);

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
                minDistance={5} // Tăng khoảng cách tối thiểu
                maxDistance={80} // Tăng khoảng cách tối đa
                target={[0, 0, 0]} // Đảm bảo controls nhìn vào trung tâm
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
const ThreeScene = ({
    itemId,
    glbUrl,
    enableDebug = false,
    onCameraControlReady
}: {
    itemId?: string;
    glbUrl?: string;
    enableDebug?: boolean;
    onCameraControlReady?: (controller: any) => void;
}) => {
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
                    position: [15, 2, 0], // Camera xoay ngang, nhìn từ bên phải
                    fov: 50, // Tăng FOV để thấy rõ model to hơn
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
                    <Model url={modelUrl} onCameraControlReady={onCameraControlReady} />
                </Suspense>
            </Canvas>
        </View>
    );
};

export default ThreeScene;
