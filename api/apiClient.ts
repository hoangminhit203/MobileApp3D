import { CatalogType } from "@/types/catalog";

const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NTYyNDA4LCJleHAiOjE3NTc2MDU2MDh9.efwuQgKNlCS15m17kRNe6Bty-hpucZRIYFXP7rzd3tU";

export const fetchAllItems = async () => {
    const res = await fetch("http://35.238.30.208:58203/catalog/items/all", {
        headers: {
            Authorization: `Bearer ${jwt}`, // ✅ sửa đúng template string
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        let errMessage = `HTTP error ${res.status}`;
        try {
            const errData = await res.json();
            errMessage = errData?.message || errMessage;
        } catch (e) {
            // fallback nếu res không phải JSON
        }
        throw new Error(errMessage);
    }

    return res.json();
};

export const getType = async (): Promise<CatalogType[]> => {
    try {
        const response = await fetch(`http://35.238.30.208:58203/type/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`, // nếu cần JWT thì thêm vào đây
            },
            body: JSON.stringify({
                "aggregate": [
                    {
                        "$project": {
                            "name": 1,
                            "id": 1
                        }
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("getType API error:", error);
        throw error;
    }
};