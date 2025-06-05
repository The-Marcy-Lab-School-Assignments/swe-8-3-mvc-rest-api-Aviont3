const express = require("express");
const path = require("path");

const {
  serveReservations,
  serveReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("./controllers/reservationController");

const app = express();
const pathToFrontendDist = path.join(__dirname, "../frontend/dist");

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);
const parseJSON = express.json();

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);

////////////////////////
// Reservation Endpoints
////////////////////////

app.get("/api/reservations", serveReservations);
app.get("/api/reservations/:id", serveReservation);
app.post("/api/reservations", createReservation);
app.patch("/api/reservations/:id", updateReservation);
app.delete("/api/reservations/:id", deleteReservation);

// Optional: Serve frontend fallback (for React Router apps)
// app.get("*", (req, res, next) => {
//   if (req.originalUrl.startsWith("/api")) return next();
//   res.sendFile(pathToFrontendDist);
// });

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
