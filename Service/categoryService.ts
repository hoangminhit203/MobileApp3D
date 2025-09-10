// Service/categoryService.ts

import { API_CONFIG, apiCall } from "@/api/api";

const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDE2MzY1LCJleHAiOjE3NTc0NTk1NjV9.rO8Ib6gG9fciKbpa4N423hNb1AYcldc2JeWm_LbgFUY";

// Fetch all categories
export const fetchAllCategories = async () => {
    return apiCall(API_CONFIG.ENDPOINTS.CATEGORIES.ALL, {}, jwt);
};

// Fetch category by ID
export const fetchCategoryById = async (id: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id), {}, jwt);
};

// Create new category (if your API supports it)
export const createCategory = async (categoryData: any) => {
    return apiCall(
        API_CONFIG.ENDPOINTS.CATEGORIES.ALL,
        {
            method: "POST",
            body: JSON.stringify(categoryData),
        },
        jwt
    );
};

// Update category (if your API supports it)
export const updateCategory = async (id: string, categoryData: any) => {
    return apiCall(
        API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id),
        {
            method: "PUT",
            body: JSON.stringify(categoryData),
        },
        jwt
    );
};

// Delete category (if your API supports it)
export const deleteCategory = async (id: string) => {
    return apiCall(
        API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id),
        {
            method: "DELETE",
        },
        jwt
    );
};
