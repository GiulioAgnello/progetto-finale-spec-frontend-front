import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    // Carica il conteggio iniziale
    updateCartCount();

    // Ascolta i cambiamenti del localStorage
    window.addEventListener("storage", updateCartCount);

    // Ascolta eventi personalizzati per aggiornamenti interni alla pagina
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent ">
        <div className="container-fluid">
          <img src="logo.png" alt="Dnav-itemreamExperience" />
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarNav">
            <ul className="navbar-nav ms-auto me-5  ">
              <li className="itemsNav active -">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="itemsNav">
                <NavLink className="nav-link" to="/destinazioni">
                  Destinazioni
                </NavLink>
              </li>
              <li className="itemsNav">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
              <li className="itemsNav">
                <NavLink
                  className="nav-link position-relative "
                  to="/carrello "
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="itemsNav">
                <NavLink className="nav-link" to="/contatti">
                  Contatti
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
