import { CatalogType } from "@/types/catalog";

const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3OTkzNDQ0LCJleHAiOjE3NTgwMzY2NDR9.YvcpMyyfTSxjd8PpHT6eO05_HFX0Jyca8jmLoOoR4V0"

export const fetchAllItems = async () => {
    const res = await fetch("http://35.238.30.208:58203/catalog/items/all", {
        headers: {
            "x-testing-header": 'true',
            Authorization: `Bearer ${jwt}`,
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

export const getLoginUser = async () => {
    try {
        const response = await fetch("http://35.238.30.208:58203/accounts/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-testing-header": "true",
            },
            body: JSON.stringify({
                email: "prorockman113@gmail.com",
                password: "Abcd1234!",
            }),
        });

        if (!response.ok) {
            let errMessage = `HTTP error ${response.status}`;
            try {
                const errData = await response.json();
                errMessage = errData?.message || errMessage;
            } catch {
                // fallback nếu không parse được JSON
            }
            throw new Error(errMessage);
        }

        return response.json();
    } catch (error) {
        console.error("getLoginUser API error:", error);
        throw error;
    }
};



export const fetchItemById = async (itemId: string) => {
    const res = await fetch(`http://35.238.30.208:58203/catalog/items/${itemId}`, {
        headers: {
            "x-testing-header": 'true',
            Authorization: `Bearer ${jwt}`,
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
                "x-testing-header": 'true',
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