// services/itemService.ts

const BASE_URL = "http://35.238.30.208:58203";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDE2MzY1LCJleHAiOjE3NTc0NTk1NjV9.rO8Ib6gG9fciKbpa4N423hNb1AYcldc2JeWm_LbgFUY";

// Common headers for API requests
const getHeaders = () => ({
  Authorization: `Bearer ${jwt}`,
  "Content-Type": "application/json",
});

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData?.message || `HTTP error ${response.status}`);
  }
  return response.json();
};

// Fetch all items
export const fetchAllItems = async () => {
  const response = await fetch(`${BASE_URL}/catalog/items/all`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// Fetch item by ID
export const fetchItemById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/catalog/items/${id}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// Search items
export const searchItems = async (query: string) => {
  const response = await fetch(`${BASE_URL}/catalog/items/search?q=${encodeURIComponent(query)}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// Fetch items by category
export const fetchItemsByCategory = async (categoryId: string) => {
  const response = await fetch(`${BASE_URL}/catalog/items/category/${categoryId}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/catalog/categories`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};