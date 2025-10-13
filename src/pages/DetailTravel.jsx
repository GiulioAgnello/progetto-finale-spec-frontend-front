import { useParams } from "react-router-dom";

export default function DetailTravel() {
  const { id } = useParams();
  const [destination, setDestinations] = useState({});

  const getDestinations = async (query) => {
    try {
      const url = query`http://localhost:3001/cities/${id}`;

      console.log("Fetching:", url);
      const response = await fetch(url);
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };
  useEffect(() => {
    getDestinations();
  }, [id]);
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img
              src={destination.image}
              alt={destination.title}
              className="card-img-top"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                {destination.flag && (
                  <span
                    style={{
                      fontSize: "2rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    {destination.flag}
                  </span>
                )}
                <h2 className="card-title mb-0">{destination.title}</h2>
              </div>
              <p className="card-text mb-1">
                <strong>Paese:</strong> {destination.country}
              </p>
              {destination.bestSeason && (
                <span className="badge bg-info text-dark mb-2">
                  Stagione migliore: {destination.bestSeason}
                </span>
              )}
              {destination.costLevel && (
                <span
                  className={`badge ms-2 mb-2 ${
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
                <p className="card-text mt-2 text-primary fw-bold">
                  <strong className="text-secondary fw-lighter">
                    Prezzo medio:
                  </strong>{" "}
                  €{destination.price}
                </p>
              )}
              {destination.description && (
                <p className="card-text mt-3">{destination.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
