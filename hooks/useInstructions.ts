import { getCatalog } from "@/api/catelogApi";
import { Step } from "@/types/catalog";
import { useEffect, useState } from "react";

export const useInstructions = (id?: string) => {
    const [steps, setSteps] = useState<Step[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('=== useInstructions Debug ===');
        console.log('ID received:', id);
        console.log('ID type:', typeof id);

        if (!id) {
            console.log('No ID provided, stopping');
            setLoading(false);
            return;
        }

        (async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('Calling getCatalog with ID:', id);
                const catalog = await getCatalog(id);
                console.log('API Response received');
                console.log('Catalog exists:', !!catalog);
                console.log('Full catalog data:', JSON.stringify(catalog, null, 2));

                // Debug các path có thể có
                console.log('=== Checking different paths ===');
                console.log('catalog?.properties:', catalog?.properties);
                console.log('catalog?.properties?.product:', catalog?.properties?.product);
                console.log('catalog?.properties?.product?.tutorials:', catalog?.properties?.product?.tutorials);
                console.log('catalog?.properties?.product?.tutorial:', catalog?.properties?.product?.tutorial);
                console.log('catalog?.tutorials:', catalog?.tutorials);
                console.log('catalog?.tutorial:', catalog?.tutorial);
                console.log('catalog?.steps:', catalog?.steps);

                // Thử nhiều path khác nhau để tìm tutorial data
                let tutorialSteps = null;

                // Path mới: instructions.multiActions.hotspots
                tutorialSteps = catalog?.properties?.product?.instructions?.multiActions?.hotspots;
                if (tutorialSteps && Array.isArray(tutorialSteps)) {
                    console.log('Found tutorial steps at: properties.product.instructions.multiActions.hotspots');
                    console.log('Steps count:', tutorialSteps.length);
                } else {
                    // Path cũ: properties.product.tutorials.step
                    tutorialSteps = catalog?.properties?.product?.tutorials?.step;
                    if (tutorialSteps && Array.isArray(tutorialSteps)) {
                        console.log('Found tutorial steps at: properties.product.tutorials.step');
                    } else {
                        // Path khác: instructions.tutorials.step
                        tutorialSteps = catalog?.properties?.product?.instructions?.tutorials?.step;
                        if (tutorialSteps && Array.isArray(tutorialSteps)) {
                            console.log('Found tutorial steps at: properties.product.instructions.tutorials.step');
                        } else {
                            console.log('No tutorial data found in any expected location');
                        }
                    }
                }

                console.log('Final tutorial steps:', tutorialSteps); if (tutorialSteps && Array.isArray(tutorialSteps)) {
                    // Nếu là hotspots, cần map structure khác
                    if (catalog?.properties?.product?.instructions?.multiActions?.hotspots) {
                        // Chuyển đổi hotspots thành step format
                        const convertedSteps = tutorialSteps.map((hotspot: any, index: number) => ({
                            _id: hotspot.label || `Step ${index + 1}`,
                            tts: hotspot.content || hotspot.label || 'No description',
                            time: "3", // default time
                            camera: {
                                cameraOrbit: hotspot.cameraOrbit,
                                fieldOfView: hotspot.fieldOfView,
                                target: hotspot.target
                            },
                            tools: [], // empty array for tools
                            tips: [], // empty array for tips  
                            start: null // default start
                        }));
                        console.log('Converted hotspots to steps:', convertedSteps.length);
                        setSteps(convertedSteps);
                    } else {
                        // Filter out invalid steps (steps với camera data không hợp lệ)
                        const validSteps = tutorialSteps.filter((step: any) =>
                            step.camera &&
                            step.camera.cameraOrbit &&
                            step.camera.fieldOfView &&
                            step.camera.target
                        );
                        console.log('Valid steps found:', validSteps.length);
                        setSteps(validSteps);
                    }
                } else {
                    console.log('No tutorial steps found or invalid format');
                    setSteps([]);
                }
            } catch (err) {
                console.error("Failed to load instructions:", err);
                setError(err instanceof Error ? err.message : "Failed to load instructions");
                setSteps([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return {
        steps,
        loading,
        error,
        hasInstructions: steps.length > 0
    };
};
