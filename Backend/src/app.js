
const express = require("express");
const campaignRoutes = require("./routes/campaign.routes");
const errorMiddlewares = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/campaigns", campaignRoutes);

app.use(errorMiddlewares);

module.exports = app;
