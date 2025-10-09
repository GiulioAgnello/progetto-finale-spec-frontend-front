import { useState, useEffect } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const handleDelete = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDelete(item.id)}
            >
              Rimuovi
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
