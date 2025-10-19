import { createContext, useContext, useState } from "react";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  // get singolo record
  const getobj = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cities/${id}`);
      if (!response.ok) {
        return null;
      }
      const obj = await response.json();
      return obj.city || obj;
    } catch (error) {
      console.error(`Error fetching record ${id}:`, error);
      return null;
    }
  };

  // chiamata delle destinazioni con supporto per query parameters
  const getDestinations = async (queryString = "") => {
    try {
      let url = "http://localhost:3001/cities";
      if (queryString) {
        url += `?${queryString}`;
        // Per query con parametri, usa l'endpoint diretto
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const cities = Array.isArray(data) ? data : [data];
          setDestinations(cities.map((item) => item.city || item));
          return;
        }
      }

      // carica tutte le destinazioni individualmente
      const promises = [];
      for (let id = 1; id <= 56; id++) {
        const objPromise = getobj(id);
        promises.push(objPromise);
      }

      const results = await Promise.all(promises);
      const cities = results.filter((city) => city !== null);

      if (cities.length > 0) {
        setDestinations(cities);
      }
    } catch (error) {
      console.error("Error loading destinations:", error);
    }
  };

  const cities = destinations.map((item) => {
    return item.city || item;
  });

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

  function orderForName() {
    const sorted = [...destinations].sort((a, b) => {
      const titleA = a.title || a.name || "";
      const titleB = b.title || b.name || "";
      return sortAsc
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
    setDestinations(sorted);
  }

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  return (
    <TravelContext.Provider
      value={{
        cities,
        setDestinations,
        getDestinations,
        addToWishlist,
        orderForName,
        sortAsc,
        setSortAsc,
        debounce,
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
