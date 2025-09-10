// hooks/useApi.ts

import { useEffect, useState } from "react";

interface UseApiOptions<T> {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export function useApi<T>(
    apiFunction: () => Promise<T>,
    options: UseApiOptions<T> = {}
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { immediate = false, onSuccess, onError } = options;

    const execute = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction();
            setData(result);
            onSuccess?.(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || "An error occurred";
            setError(errorMessage);
            onError?.(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]);

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
}

// Specific hook for items
export function useItems() {
    return useApi(() => import("@/Service/itemService").then(m => m.fetchAllItems()));
}

// Specific hook for categories
export function useCategories() {
    return useApi(() => import("@/Service/categoryService").then(m => m.fetchAllCategories()));
}
