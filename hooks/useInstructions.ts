import { getCatalog } from "@/api/catelogApi";
import { Step } from "@/types/catalog";
import { useEffect, useState } from "react";

export const useInstructions = (id?: string) => {
    const [steps, setSteps] = useState<Step[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const catalog = await getCatalog(id);

                let tutorialSteps: any[] | null = null;

                // Ưu tiên tutorials.step trước (có TTS text chi tiết)
                tutorialSteps =
                    catalog?.properties?.product?.tutorials?.step ||
                    catalog?.properties?.product?.instructions?.tutorials?.step ||
                    catalog?.properties?.product?.instructions?.multiActions?.hotspots ||
                    null;

                if (tutorialSteps && Array.isArray(tutorialSteps)) {
                    // Nếu là tutorials.step, sử dụng trực tiếp (đã có TTS text chi tiết)
                    if (catalog?.properties?.product?.tutorials?.step ||
                        catalog?.properties?.product?.instructions?.tutorials?.step) {
                        // Chỉ lấy steps hợp lệ (có camera data)
                        const validSteps = tutorialSteps.filter(
                            (step: any) =>
                                step.camera &&
                                step.camera.cameraOrbit &&
                                step.camera.fieldOfView &&
                                step.camera.target
                        );
                        setSteps(validSteps);
                    }
                    // Nếu là hotspots, map sang step format chuẩn
                    else if (catalog?.properties?.product?.instructions?.multiActions?.hotspots) {
                        const convertedSteps = tutorialSteps.map(
                            (hotspot: any, index: number) => ({
                                _id: hotspot.label || `Step ${index + 1}`,
                                tts: hotspot.content || hotspot.label || "No description",
                                time: "3",
                                camera: {
                                    cameraOrbit: hotspot.cameraOrbit,
                                    fieldOfView: hotspot.fieldOfView,
                                    target: hotspot.target,
                                },
                                tools: [],
                                tips: [],
                                start: null,
                            })
                        );
                        setSteps(convertedSteps);
                    }
                } else {
                    setSteps([]);
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load instructions"
                );
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
        hasInstructions: steps.length > 0,
    };
};
