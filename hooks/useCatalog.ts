import { CatalogContext } from '@/Context/CatalogContext';
import { useContext } from "react";
export const useCatalog = () => {
    const ctx = useContext(CatalogContext);
    if (!ctx) {
        throw new Error("useCatalog must be used inside CatalogProvider");
    }
    return ctx;
};
