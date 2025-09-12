import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
    scene: THREE.Object3D;
    animationData: any;
    phaseIndex: number;
    subStepIndex: number;
};

const ANIMATION_DURATION = 1.0; // giây

export default function AnimatedModelR3F({
    scene,
    animationData,
    phaseIndex,
    subStepIndex,
}: Props) {
    const groupRef = useRef<THREE.Group>(null);
    const originalColorsRef = useRef<Map<string, THREE.Color>>(new Map());

    // animation state
    const animationProgressRef = useRef(1);
    const previousStateRef = useRef({ phaseIndex, subStepIndex });
    const animationStartTimeRef = useRef(0);

    // Store original colors for reset
    useEffect(() => {
        if (!scene) return;

        scene.traverse((child: any) => {
            if (child.isMesh && child.material && child.material.color) {
                const originalColor = child.material.color.clone();
                originalColorsRef.current.set(child.name, originalColor);
            }
        });
    }, [scene]);

    // Handle phase/substep changes
    useEffect(() => {
        const prev = previousStateRef.current;
        const hasChanged = prev.phaseIndex !== phaseIndex || prev.subStepIndex !== subStepIndex;

        if (hasChanged) {
            animationProgressRef.current = 0;
            animationStartTimeRef.current = Date.now() / 1000;
            previousStateRef.current = { phaseIndex, subStepIndex };
        }
    }, [phaseIndex, subStepIndex]);

    // Animation loop using useFrame from R3F
    useFrame(() => {
        if (!scene || !animationData) return;

        const currentTime = Date.now() / 1000;
        const elapsedTime = currentTime - animationStartTimeRef.current;

        if (elapsedTime < ANIMATION_DURATION) {
            animationProgressRef.current = Math.min(elapsedTime / ANIMATION_DURATION, 1);
        } else {
            animationProgressRef.current = 1;
        }

        const progress = animationProgressRef.current;

        // Apply animation based on current phase and substep
        if (animationData[phaseIndex] && animationData[phaseIndex].subSteps[subStepIndex]) {
            const currentSubStep = animationData[phaseIndex].subSteps[subStepIndex];
            const phase = animationData[phaseIndex];

            // Apply transforms
            scene.traverse((child: any) => {
                const childName = child.name;

                // Apply transform if exists
                if (currentSubStep.transforms && currentSubStep.transforms[childName]) {
                    const transform = currentSubStep.transforms[childName];

                    // Smooth interpolation for transforms
                    if (progress < 1) {
                        // Interpolate position
                        if (transform.position) {
                            const targetPos = new THREE.Vector3(...transform.position);
                            child.position.lerp(targetPos, progress);
                        }

                        // Interpolate rotation
                        if (transform.quaternion) {
                            const targetQuat = new THREE.Quaternion(...transform.quaternion);
                            child.quaternion.slerp(targetQuat, progress);
                        }

                        // Interpolate scale
                        if (transform.scale) {
                            const targetScale = new THREE.Vector3(...transform.scale);
                            child.scale.lerp(targetScale, progress);
                        }
                    } else {
                        // Set final values
                        if (transform.position) {
                            child.position.set(...transform.position);
                        }
                        if (transform.quaternion) {
                            child.quaternion.set(...transform.quaternion);
                        }
                        if (transform.scale) {
                            child.scale.set(...transform.scale);
                        }
                    }
                }

                // Apply visibility
                if (currentSubStep.visibility && currentSubStep.visibility.hasOwnProperty(childName)) {
                    child.visible = currentSubStep.visibility[childName];
                }

                // Apply color overrides from phase
                if (child.isMesh && child.material && phase.colorOverrides && phase.colorOverrides[childName]) {
                    const colorHex = phase.colorOverrides[childName];
                    const newColor = new THREE.Color(colorHex);

                    if (progress < 1) {
                        // Smooth color transition
                        const originalColor = originalColorsRef.current.get(childName);
                        if (originalColor) {
                            const currentColor = originalColor.clone().lerp(newColor, progress);
                            child.material.color.copy(currentColor);
                        } else {
                            child.material.color.lerp(newColor, progress);
                        }
                    } else {
                        child.material.color.copy(newColor);
                    }
                    child.material.needsUpdate = true;
                } else if (child.isMesh && child.material && originalColorsRef.current.has(childName)) {
                    // Reset to original color if no override
                    const originalColor = originalColorsRef.current.get(childName);
                    if (originalColor && progress >= 1) {
                        child.material.color.copy(originalColor);
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}
