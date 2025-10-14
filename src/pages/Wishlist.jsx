import { useState, useEffect } from "react";

import CardTravel from "../components/CardTravel";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Rileggi la wishlist quando la pagina riceve focus
  useEffect(() => {
    const updateWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(stored);
    };
    updateWishlist();
    window.addEventListener("click", updateWishlist);
    return () => window.removeEventListener("click", updateWishlist);
  }, []);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h1 className="wishTitle">Wishlist</h1>
          <ul>
            <div className="row">
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <CardTravel key={item.id} destination={item} />
                ))
              ) : (
                <p className="text-center text-light fs-2">
                  Nessuna destinazione in wishlist!
                </p>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
