import { createContext, useContext, useState } from "react";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  // get singolo record
  const getobj = async (id, query) => {
    try {
      if (query) {
        id += `?${query}`;
      }
      const response = await fetch(`http://localhost:3001/cities/${id}`);
      if (!response.ok) {
        return null;
      }
      const obj = await response.json();
      return obj.city;
    } catch (error) {
      console.error(`Error fetching record ${id}:`, error);
      return null;
    }
  };

  // chiamata delle destinazioni con supporto per query
  const getDestinations = async (query = "") => {
    try {
      const promises = [];
      for (let id = 1; id <= 56; id++) {
        const objPromise = getobj(id, query);
        promises.push(objPromise);
      }

      const results = await Promise.all(promises);
      const resultsChecked = results.filter((city) => city !== null);

      if (resultsChecked.length > 0) {
        setDestinations(resultsChecked);
      }
    } catch (error) {
      console.error("Error loading destinations:", error);
    }
  };

  const cities = destinations.map((item) => {
    return item;
  });

  // localStorage per wishlist
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

  // ordine per alfabetico
  function orderForName() {
    const sorted = [...destinations].sort((a, b) => {
      const titleA = a.title;
      const titleB = b.title;
      return sortAsc
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
    setDestinations(sorted);
  }

  // funzione di debounce
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  // localStorage per cart
  const addToCart = (destination, quantity = 1) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === destination.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...destination, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Notifica l'aggiornamento del carrello
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <TravelContext.Provider
      value={{
        cities,
        setDestinations,
        getDestinations,
        addToWishlist,
        addToCart,
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
