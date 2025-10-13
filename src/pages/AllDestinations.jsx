import { useTravel } from "../context/destination.context";
import { useEffect, useState } from "react";
import CardTravel from "../components/CardTravel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

export default function AllDestinations() {
  const { destinations, getDestinations, orderForName, setSortAsc, sortAsc } =
    useTravel();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDestinations();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    getDestinations(params.toString());
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center mb-4">
          <div className="col-6">
            <form onChange={handleSearch}>
              <label className="col-form-label" htmlFor="search">
                Cerca una destinazione:
              </label>

              <input
                className="form-control"
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          {destinations.map((destination) => (
            <CardTravel key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </>
  );
}
