import { createContext, useContext, useState } from "react";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);

  const getDestinations = async (query) => {
    try {
      const url = query
        ? `http://localhost:3001/cities?${query
            .replace("q=", "search=")
            .replace("type=", "category=")}`
        : "http://localhost:3001/cities";
      console.log("Fetching:", url);
      const response = await fetch(url);
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const addToWishlist = (destination) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === destination.id);
    if (exists) {
      wishlist = wishlist.filter((item) => item.id !== destination.id);
    } else {
      wishlist.push(destination);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        setDestinations,
        getDestinations,
        addToWishlist,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

const useTravel = () => {
  return useContext(TravelContext);
};

export { TravelProvider, useTravel };
