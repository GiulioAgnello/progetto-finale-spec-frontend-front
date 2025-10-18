import { useEffect, useState } from "react";
import { useTravel } from "../context/destination.context";
import CardTravel from "../components/CardTravel";
import ListTravelCard from "../components/ListTravelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const {
    getDestinations,
    setDestinations,
    orderForName,
    setSortAsc,
    sortAsc,
    debounce,
  } = useTravel();
  const [compareList, setCompareList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showCompare, setShowCompare] = useState(false);
  const [destinations, getnewDestination] = useState([]);

  useEffect(() => {
    getDestinations(destinations);
  }, []);

  const handleSearchFetch = debounce((searchValue) => {
    // Per prendere la querystring
    const params = new URLSearchParams();
    if (searchValue) params.append("search", searchValue);
    if (category) params.append("category", category);
    console.log("Search fetch - search:", searchValue, "category:", category);
    console.log("Query string:", params.toString());
    getDestinations(params.toString());
  }, 500);

  const handleFetch = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // Fetch immediato con i nuovi valori
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (newCategory) params.append("category", newCategory);
    console.log("Select change - search:", search, "category:", newCategory);
    getDestinations(params.toString());
  };

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

  console.log(destinations);

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
            onChange={(e) => {
              const newSearch = e.target.value;
              setSearch(newSearch);

              handleSearchFetch(newSearch);
            }}
          />
          <select
            className="form-select ms-2 w-25"
            aria-label="Tipo di città"
            value={category}
            onChange={(e) => {
              handleFetch(e);
            }}
          >
            <option value="">Tipo di città</option>
            <option value="grande-citta">grande città</option>
            <option value="citta-marittima">città marittima</option>
            <option value="storica">Storica</option>
            <option value="citta-arte">Città d'arte</option>
          </select>
        </form>
      </div>
      {destinations.length > 0 && (
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
                  {destinations.map((destination, i) => (
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
                    {destinations.map((destination) => (
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
