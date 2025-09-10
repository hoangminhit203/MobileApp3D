const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDc2NjA2LCJleHAiOjE3NTc1MTk4MDZ9.NDPVVhwrY7z-SQGYGrQDm910GaPSNpQszfuP-bAn61g";

export const fetchAllItems = async () => {
    const res = await fetch("http://35.238.30.208:58203/catalog/items/all", {
        headers: {
            Authorization: `Bearer ${jwt}`, //  sửa lại ở đây
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || `HTTP error ${res.status}`);
    }

    return res.json();
};
