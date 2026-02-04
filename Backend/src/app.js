const express = require("express");
const cors = require("cors");

const campaignRoutes = require("./routes/campaign.routes");
const errorMiddlewares = require("./middlewares/error.middleware");

const app = express();


app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/campaigns", campaignRoutes);

app.use(errorMiddlewares);

module.exports = app;
