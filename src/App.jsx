import { BrowserRouter, Outlet, Routes, Route } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Homepage from "./pages/Homepage";
import DetailTravel from "./pages/DetailTravel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/:id" element={<DetailTravel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
