import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ReservationDetails from "./pages/ReservationDetails.jsx.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservations/:id" element={<ReservationDetails />} />
    </Routes>
  );
}

export default App;
