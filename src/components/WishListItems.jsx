import { useNavigate } from "react-router-dom";
import { useTravel } from "../context/destination.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function WishListItems({ destination, removeFromWishlist }) {
  const { title, placeAvalable, price, departure, flag } = destination;
  const navigate = useNavigate();
  const { addToCart } = useTravel();

  const handleRemove = () => {
    removeFromWishlist(destination.id);
  };

  const handleNavigate = () => {
    navigate(`/${destination.id}`);
  };

  const handleAddToCart = () => {
    addToCart(destination);
    removeFromWishlist(destination.id);
  };

  return (
    <div className="cardListCompare mb-3 p-4">
      <div className="row align-items-center">
        <div className="col-md-8 d-flex flex-row gap-3 align-items-center">
          {flag && typeof flag === "string" && (
            <span className={`fi fi-${flag.toLowerCase()}`}></span>
          )}
          <h5
            className="text-light mb-2"
            style={{ cursor: "pointer" }}
            onClick={handleNavigate}
          >
            {title}
          </h5>
          <p className="text-light mb-1">
            <strong>Posti:</strong> {placeAvalable || "N/A"}
          </p>
          <p className="text-light mb-1">
            <strong>Prezzo:</strong> €{price}/persona
          </p>
          <p className="text-light mb-0">
            <strong>Partenza:</strong> {departure || "Da definire"}
          </p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-flex gap-2 justify-content-end">
            <button className="buttonCart" onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button onClick={handleNavigate} className="buttonDetail">
              <FontAwesomeIcon icon={faEye} className="me-1" />
              Dettagli
            </button>
            <button
              onClick={handleRemove}
              className="btn btn-outline-danger btn-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
