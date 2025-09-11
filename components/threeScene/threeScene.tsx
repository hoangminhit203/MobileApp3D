import { OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

interface Model3DProps {
    modelPath: string;
}

// Component để tải và hiển thị mô hình GLB
function Model3D({ modelPath }: Model3DProps) {
    // Sử dụng `useGLTF` để tải mô hình .glb.
    // Thư viện này đã được tối ưu hóa và tự động xử lý các loaders cần thiết.
    const gltf = useGLTF(modelPath);

    // Xử lý materials để tắt dispersion và các thuộc tính không cần thiết
    if (gltf.scene) {
        gltf.scene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                // Tắt dispersion nếu có
                if (child.material.dispersion !== undefined) {
                    child.material.dispersion = 0;
                }
                // Đảm bảo material được update
                child.material.needsUpdate = true;
            }
        });
    }

    return (
        <group
            position={[0, -1, 0]} // Hạ thấp model một chút
            rotation={[0, 0, 0]}  // Model đứng yên
            scale={[1, 1, 1]}
        >
            {/* Hiển thị cảnh 3D từ mô hình */}
            <primitive object={gltf.scene} />
        </group>
    );
}

// Component để thiết lập môi trường 3D (ánh sáng, controls)
function Scene({ modelPath }: { modelPath: string }) {
    return (
        <>
            {/* Ánh sáng môi trường dịu nhẹ */}
            <ambientLight intensity={0.5} />

            {/* Ánh sáng chính từ một hướng */}
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Component chứa model 3D. */}
            {/* Sử dụng <Suspense> để hiển thị loading spinner trong khi model đang tải. */}
            <Suspense fallback={null}>
                <Model3D modelPath={modelPath} />
            </Suspense>

            {/* Controls cho phép xoay, zoom, pan */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={8}
                autoRotate={false} // Tắt auto rotate để model đứng yên
                enableDamping={true} // Thêm damping để xoay mượt hơn
                dampingFactor={0.1}
            />
        </>
    );
}

// Component chính
export default function ThreeScene({ modelPath }: { modelPath: string }) {
    return (
        <View style={styles.container}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 60 }} // Điều chỉnh camera để nhìn rõ hơn
                style={styles.canvas}
                gl={{ antialias: true, alpha: true }} // Cải thiện chất lượng render
            >
                <Scene modelPath={modelPath} />
            </Canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    canvas: {
        flex: 1,
    },
});
