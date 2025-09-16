// WebGL fixes for React Native / Expo
// Prevents EXGL multisampling errors when using Three.js

import * as THREE from 'three';

const originalWebGLRenderer = THREE.WebGLRenderer;

class FixedWebGLRenderer extends originalWebGLRenderer {
    constructor(parameters?: any) {
        // Force disable antialias + multisampling (Expo GL chưa hỗ trợ)
        const fixedParams = {
            ...parameters,
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: "default"
        };
        super(fixedParams);

        this.disableMultisampling();
    }

    private disableMultisampling() {
        const gl = this.getContext() as any;
        if (!gl) return;

        // Override renderbufferStorageMultisample (ngăn crash)
        if (gl.renderbufferStorageMultisample) {
            gl.renderbufferStorageMultisample = () => {
                console.warn("renderbufferStorageMultisample disabled for Expo compatibility");
            };
        }

        // Fake lại giá trị khi Three.js query MSAA
        const originalGetParameter = gl.getParameter;
        if (originalGetParameter) {
            gl.getParameter = function (pname: number) {
                if (pname === gl.MAX_SAMPLES || pname === gl.SAMPLES) {
                    return 0; // Không hỗ trợ MSAA
                }
                return originalGetParameter.call(this, pname);
            };
        }
    }
}

// Thay thế WebGLRenderer gốc
(THREE as any).WebGLRenderer = FixedWebGLRenderer;

export { };

