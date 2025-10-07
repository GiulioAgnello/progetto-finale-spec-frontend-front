import { useTravel } from "../context/destination.context";
import { useEffect } from "react";

export default function AllDestinations() {
  const { destinations, getDestinations } = useTravel();

  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <>
      <div className="container">
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
