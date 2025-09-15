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

                // Lấy data từ tutorials.step (đúng path theo API structure)
                const tutorialSteps = catalog?.properties?.product?.tutorials?.step;

                if (tutorialSteps && Array.isArray(tutorialSteps)) {
                    // Filter out invalid steps (steps với camera data không hợp lệ)
                    const validSteps = tutorialSteps.filter(step =>
                        step.camera &&
                        step.camera.cameraOrbit &&
                        step.camera.fieldOfView &&
                        step.camera.target
                        // step.camera.cameraOrbit !== "dsadsa" // Filter out test data
                    );
                    setSteps(validSteps);
                } else {
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
