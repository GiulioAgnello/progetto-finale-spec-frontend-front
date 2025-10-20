import { useState, useEffect } from "react";
import WishListItems from "../components/WishListItems";

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

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h1 className="wishTitle">Wishlist</h1>
          <ul>
            <div className="row">
              <ul>
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <WishListItems
                      key={item.id}
                      destination={item}
                      removeFromWishlist={removeFromWishlist}
                    />
                  ))
                ) : (
                  <p className="text-center text-light fs-2">
                    Nessuna destinazione in wishlist!
                  </p>
                )}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
