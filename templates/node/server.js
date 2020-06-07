const express = require("express");
const path = require("path");

const port = 4446;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
