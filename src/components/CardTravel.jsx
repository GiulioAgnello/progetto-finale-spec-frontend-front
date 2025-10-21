import "flag-icons/css/flag-icons.min.css";
import { useNavigate } from "react-router-dom";
import { useTravel } from "../context/destination.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";

// CARD
export default function CardTravel({ destination, addToCompare }) {
  const {
    id,
    title,
    image,
    country,
    flag,
    bestSeason,
    costLevel,
    price,
    departure,
  } = destination;

  const { addToWishlist, addToCart } = useTravel();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === destination.id);
    setIsInWishlist(!!exists);
  }, [destination.id]);

  const handleWishlistClick = () => {
    addToWishlist(destination);
    setIsInWishlist(!isInWishlist);
  };

  const goToDetail = () => {
    navigate(`/${destination.id}`);
  };
  // Badge dinamico per costLevel
  let costBadge = null;
  if (costLevel) {
    let badgeClass = "bg-success";
    let label = "economica";
    if (costLevel.toLowerCase() === "media") {
      badgeClass = "bg-warning text-dark";
      label = "media";
    } else if (costLevel.toLowerCase() === "cara") {
      badgeClass = "bg-danger";
      label = "cara";
    }
    costBadge = (
      <span className={`badge ${badgeClass} ms-2 mb-2`}>Costo: {label}</span>
    );
  }

  const handleAddToCart = () => {
    addToCart(destination);
  };

  return (
    <div className="col-md-4 mb-4" key={destination.id}>
      <div className="card mb-4 shadow-sm h-100">
        <img
          src={`../../public/destinationPhoto/${title}.jpg`}
          alt={title}
          className="card-img-top"
          onClick={goToDetail}
          style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="d-flex align-items-center mb-2 gap-2">
            {flag && typeof flag === "string" && (
              <span className={`fi fi-${flag.toLowerCase()}`}></span>
            )}
            <h5
              className="card-title mb-0 "
              onClick={goToDetail}
              style={{ cursor: "pointer" }}
            >
              {title}
            </h5>
          </div>
          <p className="card-text mb-1">
            <strong>Paese:</strong> {country}
          </p>
          <hr />
          {bestSeason && (
            <span className="fw-bold mb-2">Partenza: {departure}</span>
          )}
          <hr />
          {costBadge}
          {price && (
            <p className="card-text mt-2  fw-bold">
              <strong className=" fw-lighter">Prezzo medio:</strong> €{price}
            </p>
          )}
          <div className="d-flex justify-content-start mt-3 gap-2">
            <button onClick={goToDetail} className="buttonDetail">
              Dettagli
            </button>
            {addToCompare ? (
              <button
                className="buttonCompare"
                onClick={() => addToCompare(destination)}
              >
                Compara
              </button>
            ) : null}
            <div
              onClick={handleWishlistClick}
              className={`buttonwishlist ${
                isInWishlist ? "active" : "inactive"
              }`}
            >
              <FontAwesomeIcon icon={isInWishlist ? faHeart : faHeartEmpty} />
            </div>
            <button onClick={handleAddToCart} className={"buttonCart"}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
