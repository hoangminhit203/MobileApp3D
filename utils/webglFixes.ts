// WebGL fixes for React Native / Expo
// This file prevents the EXGL renderbufferStorageMultisample error

// Store original Three.js WebGLRenderer methods
import * as THREE from 'three';

// Override Three.js WebGLRenderer to prevent multisampling
const originalWebGLRenderer = THREE.WebGLRenderer;

class FixedWebGLRenderer extends originalWebGLRenderer {
    constructor(parameters?: any) {
        // Force disable antialias and multisampling
        const fixedParams = {
            ...parameters,
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: "default"
        };

        super(fixedParams);

        // Override problematic WebGL methods after construction
        this.setMultisamplingDisabled();
    }

    private setMultisamplingDisabled() {
        const gl = this.getContext() as any;
        if (gl) {
            // Override renderbufferStorageMultisample
            if (gl.renderbufferStorageMultisample) {
                gl.renderbufferStorageMultisample = () => {
                    console.warn('renderbufferStorageMultisample disabled for React Native compatibility');
                };
            }

            // Override getParameter for multisampling queries
            const originalGetParameter = gl.getParameter;
            if (originalGetParameter) {
                gl.getParameter = function (pname: number) {
                    // Return 0 for multisampling parameters
                    if (pname === gl.MAX_SAMPLES || pname === gl.SAMPLES) {
                        return 0;
                    }
                    return originalGetParameter.call(this, pname);
                };
            }
        }
    }
}

// Replace the original WebGLRenderer with our fixed version
(THREE as any).WebGLRenderer = FixedWebGLRenderer;

export { };

