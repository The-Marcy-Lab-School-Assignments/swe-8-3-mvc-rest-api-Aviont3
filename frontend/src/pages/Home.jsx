import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllReservations,
  createReservation,
} from "../adapters/reservationAdapters";

const Home = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    tableCount: "",
    date: "",
  });
  const [newlyAddedReservation, setNewlyAddedReservation] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      const [allReservations, error] = await getAllReservations();
      setReservations(allReservations || []);
    };
    doFetch();
  }, [newlyAddedReservation]);

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    const [newReservation, error] = await createReservation({
      ...formData,
      tableCount: Number(formData.tableCount),
    });
    setNewlyAddedReservation(newReservation);
    setFormData({ name: "", tableCount: "", date: "" });
  };

  return (
    <>
      <h1>Reservations</h1>
      <form onSubmit={handleCreateReservation}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="tableCount">Table Count</label>
        <input
          type="number"
          id="tableCount"
          value={formData.tableCount}
          onChange={(e) =>
            setFormData({ ...formData, tableCount: e.target.value })
          }
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <button type="submit">Create Reservation</button>
      </form>

      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <Link to={`/reservations/${reservation.id}`}>
              {reservation.name} - {reservation.date}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
