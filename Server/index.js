const server = require("./src/server");
const express = require("express");
const { conn } = require("./src/db.js");
const { apiLoaderProducts } = require("./src/apiLoaderProducts.js");
const { createAdmin } = require("./src/createAdmin.js");
const cloudinary = require("cloudinary").v2;

const {PORT} = process.env;

const app = express();

app.use(express.json({ upload_max_filesize: "10M" }));

cloudinary.config({
  cloud_name: "dlhtl7wr4",
  api_key: "639611433264547",
  api_secret: "EqvrtUWaUDEpg4aAChNztTm8SAU",
});

conn

  .sync({ force: false })

  .then(() => {
    // Cambia la llamada a server.listen por app.listen
    server.listen(PORT, "0.0.0.0", async () => {
       await apiLoaderProducts();
       await createAdmin(); 
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
