import { useRef } from 'react';
import * as THREE from 'three';

// Camera control interface
export interface CameraController {
    updateCamera: (camera: {
        cameraOrbit: string;
        fieldOfView: string;
        target: string;
    }) => void;
}

// Parse camera orbit string (e.g., "335.76deg 61.04deg 0.25m")
export const parseCameraOrbit = (orbitString: string) => {
    const parts = orbitString.split(' ');
    if (parts.length !== 3) return null;

    const azimuth = parseFloat(parts[0].replace('deg', '')) * (Math.PI / 180);
    const polar = parseFloat(parts[1].replace('deg', '')) * (Math.PI / 180);
    const radius = parseFloat(parts[2].replace('m', ''));

    return { azimuth, polar, radius };
};

// Parse field of view string (e.g., "24.719657419607387deg")
export const parseFieldOfView = (fovString: string) => {
    return parseFloat(fovString.replace('deg', ''));
};

// Parse target position string (e.g., "0.002037173048490113m 0.02036626364107999m 0.02262780763446561m")
export const parseTarget = (targetString: string) => {
    const parts = targetString.split(' ');
    if (parts.length !== 3) return new THREE.Vector3(0, 0, 0);

    const x = parseFloat(parts[0].replace('m', ''));
    const y = parseFloat(parts[1].replace('m', ''));
    const z = parseFloat(parts[2].replace('m', ''));

    return new THREE.Vector3(x, y, z);
};

// Convert spherical coordinates to cartesian
export const sphericalToCartesian = (azimuth: number, polar: number, radius: number, target: THREE.Vector3) => {
    const x = target.x + radius * Math.sin(polar) * Math.cos(azimuth);
    const y = target.y + radius * Math.cos(polar);
    const z = target.z + radius * Math.sin(polar) * Math.sin(azimuth);

    return new THREE.Vector3(x, y, z);
};

// Custom hook for camera control
export const useCameraController = (camera: THREE.Camera, controls?: any) => {
    const controllerRef = useRef<CameraController>({
        updateCamera: (cameraData) => {
            try {
                // Parse camera data
                const orbit = parseCameraOrbit(cameraData.cameraOrbit);
                const fov = parseFieldOfView(cameraData.fieldOfView);
                const target = parseTarget(cameraData.target);

                if (orbit && camera instanceof THREE.PerspectiveCamera) {
                    // Update FOV
                    camera.fov = fov;
                    camera.updateProjectionMatrix();

                    // Calculate new camera position
                    const newPosition = sphericalToCartesian(orbit.azimuth, orbit.polar, orbit.radius, target);

                    // Animate to new position (or set directly)
                    camera.position.copy(newPosition);
                    camera.lookAt(target);

                    // Update controls if available
                    if (controls) {
                        controls.target.copy(target);
                        controls.update();
                    }

                    console.log('Camera updated:', {
                        position: newPosition,
                        target: target,
                        fov: fov
                    });
                }
            } catch (error) {
                console.error('Failed to update camera:', error);
            }
        }
    });

    return controllerRef.current;
};
