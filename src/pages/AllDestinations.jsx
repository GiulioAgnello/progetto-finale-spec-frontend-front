import { useTravel } from "../context/destination.context";
import { useEffect, useRef, useState, useMemo } from "react";
import CardTravel from "../components/CardTravel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowUpZA,
  faPlane,
  faGlobe,
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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    searchInputRef.current.focus();
    getDestinations();
  }, []);

  // utilizzo del set mettere i valori in un array unico per i paesi
  const countries = [
    ...new Set(
      cities
        .map((city) => city.country)
        .filter((country) => country && country.trim() !== "")
    ),
  ].sort();

  // Filtra le città in base al paese selezionato e alla ricerca
  useEffect(() => {
    let filtered = cities;

    if (selectedCountry) {
      filtered = filtered.filter((city) =>
        city.country?.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }

    const searchTerm = searchInputRef.current?.value || "";
    if (searchTerm) {
      filtered = filtered.filter((city) =>
        city.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCities(filtered);
  }, [cities, selectedCountry]);

  const handleCountrySelect = (countryValue) => {
    setSelectedCountry(
      countryValue === selectedCountry ? selectedCountry : countryValue
    );
  };

  const handleSearchChange = debounce(() => {
    const searchTerm = searchInputRef.current.value;
    let filtered = cities;

    if (selectedCountry) {
      filtered = filtered.filter((city) =>
        city.country?.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((city) =>
        city.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCities(filtered);
  }, 500);

  const displayCities =
    filteredCities.length > 0 || selectedCountry ? filteredCities : cities;

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
      <div className="container mb-4">
        <div className="wrapper">
          <h3 className="text-center text-light mb-4">
            {" "}
            I nostri Paesi in giro per il mondo{" "}
            <FontAwesomeIcon icon={faGlobe} />
          </h3>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  className={`btn ${
                    !selectedCountry ? "btn-warning" : "btn-outline-light"
                  } btn-sm`}
                  onClick={() => setSelectedCountry("")}
                >
                  Tutti i Paesi
                </button>
                {countries.map((country, i) => (
                  <button
                    key={i}
                    className={`btn ${
                      selectedCountry === country
                        ? "btn-warning"
                        : "btn-outline-light"
                    } btn-sm`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedCountry && (
            <div className="text-center mt-3">
              <span className="badge  fs-6">
                {displayCities.length} Destinazioni trovate in {selectedCountry}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row">
          {displayCities.length > 0 ? (
            displayCities.map((destination, i) => (
              <CardTravel key={destination.id} destination={destination} />
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-light fs-4 mt-4 ">
                {cities.length === 0
                  ? "Caricamento destinazioni..."
                  : "Nessuna destinazione trovata per ora..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
