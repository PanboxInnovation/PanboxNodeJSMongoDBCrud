const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const conectDB = (url) => {
   mongoose
      .connect(url, { useNewUrlParser: true })
      .then(() => {
         console.log("Base de datos conectada");
      })
      .catch((err) => {
         console.log(`[DB]Error de conexion: ${err}`);
      });
};
module.exports = conectDB;
