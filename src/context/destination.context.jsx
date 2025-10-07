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

  return (
    <TravelContext.Provider
      value={{ destinations, setDestinations, getDestinations }}
    >
      {children}
    </TravelContext.Provider>
  );
};

const useTravel = () => {
  return useContext(TravelContext);
};

export { TravelProvider, useTravel };
