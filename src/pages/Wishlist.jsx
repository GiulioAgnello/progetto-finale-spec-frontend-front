export default function Wishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  //   const deleteFromWishlist = (id) => {
  //     const updatedWishlist = wishlist.filter((item) => item.id !== id);
  //     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  //     return updatedWishlist;
  //   };
  return (
    <>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
