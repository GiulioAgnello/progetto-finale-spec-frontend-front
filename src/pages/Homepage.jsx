import { useEffect, useState } from "react";
import { useTravel } from "../context/destination.context";
import CardTravel from "../components/CardTravel";
import ListTravelCard from "../components/ListTravelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const { getDestinations, orderForName, setSortAsc, sortAsc, cities } =
    useTravel();
  const [compareList, setCompareList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    getDestinations();
  }, []);

  // Filtro locale per performance migliori
  useEffect(() => {
    let filtered = cities;

    if (search) {
      filtered = filtered.filter(
        (city) =>
          city.name?.toLowerCase().includes(search.toLowerCase()) ||
          city.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((city) => city.category === category);
    }

    setFilteredCities(filtered);
  }, [cities, search, category]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const displayCities =
    filteredCities.length > 0 || search || category ? filteredCities : cities;

  const addToCompare = (destination) => {
    if (compareList.find((item) => item.id === destination.id)) return;
    setCompareList((prevList) => [...prevList, destination]);
    // Passa alla vista comparatore quando aggiungi un elemento
    setShowList(false);
    setShowCompare(true);
  };
  const removeFromCompare = (id) => {
    setCompareList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 text-white">
          Dove sarà il tuo prossimo viaggio?
        </h1>
        <form className="d-flex justify-content-center my-4">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Cerca per Città..."
            aria-label="Search"
            value={search}
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
                setShowList(true);
                setShowCompare(false);
              }}
            >
              Destinazioni
            </div>
            <div
              className="setListOrCompare"
              onClick={() => {
                setShowList(false);
                setShowCompare(true);
              }}
            >
              Comparatore
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
            {!showCompare ? (
              <div className="col-12">
                <h3 className="destinazioni">Destinazioni</h3>
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
            ) : (
              <>
                <div className="col-9">
                  <h3 className="destinazioni">Destinazioni</h3>
                  <div
                    className="row overflow-scroll p-2 mx-2"
                    style={{
                      maxHeight: "80vh",
                      scrollbarWidth: "none",
                      borderRadius: "10px",
                    }}
                  >
                    {displayCities.map((destination) => (
                      <CardTravel
                        destination={destination}
                        key={destination.id}
                        addToCompare={addToCompare}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-3">
                  <h3 className="destinazioni">Compara</h3>
                  <div
                    className="row overflow-scroll p-2 mx-2"
                    style={{
                      maxHeight: "80vh",
                      scrollbarWidth: "none",
                      borderRadius: "10px",
                    }}
                  >
                    {compareList.length > 0 ? (
                      <ul className="list-group">
                        {compareList.map((destination) => (
                          <ListTravelCard
                            destination={destination}
                            key={destination.id}
                            removeFromCompare={removeFromCompare}
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-light mt-4">
                        Seleziona almeno una destinazione da comparare...
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
