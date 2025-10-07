import { BrowserRouter, Routes, Route } from "react-router";
import { TravelProvider } from "./context/destination.context";
import DefaultLayout from "./layout/DefaultLayout";
import Homepage from "./pages/Homepage";
import DetailTravel from "./pages/DetailTravel";
import AllDestinations from "./pages/AllDestinations";

export default function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/:id" element={<DetailTravel />} />
            <Route path="/destinazioni" element={<AllDestinations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TravelProvider>
  );
}
