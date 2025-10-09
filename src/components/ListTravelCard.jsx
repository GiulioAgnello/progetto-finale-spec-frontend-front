export default function ListTravelCard({ destination, removeFromCompare }) {
  return (
    <li
      key={destination.id}
      className="list-group-item mb-2 p-2 border rounded"
    >
      <div className="d-flex flex-column">
        <span className="fw-bold fs-5">{destination.title}</span>
        <span className="text-secondary">{destination.country}</span>

        {destination.costLevel && (
          <span
            className={`badge my-1 ${
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
        {destination.price && (
          <span className="fw-bold text-primary my-1">
            €{destination.price}
          </span>
        )}
      </div>
      <button
        onClick={() => removeFromCompare(destination.id)}
        className="btn btn-danger btn-sm mt-2 align-self-end"
      >
        Rimuovi
      </button>
    </li>
  );
}
