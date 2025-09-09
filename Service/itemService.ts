// services/itemService.ts

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1OTBlNGFlNTY4OWE0ODVjMjVlMzEiLCJlbWFpbCI6InByb3JvY2ttYW4xMTNAZ21haWwuY29tIiwiaWF0IjoxNzU3NDE2MzY1LCJleHAiOjE3NTc0NTk1NjV9.rO8Ib6gG9fciKbpa4N423hNb1AYcldc2JeWm_LbgFUY";

export const fetchAllItems = async () => {
  const res = await fetch("http://35.238.30.208:58203/catalog/items/all", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData?.message || `HTTP error ${res.status}`);
  }

  return res.json();
};