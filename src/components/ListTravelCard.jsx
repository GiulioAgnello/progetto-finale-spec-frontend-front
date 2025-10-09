import { useTravel } from "../context/destination.context";

export default function ListTravelCard({ destination, removeFromCompare }) {
  const { addToWishlist } = useTravel();

  return (
    <li
      key={destination.id}
      className="list-group-item mb-2 p-2 border rounded"
    >
      <div className="d-flex flex-row justify-content-between align-items-center">
        <span className="fw-bold fs-5">{destination.title}</span>
        <span className="text-secondary">{destination.country}</span>

        {destination.costLevel && (
          <div
            className={`badge w-25 ${
              destination.costLevel.toLowerCase() === "economica"
                ? "bg-success"
                : destination.costLevel.toLowerCase() === "media"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            Costo: {destination.costLevel}
          </div>
        )}
        {destination.price && (
          <span className="fw-bold my-1">€{destination.price}</span>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={() => addToWishlist(destination)}
          className="btn btn-primary btn-sm mt-2 w-100"
        >
          Aggiungi a Preferiti
        </button>
        <button
          onClick={() => removeFromCompare(destination.id)}
          className="btn btn-danger btn-sm mt-2 align-self-end w-100"
        >
          Rimuovi
        </button>
      </div>
    </li>
  );
}
