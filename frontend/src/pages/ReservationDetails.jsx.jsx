import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../adapters/reservationAdapters";

const ReservationDetails = () => {
  const [reservation, setReservation] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    tableCount: "",
    date: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [foundReservation, error] = await getReservationById(id);
      setReservation(foundReservation);
    };
    doFetch();
  }, [id]);

  const handleDelete = async () => {
    await deleteReservation(id);
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const [updatedReservation, error] = await updateReservation(id, {
      ...formData,
      tableCount: Number(formData.tableCount),
    });
    setReservation(updatedReservation);
    setFormData({ name: "", tableCount: "", date: "" });
  };

  return (
    <>
      <Link to="/">← Back to Reservations</Link>
      <h1>Reservation Details</h1>
      <p>
        <strong>Name:</strong> {reservation.name}
      </p>
      <p>
        <strong>Table Count:</strong> {reservation.tableCount}
      </p>
      <p>
        <strong>Date:</strong> {reservation.date}
      </p>

      <form onSubmit={handleUpdate}>
        <h3>Update Reservation</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Table Count"
          value={formData.tableCount}
          onChange={(e) =>
            setFormData({ ...formData, tableCount: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>

      <button onClick={handleDelete} className="danger">
        Delete Reservation
      </button>
    </>
  );
};

export default ReservationDetails;
