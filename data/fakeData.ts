// data/fakeData.ts
import { images } from "@/constants/images";

export const fakeCategories = [
    {
        id: 1,
        title: "FURNITURE",
        name: "FURNITURE",
        image: images.hansrobot,
        description: "Modern furniture collection"
    },
    {
        id: 2,
        title: "TOYS",
        name: "TOYS",
        image: images.hubspot,
        description: "Educational and fun toys"
    },
    {
        id: 3,
        title: "SPORTS",
        name: "SPORTS",
        image: images.yamaha,
        description: "Sports equipment and accessories"
    },
    {
        id: 4,
        title: "BABY + KIDS",
        name: "BABY + KIDS",
        image: images.hansrobot,
        description: "Baby and kids products"
    },
    {
        id: 5,
        title: "ELECTRONICS",
        name: "ELECTRONICS",
        image: images.hubspot,
        description: "Latest electronic devices"
    },
    {
        id: 6,
        title: "HOBBIES",
        name: "HOBBIES",
        image: images.yamaha,
        description: "Hobby and craft supplies"
    },
];

export const fakeItems = [
    {
        id: 1,
        title: "Modern Chair",
        name: "Modern Chair",
        category: "FURNITURE",
        code: "FUR001",
        imageUrl: images.hansrobot,
        description: "Comfortable modern chair",
        price: 299.99
    },
    {
        id: 2,
        title: "Gaming Console",
        name: "Gaming Console",
        category: "ELECTRONICS",
        code: "ELE001",
        imageUrl: images.hubspot,
        description: "Latest gaming console",
        price: 499.99
    },
    {
        id: 3,
        title: "Basketball",
        name: "Basketball",
        category: "SPORTS",
        code: "SPT001",
        imageUrl: images.yamaha,
        description: "Professional basketball",
        price: 29.99
    },
    {
        id: 4,
        title: "Wooden Table",
        name: "Wooden Table",
        category: "FURNITURE",
        code: "FUR002",
        imageUrl: images.hansrobot,
        description: "Solid wood dining table",
        price: 899.99
    },
    {
        id: 5,
        title: "Laptop",
        name: "Laptop",
        category: "ELECTRONICS",
        code: "ELE002",
        imageUrl: images.hubspot,
        description: "High performance laptop",
        price: 1299.99
    },
    {
        id: 6,
        title: "Tennis Racket",
        name: "Tennis Racket",
        category: "SPORTS",
        code: "SPT002",
        imageUrl: images.yamaha,
        description: "Professional tennis racket",
        price: 159.99
    },
    {
        id: 7,
        title: "Building Blocks",
        name: "Building Blocks",
        category: "TOYS",
        code: "TOY001",
        imageUrl: images.hansrobot,
        description: "Educational building blocks",
        price: 49.99
    },
    {
        id: 8,
        title: "Baby Stroller",
        name: "Baby Stroller",
        category: "BABY + KIDS",
        code: "BAB001",
        imageUrl: images.hubspot,
        description: "Comfortable baby stroller",
        price: 399.99
    },
    {
        id: 9,
        title: "Paint Set",
        name: "Paint Set",
        category: "HOBBIES",
        code: "HOB001",
        imageUrl: images.yamaha,
        description: "Complete painting set",
        price: 79.99
    },
    {
        id: 10,
        title: "Sofa",
        name: "Sofa",
        category: "FURNITURE",
        code: "FUR003",
        imageUrl: images.hansrobot,
        description: "Comfortable 3-seat sofa",
        price: 1299.99
    }
];

// Helper function to simulate API delay
export const simulateDelay = (ms: number = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Search function for items
export const searchFakeItems = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return fakeItems.filter(item =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.code.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
    );
};

// Get items by category
export const getItemsByCategory = (category: string) => {
    return fakeItems.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
    );
};

// Get item by ID
export const getItemById = (id: number) => {
    return fakeItems.find(item => item.id === id);
};
