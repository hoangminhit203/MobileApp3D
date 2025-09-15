const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3OTA2MzYxLCJleHAiOjE3NTc5NDk1NjF9.e028WctUmdcIPcGEezDGQh5QbaYw4aiidLlnN8mZgrY";
const BASE_URL = "http://35.238.30.208:58203";
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            "x-testing-header": "true",
            Authorization: `Bearer ${jwt}`, // 🔹 gắn cứng jwt
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });
    if (!res.ok) {
        let errMessage = `HTTP error ${res.status}`;
        try {
            const errData = await res.json();
            errMessage = errData?.message || errMessage;
        } catch { }
        throw new Error(errMessage);

    }

    return res.json();
};

// 🔹 Lấy toàn bộ catalog items
export const getAllCatalog = async () => {
    return fetchWithAuth("/catalog/items/all");
};

// 🔹 Lấy catalog theo id
export const getCatalog = async (id: string) => {
    return fetchWithAuth(`/catalog/items/${id}`);
};

// 🔹 Lấy nhiều catalog theo filter
export const getCatalogs = async (payload: object) => {
    return fetchWithAuth("/catalog/get", {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

// 🔹 Lấy catalog public
export const getPublishCatalog = async (id: string) => {
    return fetchWithAuth(`/catalog/itemPublic/${id}`);
};