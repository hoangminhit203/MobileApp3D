// COMMENTED OUT - USING FAKE DATA INSTEAD
// const jwt =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDc2NjA2LCJleHAiOjE3NTc1MTk4MDZ9.NDPVVhwrY7z-SQGYGrQDm910GaPSNpQszfuP-bAn61g";

import { fakeItems, simulateDelay } from "@/data/fakeData";

// Fetch all items - Using fake data instead of API
export const fetchAllItems = async () => {
    await simulateDelay(300);
    return fakeItems;
    // const res = await fetch("http://35.238.30.208:58203/catalog/items/all", {
    //     headers: {
    //         Authorization: `Bearer ${jwt}`, // ✅ sửa lại ở đây
    //         "Content-Type": "application/json",
    //     },
    // });

    // if (!res.ok) {
    //     const errData = await res.json();
    //     throw new Error(errData?.message || `HTTP error ${res.status}`);
    // }

    // return res.json();
};
