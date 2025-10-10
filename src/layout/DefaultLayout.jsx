import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aurora from "../components/Aurora";
export default function DefaultLayout() {
  return (
    <>
      <div className="aurora-bg">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
