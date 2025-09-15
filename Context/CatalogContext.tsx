import { getLoginUser, getType } from "@/api/apiClient";
import { getAllCatalog } from "@/api/catelogApi";
import { CatalogItem, CatalogType } from "@/types/catalog";
import React, { createContext, useEffect, useState } from "react";

type CatalogContextType = {
  items: CatalogItem[];
  catalogs: CatalogType[];
  loading: boolean;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined
);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [catalogs, setCatalog] = useState([] as CatalogType[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const loginRes = await getLoginUser();
        console.log("Login response:", loginRes);

        const [itemsData, catalogsData] = await Promise.all([
          getAllCatalog(),
          getType(),
        ]);
        setItems(itemsData);
        setCatalog(catalogsData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CatalogContext.Provider value={{ items, loading, catalogs }}>
      {children}
    </CatalogContext.Provider>
  );
};
