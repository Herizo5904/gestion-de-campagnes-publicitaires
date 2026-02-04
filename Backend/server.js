
//-------------------------------------Creation de server----------------------------------- 

require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(PORT, () => {
      console.log(`Server demarré sur le port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
