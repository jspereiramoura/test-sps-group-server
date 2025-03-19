const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { config } = require("dotenv");

config();

const app = express();

app.use(cors(), express.json(), routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
