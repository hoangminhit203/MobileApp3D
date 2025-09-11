
import { getAllCatalog } from "@/api/catelogApi";
import { CatalogItem } from "@/types/catalog";
import React, { createContext, useEffect, useState } from "react";

type CatalogContextType = {
    items: CatalogItem[];
    loading: boolean;
    refresh: () => Promise<void>;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getAllCatalog(); // gọi API
            setItems(data);
        } catch (err) {
            console.error("Failed to fetch catalog items", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CatalogContext.Provider value={{ items, loading, refresh: fetchData }}>
            {children}
        </CatalogContext.Provider>
    );
};




