const getId = require("../utils/getId");

const reservations = [
  { name: "Avinte", tableCount: 2, date: "2025-06-05", id: getId() },
  { name: "Rob", tableCount: 4, date: "2025-05-10", id: getId() },
  { name: "Eli", tableCount: 9, date: "2025-05-11", id: getId() },
];

class Reservation {
  static create(name, tableCount, date) {
    const newReservation = {
      name,
      tableCount,
      date,
      id: getId(),
    };
    reservations.push(newReservation);
    return newReservation;
  }

  static list() {
    return [...reservations];
  }

  static find(id) {
    return reservations.find((res) => res.id === id);
  }

  static edit(id, updatedFields) {
    const reservation = Reservation.find(id);
    if (!reservation) return null;

    Object.assign(reservation, updatedFields);
    return reservation;
  }

  static delete(id) {
    const index = reservations.findIndex((res) => res.id === id);
    if (index < 0) return false;

    reservations.splice(index, 1);
    return true;
  }
}

module.exports = Reservation;
