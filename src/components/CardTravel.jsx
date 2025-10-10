import { useTravel } from "../context/destination.context";

export default function CardTravel({ destination, addToCompare }) {
  const { title, image, country, flag, bestSeason, costLevel, price } =
    destination;

  const { addToWishlist } = useTravel();

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

  return (
    <div className="col-md-4 mb-4" key={destination.id}>
      <div className="card mb-4 shadow-sm h-100">
        <img
          src={`../../public/destinationPhoto/${title}.jpg`}
          alt={title}
          className="card-img-top"
        />
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            {flag && (
              <span style={{ fontSize: "2rem", marginRight: "0.5rem" }}>
                {flag}
              </span>
            )}
            <h5 className="card-title mb-0">{title}</h5>
          </div>
          <p className="card-text mb-1">
            <strong>Paese:</strong> {country}
          </p>
          <hr />
          {bestSeason && (
            <span className="fw-bold text-dark mb-2">
              Stagione migliore: {bestSeason}
            </span>
          )}
          <hr />
          {costBadge}
          {price && (
            <p className="card-text mt-2 text-primary fw-bold">
              <strong className="text-secondary fw-lighter">
                Prezzo medio:
              </strong>{" "}
              €{price}
            </p>
          )}
          {addToCompare ? (
            <button
              className="buttonCompare"
              onClick={() => addToCompare(destination)}
            >
              Compara
            </button>
          ) : null}
          <button
            onClick={() => addToWishlist(destination)}
            className="buttonwishlist"
          >
            wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
