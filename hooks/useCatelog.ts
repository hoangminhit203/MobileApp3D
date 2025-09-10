import { getAllCatalog } from "@/api/catelogApi";
import { CatalogItem } from "@/types/catalog";
import { useEffect, useState } from "react";
export function useCatalog() {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCatalog()
            .then((data) => setItems(data))
            .catch((err) => console.error("API error:", err))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}