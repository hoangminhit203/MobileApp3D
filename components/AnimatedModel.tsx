import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 👉 dùng orbit controls cho RN
import { OrbitControls } from "three-orbitcontrols-ts";

type Props = {
    scene: THREE.Object3D;
    animationData: any;
    phaseIndex: number;
    subStepIndex: number;
};

const ANIMATION_DURATION = 1.0; // giây

export default function AnimatedModelRN({
    scene,
    animationData,
    phaseIndex,
    subStepIndex,
}: Props) {
    const glRef = useRef<any>(null);
    const orbitControlsRef = useRef<OrbitControls | null>(null);
    const originalColorsRef = useRef<Map<string, THREE.Color>>(new Map());

    // animation state
    const animationProgressRef = useRef(1);
    const previousStateRef = useRef({ phaseIndex, subStepIndex });
    const animationStartTimeRef = useRef(0);

    // lưu camera
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    useEffect(() => {
        let frameId: number;

        const setup = async () => {
            if (!glRef.current) return;
            const gl = glRef.current;

            // Renderer
            const renderer = new Renderer({ gl });
            renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight, false);

            // Camera
            const camera = new THREE.PerspectiveCamera(
                75,
                gl.drawingBufferWidth / gl.drawingBufferHeight,
                0.1,
                1000
            );
            camera.position.set(0, 2, 5);
            cameraRef.current = camera;

            // Controls (RN-friendly)
            const controls = new OrbitControls(camera, gl);
            controls.enableDamping = true;
            orbitControlsRef.current = controls;

            // Save original colors
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = child.material.clone();
                    originalColorsRef.current.set(
                        child.uuid,
                        child.material.color.clone()
                    );
                }
            });

            // Initial state
            applyStep(scene, animationData[0]?.subSteps?.[0], camera, controls);

            const animate = (time: number) => {
                frameId = requestAnimationFrame(animate);

                // interpolation progress
                if (animationProgressRef.current < 1) {
                    const elapsed = (time - animationStartTimeRef.current) / 1000;
                    animationProgressRef.current = Math.min(
                        elapsed / ANIMATION_DURATION,
                        1
                    );

                    interpolateStep(
                        scene,
                        animationData,
                        previousStateRef.current,
                        { phaseIndex, subStepIndex },
                        animationProgressRef.current,
                        camera,
                        controls
                    );
                }

                controls.update();
                renderer.render(scene, camera);
                gl.endFrameEXP();
            };

            frameId = requestAnimationFrame(animate);
        };

        setup();

        return () => cancelAnimationFrame(frameId);
    }, []);

    // Khi đổi step → reset animation
    useEffect(() => {
        previousStateRef.current = {
            phaseIndex,
            subStepIndex,
        };
        animationProgressRef.current = 0;
        animationStartTimeRef.current = performance.now();
    }, [phaseIndex, subStepIndex]);

    return (
        <GLView
            style={{ flex: 1 }}
            onContextCreate={(gl) => (glRef.current = gl)}
        />
    );
}

/**
 * Apply state ngay lập tức
 */
function applyStep(
    scene: THREE.Object3D,
    step: any,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
) {
    if (!step) return;

    scene.traverse((child) => {
        const transform = step.transforms?.[child.name];
        if (transform) {
            child.position.fromArray(transform.position);
            child.quaternion.fromArray(transform.quaternion);
            child.scale.fromArray(transform.scale);
        }

        if (child instanceof THREE.Mesh) {
            const colorHex = step.colorOverrides?.[child.name];
            if (colorHex) child.material.color.set(colorHex);
        }

        child.visible = step.visibility?.[child.name] ?? true;
    });

    if (step.cameraState) {
        camera.position.fromArray(step.cameraState.position);
        controls.target.fromArray(step.cameraState.target);
        controls.update();
    }
}

/**
 * Interpolation giữa 2 step
 */
function interpolateStep(
    scene: THREE.Object3D,
    animationData: any,
    prev: { phaseIndex: number; subStepIndex: number },
    next: { phaseIndex: number; subStepIndex: number },
    t: number,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
) {
    const prevPhase = animationData[prev.phaseIndex];
    const prevStep = prevPhase?.subSteps[prev.subStepIndex];

    const nextPhase = animationData[next.phaseIndex];
    const nextStep = nextPhase?.subSteps[next.subStepIndex];

    if (!prevStep || !nextStep) return;

    scene.traverse((child) => {
        const from = prevStep.transforms?.[child.name];
        const to = nextStep.transforms?.[child.name];

        if (from && to) {
            // position
            const pos = new THREE.Vector3().fromArray(from.position).lerp(
                new THREE.Vector3().fromArray(to.position),
                t
            );
            child.position.copy(pos);

            // quaternion
            const quatFrom = new THREE.Quaternion().fromArray(from.quaternion);
            const quatTo = new THREE.Quaternion().fromArray(to.quaternion);
            child.quaternion.slerpQuaternions(quatFrom, quatTo, t);

            // scale
            const scale = new THREE.Vector3().fromArray(from.scale).lerp(
                new THREE.Vector3().fromArray(to.scale),
                t
            );
            child.scale.copy(scale);
        }

        // visibility
        if (nextStep.visibility?.[child.name] !== undefined) {
            child.visible = nextStep.visibility[child.name];
        }

        // color override
        if (child instanceof THREE.Mesh) {
            const fromColor = new THREE.Color(
                prevPhase.colorOverrides?.[child.name] ?? "#ffffff"
            );
            const toColor = new THREE.Color(
                nextPhase.colorOverrides?.[child.name] ?? fromColor
            );
            child.material.color.lerpColors(fromColor, toColor, t);
        }
    });

    // Camera interpolation
    if (prevStep.cameraState && nextStep.cameraState) {
        const fromPos = new THREE.Vector3().fromArray(prevStep.cameraState.position);
        const toPos = new THREE.Vector3().fromArray(nextStep.cameraState.position);
        camera.position.copy(fromPos.lerp(toPos, t));

        const fromTarget = new THREE.Vector3().fromArray(prevStep.cameraState.target);
        const toTarget = new THREE.Vector3().fromArray(nextStep.cameraState.target);
        controls.target.copy(fromTarget.lerp(toTarget, t));
        controls.update();
    }
}
