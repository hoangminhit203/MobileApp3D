
// COMMENTED OUT API CALL - USING SEED DATA INSTEAD
// import { getAllCatalog } from "@/api/catelogApi";
import seedData from "@/interfaces/seedData";
import { CatalogItem } from "@/types/catalog";
import React, { createContext, useEffect, useState } from "react";

type CatalogContextType = {
    items: CatalogItem[];
    loading: boolean;
    refresh: () => Promise<void>;
};

export const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Convert seed data to CatalogItem format
const convertSeedToCatalogItems = (seed: any[]): CatalogItem[] => {
    const items: CatalogItem[] = [];

    seed.forEach((section, sectionIndex) => {
        section.data.forEach((item: any, itemIndex: number) => {
            const catalogItem: CatalogItem = {
                _id: item.id,
                clientId: `client-${sectionIndex}`,
                organizationId: `org-${sectionIndex}`,
                name: item.title,
                properties: {
                    status: "active",
                    image: [item.imageUrl],
                    dimensions: {
                        L: "100",
                        W: "50",
                        H: "75"
                    },
                    productSku: item.code,
                    published: true,
                    public: true,
                    product: {
                        instructions: {
                            name: "Instructions",
                            multiActions: {
                                name: "Multi Actions",
                                hotspots: [],
                                files: {
                                    glb: "/assets/ABB.glb",
                                    hdr: "",
                                    poster: item.imageUrl,
                                    usdz: null,
                                    exposure: "1",
                                    orientation: "0 0 0"
                                }
                            }
                        },
                        tutorials: {
                            name: "Tutorial",
                            step: [],
                            files: {
                                glb: "/assets/ABB.glb",
                                hdr: "",
                                poster: item.imageUrl,
                                usdz: null,
                                exposure: "1",
                                orientation: "0 0 0"
                            },
                            question: []
                        },
                        localize: {
                            componentsName: [],
                            name: item.title
                        },
                        checkList: {
                            question: [],
                            step: []
                        },
                        item3D: {
                            name: item.title,
                            basePrice: "0",
                            files: {
                                glb: "/assets/ABB.glb",
                                hdr: "",
                                poster: item.imageUrl,
                                usdz: null,
                                exposure: "1",
                                orientation: "0 0 0"
                            },
                            category: [],
                            materials: [],
                            variants: {},
                            hotspots: []
                        }
                    },
                    item3D: {
                        name: item.title,
                        basePrice: "0",
                        files: {
                            glb: "/assets/ABB.glb",
                            hdr: "",
                            poster: item.imageUrl,
                            usdz: null,
                            exposure: "1",
                            orientation: "0 0 0"
                        },
                        category: [],
                        materials: [],
                        variants: {},
                        hotspots: []
                    },
                    specs: {
                        dimensions: {
                            data: [{ name: "Length", content: "100cm" }],
                            hotspot: {
                                label: "Dimensions",
                                position: "0 0 0",
                                normal: "0 1 0",
                                right: "1 0 0",
                                top: "0 0 1"
                            }
                        },
                        capacity: {
                            data: [{ name: "Capacity", content: "50kg" }],
                            hotspot: {
                                label: "Capacity",
                                position: "0 0 0",
                                normal: "0 1 0",
                                right: "1 0 0",
                                top: "0 0 1"
                            }
                        },
                        power: {
                            data: [{ name: "Power", content: "100W" }],
                            hotspot: {
                                label: "Power",
                                position: "0 0 0",
                                normal: "0 1 0",
                                right: "1 0 0",
                                top: "0 0 1"
                            }
                        },
                        fuelCapacity: {
                            data: [{ name: "Fuel", content: "20L" }],
                            hotspot: {
                                label: "Fuel",
                                position: "0 0 0",
                                normal: "0 1 0",
                                right: "1 0 0",
                                top: "0 0 1"
                            }
                        }
                    }
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __v: 0,
                typeId: section.route
            };
            items.push(catalogItem);
        });
    });

    return items;
};

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            // Convert seed data to CatalogItem format
            const catalogItems = convertSeedToCatalogItems(seedData);
            setItems(catalogItems);

            // COMMENTED OUT API CALL
            // const data = await getAllCatalog(); // gọi API
            // setItems(data);
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




