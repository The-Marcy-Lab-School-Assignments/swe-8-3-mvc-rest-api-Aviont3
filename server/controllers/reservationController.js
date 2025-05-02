const Reservation = require("../models/Reservation");

const serveReservations = (req, res) => {
  const list = Reservation.list();
  res.send(list);
};

const serveReservation = (req, res) => {
  const { id } = req.params;
  const reservation = Reservation.find(Number(id));

  if (!reservation) {
    return res.status(404).send({ message: `No reservation with id ${id}` });
  }

  res.send(reservation);
};

const createReservation = (req, res) => {
  const { name, tableCount, date } = req.body;

  if (!name || !tableCount || !date) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const newRes = Reservation.create(name, tableCount, date);
  res.send(newRes);
};

const updateReservation = (req, res) => {
  const { id } = req.params;
  const { name, tableCount, date } = req.body;

  const updatedRes = Reservation.edit(Number(id), {
    ...(name && { name }),
    ...(tableCount && { tableCount }),
    ...(date && { date }),
  });

  if (!updatedRes) {
    return res.status(404).send({ message: `No reservation with id ${id}` });
  }

  res.send(updatedRes);
};

const deleteReservation = (req, res) => {
  const { id } = req.params;
  const didDelete = Reservation.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({ message: `No reservation with id ${id}` });
  }

  res.sendStatus(204);
};

module.exports = {
  serveReservations,
  serveReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
