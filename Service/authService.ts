// Service/authService.ts

import { API_CONFIG, apiCall } from "@/api/api";

// User login
export const login = async (email: string, password: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.USER.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
};

// User registration
export const register = async (userData: {
    email: string;
    password: string;
    name?: string;
}) => {
    return apiCall(API_CONFIG.ENDPOINTS.USER.REGISTER, {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

// Get user profile
export const getUserProfile = async (token: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.USER.PROFILE, {}, token);
};

// Update user profile
export const updateUserProfile = async (token: string, userData: any) => {
    return apiCall(
        API_CONFIG.ENDPOINTS.USER.PROFILE,
        {
            method: "PUT",
            body: JSON.stringify(userData),
        },
        token
    );
};
