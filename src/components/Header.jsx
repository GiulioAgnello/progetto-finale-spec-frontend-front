import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent ">
        <div className="container-fluid">
          <img src="logo.png" alt="Dnav-itemreamExperience" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-5 ">
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
