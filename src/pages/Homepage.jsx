import { useState } from "react";
import { useTravel } from "../context/destination.context";
import CardTravel from "../components/CardTravel";
import ListTravelCard from "../components/ListTravelCard";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const { destinations, getDestinations, setDestinations } = useTravel();
  const [compareList, setCompareList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showCompare, setShowCompare] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Costruisci la querystring
    const params = new URLSearchParams();
    if (search) params.append("q", search);
    if (type) params.append("type", type);
    getDestinations(params.toString());
  };

  const addToCompare = (destination) => {
    if (compareList.find((item) => item.id === destination.id)) return;
    setCompareList((prevList) => [...prevList, destination]);
  };
  const removeFromCompare = (id) => {
    setCompareList((prevList) => prevList.filter((item) => item.id !== id));
  };

  function orderForName() {
    const sorted = [...destinations].sort((a, b) => {
      if (a.title.b.title) return -1;
      if (a.title > b.title) return 1;
    });
    setDestinations(sorted);
    return sorted;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 text-white">
          Dove sarà il tuo prossimo viaggio?
        </h1>
        <form
          className="d-flex justify-content-center my-4"
          onChange={handleSubmit}
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
            <option value="grande città">grande città</option>
            <option value="città marittima">città marittima</option>
            <option value="storica">storica</option>
            <option value="città d'arte">città d'arte</option>
          </select>
        </form>
      </div>
      {destinations.length > 0 && (
        <div className="container">
          <div className="d-flex justify-content-center my-4">
            <div
              className="setListOrCompare"
              onClick={() => {
                setShowList(true);
                setShowCompare(false);
              }}
            >
              Destinazioni
            </div>
            <div
              className="setListOrCompare"
              onClick={() => {
                setShowList(false);
                setShowCompare(true);
              }}
            >
              Comparatore
            </div>
          </div>
          <div className="row">
            {!showCompare ? (
              <div className="col-12">
                <h3 className="destinazioni">Destinazioni</h3>
                <div
                  className="row overflow-scroll p-2 mx-2"
                  style={{
                    maxHeight: "80vh",
                    scrollbarWidth: "none",
                    borderRadius: "10px",
                  }}
                >
                  <button onClick={orderForName}>order</button>
                  {destinations.map((destination) => (
                    <CardTravel
                      destination={destination}
                      key={destination.id}
                      addToCompare={addToCompare}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="col-9">
                  <h3 className="destinazioni">Destinazioni</h3>
                  <div
                    className="row overflow-scroll p-2 mx-2"
                    style={{
                      maxHeight: "80vh",
                      scrollbarWidth: "none",
                      borderRadius: "10px",
                    }}
                  >
                    {destinations.map((destination) => (
                      <CardTravel
                        destination={destination}
                        key={destination.id}
                        addToCompare={addToCompare}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-3">
                  <h3 className="destinazioni">Compara</h3>
                  <div
                    className="row overflow-scroll p-2 mx-2"
                    style={{
                      maxHeight: "80vh",
                      scrollbarWidth: "none",
                      borderRadius: "10px",
                    }}
                  >
                    {compareList.length > 0 ? (
                      <ul className="list-group">
                        {compareList.map((destination) => (
                          <ListTravelCard
                            destination={destination}
                            key={destination.id}
                            removeFromCompare={removeFromCompare}
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-secondary mt-4">
                        Nessuna destinazione selezionata....
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
