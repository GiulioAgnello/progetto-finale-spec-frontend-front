import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Carica il carrello dal localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    console.log(savedCart);
  }, []);

  // Aggiorna localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Notifica l'aggiornamento del carrello
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  // Rimuove
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Aggiorna
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  // calcolo del totale dei viaggiatori
  const totalTravellers = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Calcola il totale
  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cartItems]);

  // Svuota il carrello
  const clearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="wrapper">
          <h1 className="wishTitle">Carrello</h1>
          <div className="text-center">
            <p className="text-light fs-2 mb-4">Il tuo carrello è vuoto</p>
            <button
              className="buttonCompare fs-5"
              onClick={() => navigate("/")}
            >
              Cerca destinazioni <FontAwesomeIcon icon={faPlane} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="wishTitle">Carrello</h1>

        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-dark table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Destinazione</th>
                    <th scope="col">Prezzo per notte</th>
                    <th scope="col">Viaggiatori</th>
                    <th scope="col">Totale</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong
                          className="text-light"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/${item.id}`)}
                        >
                          {item.title}
                        </strong>
                        <br />
                        <small className="text-light">{item.country}</small>
                      </td>
                      <td className="text-light">€{item.price}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="text-light mx-2">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </td>
                      <td className="text-light">
                        <strong>
                          €{(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cardListCompare p-4">
              <h3 className="text-light mb-3">Riepilogo Ordine</h3>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-light">Destinazioni:</span>
                <span className="text-light">{cartItems.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-light">Viaggiatori totali:</span>
                <span className="text-light">{totalTravellers}</span>
              </div>

              <hr className="text-light" />

              <div className="d-flex justify-content-between mb-3">
                <strong className="text-light">Totale:</strong>
                <strong className="text-light">
                  €{calculateTotal.toFixed(2)}
                </strong>
              </div>

              <div className="d-grid gap-2">
                <button className="buttonCompare w-100 py-2">
                  Procedi al Checkout
                </button>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={clearCart}
                >
                  Svuota Carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
