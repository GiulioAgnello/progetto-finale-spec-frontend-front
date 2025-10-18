import { useParams } from "react-router-dom";
import { useTravel } from "../context/destination.context";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import "flag-icons/css/flag-icons.min.css";

export default function DetailTravel() {
  const { id } = useParams();
  const { addToWishlist } = useTravel();
  const [destination, setDestinations] = useState({});
  const [isInWishlist, setIsInWishlist] = useState(false);

  const getDestinations = async (id) => {
    try {
      const url = `http://localhost:3001/cities/${id}`;

      console.log("Fetching:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.city);
      const cityData = data.city;
      setDestinations(cityData);
      console.log(cityData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };
  useEffect(() => {
    getDestinations(id);
  }, [id]);
  const handleWishlistClick = () => {
    addToWishlist(destination);
    setIsInWishlist(!isInWishlist);
  };
  console.log(destination);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={`../../public/destinationPhoto/${destination.title}.jpg`}
                  alt={destination.title}
                  className="img-fluid rounded-start h-100"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="col-md-6">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    {destination.flag &&
                      typeof destination.flag === "string" && (
                        <span
                          className={`fi fi-${destination.flag.toLowerCase()} flag-icon me-3`}
                        ></span>
                      )}
                    <h1 className="card-title mb-0">{destination.title}</h1>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-light">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      {destination.country}
                    </h5>
                  </div>

                  <div className="mb-3">
                    {destination.bestSeason && (
                      <span className="badge bg-info text-dark me-2 fs-6">
                        <i className="bi bi-calendar-event me-1"></i>
                        Stagione migliore: {destination.bestSeason}
                      </span>
                    )}
                    {destination.costLevel && (
                      <span
                        className={`badge fs-6 ${
                          destination.costLevel.toLowerCase() === "economica"
                            ? "bg-success"
                            : destination.costLevel.toLowerCase() === "media"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        <i className="bi bi-currency-euro me-1"></i>
                        Costo: {destination.costLevel}
                      </span>
                    )}
                  </div>

                  {destination.price && (
                    <div className="mb-3">
                      <h3 className="text-light">
                        <i className="bi bi-tag-fill me-2"></i>€
                        {destination.price}
                        <small className="text-muted fs-6"> /persona</small>
                      </h3>
                    </div>
                  )}

                  {destination.description && (
                    <div className="mb-4">
                      <h5 className="mb-2">Descrizione</h5>
                      <p className="card-text lh-lg">
                        {destination.description}
                      </p>
                    </div>
                  )}

                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button className="buttonCompare" type="button">
                      <i className="bi bi-heart-fill  "></i>
                      Acquista
                    </button>
                    <div
                      onClick={handleWishlistClick}
                      className={`buttonwishlist ${
                        isInWishlist ? "active" : "inactive"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={isInWishlist ? faHeart : faHeartEmpty}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
