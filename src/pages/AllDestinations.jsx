import { useTravel } from "../context/destination.context";
import { useEffect, useState } from "react";

export default function AllDestinations() {
  const { destinations, getDestinations } = useTravel();
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
        </div>
        <div className="row">
          {destinations.map((destination) => (
            <div className="col-md-4" key={destination.id}>
              <div className="card mb-4">
                {/* <img
                  src={destination.image}
                  alt={destination.name}
                  className="card-img-top"
                /> */}
                <div className="card-body">
                  <h5 className="card-title">{destination.title}</h5>
                  <p className="card-text">{destination.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
