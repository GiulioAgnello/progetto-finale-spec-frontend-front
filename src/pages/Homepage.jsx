import { useEffect, useState, useCallback, useMemo } from "react";
import { useTravel } from "../context/destination.context";
import CardTravel from "../components/CardTravel";
import ListTravelCard from "../components/ListTravelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowUpZA,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const {
    getDestinations,
    orderForName,
    setSortAsc,
    sortAsc,
    cities,
    debounce,
  } = useTravel();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showCompare, setShowCompare] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // prende le destinazioni iniziali
  useEffect(() => {
    getDestinations();
  }, []);

  // Filtro locale per performance migliori in base a se c'è title o category
  useEffect(() => {
    let filtered = cities;

    if (search) {
      filtered = filtered.filter((city) =>
        city.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((city) => city.category === category);
    }

    setFilteredCities(filtered);
  }, [cities, search, category]);

  // funzione per il debounce
  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 500),
    [debounce]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  // toggle se ci sono filtri
  const displayCities =
    filteredCities.length > 0 || search || category ? filteredCities : cities;

  // comparatore e wishlist
  const addToCompare = (destination) => {
    if (compareList.find((item) => item.id === destination.id)) return;

    setCompareList((prevList) => [...prevList, destination]);
    // Passa alla vista comparatore
    setShowList(false);
    setShowCompare(true);
  };
  const removeFromCompare = (id) => {
    setCompareList((prevList) => prevList.filter((item) => item.id !== id));
  };
  // fine comparatore e wishlist
  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 text-white">
          Dove sarà il tuo prossimo viaggio
          <FontAwesomeIcon icon={faQuestion} bounce />
        </h1>
        <form className="d-flex justify-content-center my-4">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Cerca per Città..."
            aria-label="Search"
            value={inputValue}
            onChange={handleSearchChange}
          />
          <select
            className="form-select ms-2 w-25"
            aria-label="Tipo di città"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Tipo di città</option>
            <option value="grande-citta">grande città</option>
            <option value="citta-marittima">città marittima</option>
            <option value="storica">Storica</option>
            <option value="citta-arte">Città d'arte</option>
          </select>
        </form>
      </div>
      {cities.length > 0 && (
        <div className="container">
          <div className="d-flex justify-content-center my-4">
            <div
              className="setListOrCompare"
              onClick={() => {
                if (showList) {
                  setShowList(false);
                  setShowCompare(true);
                } else {
                  setShowList(true);
                  setShowCompare(false);
                }
              }}
            >
              Comparatore{" "}
              {compareList.length > 0 ? `(${compareList.length})` : ""}
            </div>
          </div>
          <div
            onClick={() => {
              orderForName();
              setSortAsc((prev) => !prev);
            }}
            className="sortButton"
          >
            {sortAsc ? (
              <FontAwesomeIcon icon={faArrowUpZA} style={{ padding: "10px" }} />
            ) : (
              <FontAwesomeIcon
                icon={faArrowDownAZ}
                style={{ padding: "10px" }}
              />
            )}
          </div>
          <div className="row">
            {showCompare ? (
              <div className="col-12  mt-4 mb-2">
                <h3 className="destinazioni mb-3">Comparatore Destinazioni</h3>
                <div
                  className="overflow-scroll p-2 mx-2"
                  style={{
                    maxHeight: "30vh",
                    scrollbarWidth: "none",
                    borderRadius: "10px",
                  }}
                >
                  {compareList.length > 0 ? (
                    <table className="table table-dark table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Posto</th>
                          <th scope="col">Posti Disponibili</th>
                          <th scope="col">Partenza</th>
                          <th scope="col">Costo</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {compareList.map((destination) => (
                          <ListTravelCard
                            destination={destination}
                            key={destination.id}
                            removeFromCompare={removeFromCompare}
                          />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-light mt-4">
                      Seleziona almeno una destinazione da comparare...
                    </p>
                  )}
                </div>
              </div>
            ) : null}
            <div className="row">
              <div className="col-12 mt-4 mb-2">
                <div
                  className="row overflow-scroll p-2 mx-2"
                  style={{
                    maxHeight: "80vh",
                    scrollbarWidth: "none",
                    borderRadius: "10px",
                  }}
                >
                  {displayCities.map((destination, i) => (
                    <CardTravel
                      destination={destination}
                      key={i}
                      addToCompare={addToCompare}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
