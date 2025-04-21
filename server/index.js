const path = require("path");
const express = require("express");
const app = express();
const pathToDistFolder = path.join(__dirname, "../frontend/dist");

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
