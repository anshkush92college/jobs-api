/* ENTRYPOINT */

/* Loading all the relevant dependencies */
const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

/* ROUTES ---> For the api */

const app = express();

/* Using the required middlewares */
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Running the server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
