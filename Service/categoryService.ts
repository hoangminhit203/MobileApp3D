// Service/categoryService.ts

// import { API_CONFIG, apiCall } from "@/api/api";
import { fakeCategories, simulateDelay } from "@/data/fakeData";

// const jwt =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDE2MzY1LCJleHAiOjE3NTc0NTk1NjV9.rO8Ib6gG9fciKbpa4N423hNb1AYcldc2JeWm_LbgFUY";

// Fetch all categories - Using fake data instead of API
export const fetchAllCategories = async () => {
    await simulateDelay(300); // Simulate network delay
    return fakeCategories;
    // return apiCall(API_CONFIG.ENDPOINTS.CATEGORIES.ALL, {}, jwt);
};

// Fetch category by ID - Using fake data instead of API
export const fetchCategoryById = async (id: string) => {
    await simulateDelay(200);
    const category = fakeCategories.find(cat => cat.id.toString() === id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }
    return category;
    // return apiCall(API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id), {}, jwt);
};

// Create new category (if your API supports it) - COMMENTED OUT - USING FAKE DATA
// export const createCategory = async (categoryData: any) => {
//     return apiCall(
//         API_CONFIG.ENDPOINTS.CATEGORIES.ALL,
//         {
//             method: "POST",
//             body: JSON.stringify(categoryData),
//         },
//         jwt
//     );
// };

// Update category (if your API supports it) - COMMENTED OUT - USING FAKE DATA
// export const updateCategory = async (id: string, categoryData: any) => {
//     return apiCall(
//         API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id),
//         {
//             method: "PUT",
//             body: JSON.stringify(categoryData),
//         },
//         jwt
//     );
// };

// Delete category (if your API supports it) - COMMENTED OUT - USING FAKE DATA
// export const deleteCategory = async (id: string) => {
//     return apiCall(
//         API_CONFIG.ENDPOINTS.CATEGORIES.BY_ID(id),
//         {
//             method: "DELETE",
//         },
//         jwt
//     );
// };
