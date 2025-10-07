import { useState } from "react";
import { useTravel } from "../context/destination.context";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const { destinations, getDestinations } = useTravel();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Costruisci la querystring
    const params = new URLSearchParams();
    if (search) params.append("q", search);
    if (type) params.append("type", type);
    getDestinations(params.toString());
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Dove sarà il tuo prossimo viaggio?</h1>
        <form
          className="d-flex justify-content-center my-4"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control w-50"
            type="search"
            placeholder="Città, Paese, Regione..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select ms-2 w-25"
            aria-label="Tipo di città"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Tipo di città</option>
            <option value="grande">grande città</option>
            <option value="marittima">città marittima</option>
            <option value="storica">storica</option>
            <option value="arte">città d'arte</option>
          </select>
          <button className="btn btn-outline-success ms-2" type="submit">
            Cerca
          </button>
        </form>
      </div>
      {destinations.length > 0 && (
        <div className="container">
          <h2 className="text-center">Risultati della ricerca:</h2>
          <ul className="list-group">
            {destinations.map((destination) => (
              <li key={destination.id} className="list-group-item">
                {destination.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
