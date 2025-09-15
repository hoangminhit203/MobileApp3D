import { fetchItemById } from '@/api/apiClient'; // apiClinet chỉ là đăng nhâp không cần id 
import { CatalogItem } from '@/types/catalog';
import { useEffect, useState } from 'react';

// Extract GLB URL from item data
const extractGlbUrl = (itemData: CatalogItem): string | null => {
    // Priority order: instructions > tutorials > item3D > product.item3D

    // 1. Tìm trong product.instructions.multiActions.files.glb (path chính)
    const instructionsGlb = itemData.properties?.product?.instructions?.multiActions?.files?.glb;
    if (instructionsGlb) return instructionsGlb;

    // 2. Tìm trong product.tutorials.files.glb
    const tutorialsGlb = itemData.properties?.product?.tutorials?.files?.glb;
    if (tutorialsGlb) return tutorialsGlb;

    // 3. Tìm trong item3D.files.glb
    const item3dGlb = itemData.properties?.item3D?.files?.glb;
    if (item3dGlb) return item3dGlb;

    // 4. Tìm trong product.item3D.files.glb
    const productItem3dGlb = itemData.properties?.product?.item3D?.files?.glb;
    if (productItem3dGlb) return productItem3dGlb;

    return null;
};

interface Use3DModelResult {
    modelUrl: string | null;
    loading: boolean;
    error: string | null;
    itemData: CatalogItem | null;
}

export const use3DModel = (itemId?: string, fallbackUrl?: string, enableDebug?: boolean): Use3DModelResult => {
    const [modelUrl, setModelUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [itemData, setItemData] = useState<CatalogItem | null>(null);

    useEffect(() => {
        const fetchModel = async () => {
            // Reset states
            setError(null);
            setModelUrl(null);
            setItemData(null);

            // Nếu có fallbackUrl và không có itemId, sử dụng fallbackUrl
            if (fallbackUrl && !itemId) {
                setModelUrl(fallbackUrl);
                return;
            }

            // Nếu không có itemId thì không làm gì
            if (!itemId) {
                return;
            }

            setLoading(true);

            try {
                const data: CatalogItem = await fetchItemById(itemId);
                setItemData(data);

                // Debug logging nếu được enable
                if (enableDebug) {
                    console.log('=== DEBUG ITEM STRUCTURE ===');
                    console.log('Item ID:', data._id);
                    console.log('Item Name:', data.name);
                    console.log('Full structure:', JSON.stringify(data.properties, null, 2));
                    console.log('=== END DEBUG ===');
                }                // Sử dụng helper function để extract GLB URL
                const glbUrl = extractGlbUrl(data);

                if (glbUrl) {
                    setModelUrl(glbUrl);
                    if (enableDebug) {
                        console.log('✅ Found GLB URL:', glbUrl);
                    }
                } else {
                    setError('Không tìm thấy file 3D model cho item này');
                    if (enableDebug) {
                        console.log('❌ No GLB URL found in item data');
                    }
                }
            } catch (err) {
                const errorMessage = 'Không thể tải dữ liệu 3D model: ' + (err instanceof Error ? err.message : 'Unknown error');
                setError(errorMessage);
                if (enableDebug) {
                    console.error('❌ Error fetching item:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchModel();
    }, [itemId, fallbackUrl, enableDebug]);

    return {
        modelUrl,
        loading,
        error,
        itemData,
    };
};