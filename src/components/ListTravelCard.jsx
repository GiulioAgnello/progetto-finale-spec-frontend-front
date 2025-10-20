import { useTravel } from "../context/destination.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ListTravelCard({ destination, removeFromCompare }) {
  const { addToWishlist } = useTravel();
  const navigate = useNavigate();

  return (
    <tr>
      <td>
        <strong
          onClick={() => navigate(`/${destination.id}`)}
          style={{ cursor: "pointer" }}
        >
          {destination.title}
        </strong>
        <br />
        <small className="text-light">{destination.country}</small>
      </td>
      <td>
        <span
          className={
            destination.placeAvalable >= 10 ? "text-success" : "text-danger"
          }
        >
          {destination.placeAvalable || "N/A"}
        </span>
        {destination.placeAvalable < 10 && (
          <>
            <br />
            <small className="text-warning">Ultimi posti!</small>
          </>
        )}
      </td>
      <td>{destination.departure || "Da definire"}</td>
      <td>
        <strong className="text-light">€{destination.price || "N/A"}</strong>
        {destination.price && (
          <>
            <br />
            <small className="text-light">/persona</small>
          </>
        )}
      </td>
      <td>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => addToWishlist(destination)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            onClick={() => removeFromCompare(destination.id)}
            className="btn btn-outline-danger btn-sm"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
