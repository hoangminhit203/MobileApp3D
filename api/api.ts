// api/api.ts - Configuration for API

export const API_CONFIG = {
    BASE_URL: "http://35.238.30.208:58203",
    ENDPOINTS: {
        ITEMS: {
            ALL: "/catalog/items/all",
            BY_ID: (id: string) => `/catalog/items/${id}`,
            SEARCH: "/catalog/items/search",
            BY_CATEGORY: (categoryId: string) => `/catalog/items/category/${categoryId}`,
        },
        CATEGORIES: {
            ALL: "/catalog/categories",
            BY_ID: (id: string) => `/catalog/categories/${id}`,
        },
        USER: {
            PROFILE: "/user/profile",
            LOGIN: "/auth/login",
            REGISTER: "/auth/register",
        },
    },
};

// Default headers
export const getDefaultHeaders = (token?: string) => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
});

// API response handler
export const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || `HTTP error ${response.status}`);
    }
    return response.json();
};

// Generic API caller
export const apiCall = async (
    endpoint: string,
    options: RequestInit = {},
    token?: string
) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = {
        ...getDefaultHeaders(token),
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return handleApiResponse(response);
};
