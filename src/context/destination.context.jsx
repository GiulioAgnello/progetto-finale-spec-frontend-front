import { createContext, useContext, useState } from "react";

const TravelContext = createContext();

const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);

  const getDestinations = async () => {
    try {
      const response = await fetch("http://localhost:3001/cities");
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
