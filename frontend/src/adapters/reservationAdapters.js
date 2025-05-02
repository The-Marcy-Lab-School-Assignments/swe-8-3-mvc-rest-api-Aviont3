import handleFetch from "./fetch";

export const getAllReservations = async () => {
  const [allReservations, error] = await handleFetch("/api/reservations/");
  return [allReservations, error];
};

export const getReservationById = async (id) => {
  const [reservation, error] = await handleFetch(`/api/reservations/${id}`);
  return [reservation, error];
};

export const createReservation = async ({ name, tableCount, date }) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, tableCount, date }),
  };

  const [newReservation, error] = await handleFetch(
    `/api/reservations/`,
    options
  );
  return [newReservation, error];
};

export const deleteReservation = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(
    `/api/reservations/${id}`,
    options
  );
  return [success, error];
};

export const updateReservation = async (id, { name, tableCount, date }) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, tableCount, date }),
  };

  const [updatedReservation, error] = await handleFetch(
    `/api/reservations/${id}`,
    options
  );
  return [updatedReservation, error];
};
