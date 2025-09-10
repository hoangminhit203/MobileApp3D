// Service/authService.ts - COMMENTED OUT - USING FAKE DATA

// import { API_CONFIG, apiCall } from "@/api/api";
import { simulateDelay } from "@/data/fakeData";

// Fake user data for authentication
const fakeUsers = [
    { id: 1, email: "test@example.com", password: "123456", name: "Test User" },
    { id: 2, email: "admin@example.com", password: "admin123", name: "Admin User" },
];

// User login - Using fake data instead of API
export const login = async (email: string, password: string) => {
    await simulateDelay(500);

    const user = fakeUsers.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    return {
        user: { id: user.id, email: user.email, name: user.name },
        token: "fake-jwt-token-12345"
    };

    // return apiCall(API_CONFIG.ENDPOINTS.USER.LOGIN, {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    // });
};

// User registration - Using fake data instead of API
export const register = async (userData: {
    email: string;
    password: string;
    name?: string;
}) => {
    await simulateDelay(400);

    // Check if user already exists
    const existingUser = fakeUsers.find(u => u.email === userData.email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const newUser = {
        id: fakeUsers.length + 1,
        email: userData.email,
        password: userData.password,
        name: userData.name || "New User"
    };

    fakeUsers.push(newUser);

    return {
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
        token: "fake-jwt-token-12345"
    };

    // return apiCall(API_CONFIG.ENDPOINTS.USER.REGISTER, {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    // });
};

// Get user profile - Using fake data instead of API
export const getUserProfile = async (token: string) => {
    await simulateDelay(200);

    if (!token || token !== "fake-jwt-token-12345") {
        throw new Error("Invalid token");
    }

    return fakeUsers[0]; // Return first user as default

    // return apiCall(API_CONFIG.ENDPOINTS.USER.PROFILE, {}, token);
};

// Update user profile - Using fake data instead of API
export const updateUserProfile = async (token: string, userData: any) => {
    await simulateDelay(300);

    if (!token || token !== "fake-jwt-token-12345") {
        throw new Error("Invalid token");
    }

    // Simulate update
    const updatedUser = { ...fakeUsers[0], ...userData };
    return updatedUser;

    // return apiCall(
    //     API_CONFIG.ENDPOINTS.USER.PROFILE,
    //     {
    //         method: "PUT",
    //         body: JSON.stringify(userData),
    //     },
    //     token
    // );
};
