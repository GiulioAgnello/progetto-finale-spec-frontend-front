import { useTravel } from "../context/destination.context";
import { useEffect, useRef, useMemo } from "react";
import CardTravel from "../components/CardTravel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowUpZA,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function AllDestinations() {
  const {
    cities,
    getDestinations,
    orderForName,
    setSortAsc,
    sortAsc,
    debounce,
  } = useTravel();

  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
    getDestinations();
  }, []);

  // Crea la funzione debounced per il filtro
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        const searchTerm = searchInputRef.current.value;

        getDestinations(searchTerm);
      }, 500),
    [debounce]
  );

  const handleSearchChange = () => {
    debouncedSearch();
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 text-white">
          Tutte le nostre Destinazioni <FontAwesomeIcon icon={faPlane} />
        </h1>
        <div className="row d-flex align-items-center mb-4">
          <div className="col-6">
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Cerca una destinazione..."
                id="search"
                ref={searchInputRef}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div className="col-6">
            <div
              onClick={() => {
                orderForName();
                setSortAsc((prev) => !prev);
              }}
              className="sortButton"
            >
              {sortAsc ? (
                <FontAwesomeIcon
                  icon={faArrowUpZA}
                  style={{ padding: "10px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowDownAZ}
                  style={{ padding: "10px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {cities.length > 0 ? (
            cities
              .filter((city) => {
                const searchTerm = searchInputRef.current?.value || "";
                return searchTerm
                  ? city.title?.toLowerCase().includes(searchTerm.toLowerCase())
                  : true;
              })
              .map((destination, i) => {
                return (
                  <CardTravel key={destination.id} destination={destination} />
                );
              })
          ) : (
            <div className="col-12 text-center">
              <p className="text-light">
                {cities.length === 0
                  ? "Caricamento destinazioni..."
                  : "Nessuna destinazione trovata"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
