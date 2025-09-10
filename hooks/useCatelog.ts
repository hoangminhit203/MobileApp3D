import { getAllCatalog } from "@/api/catelogApi";
import { useEffect, useState } from "react";

export function useCatalog() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCatalog()
            .then((data) => setItems(data))
            .catch((err) => console.error("API error:", err))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}