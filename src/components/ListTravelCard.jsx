import { useTravel } from "../context/destination.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListTravelCard({ destination, removeFromCompare }) {
  const { addToWishlist } = useTravel();

  return (
    <li className="cardListCompare list-group-item mb-3 p-3  shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6 className="fw-bold mb-0 text-white">{destination.title}</h6>
          <small className="text-light">{destination.country}</small>
        </div>
        {destination.price && (
          <span className="fw-bold text-primary">€{destination.price}</span>
        )}
      </div>

      <div className="mb-3">
        {destination.costLevel && (
          <span
            className={`badge ${
              destination.costLevel.toLowerCase() === "economica"
                ? "bg-success"
                : destination.costLevel.toLowerCase() === "media"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            Costo: {destination.costLevel}
          </span>
        )}
      </div>

      <div className="d-flex gap-2">
        <div
          className="buttonwishlist"
          onClick={() => addToWishlist(destination)}
        >
          <FontAwesomeIcon icon={faHeart} className="me-1" />
        </div>
        <button
          onClick={() => removeFromCompare(destination.id)}
          className="btn btn-outline-danger btn-sm flex-fill"
        >
          <FontAwesomeIcon icon={faTrash} className="me-1" />
          Rimuovi
        </button>
      </div>
    </li>
  );
}
