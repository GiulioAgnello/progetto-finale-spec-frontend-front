import { useTravel } from "../context/destination.context";
import { useEffect, useRef } from "react";
import CardTravel from "../components/CardTravel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

export default function AllDestinations() {
  const {
    destinations,
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

  const handleSearch = debounce((e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const searchValue = searchInputRef.current.value;
    if (searchValue) params.append("search", searchValue);
    getDestinations(params.toString());
  }, 1000);

  const cities = destinations.map((item) => {
    return item.city || item;
  });

  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 text-white">
          Tutte le nostre Destinazioni
        </h1>
        <div className="row d-flex align-items-center mb-4">
          <div className="col-6">
            <form onChange={handleSearch}>
              <input
                className="form-control"
                type="text"
                placeholder="Cerca una destinazione..."
                id="search"
                ref={searchInputRef}
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
            cities.map((destination, i) => {
              return (
                <CardTravel key={destination.id} destination={destination} />
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-light">Caricamento destinazioni...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
