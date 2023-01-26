// Expres
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const port = 3000;

const controller = require("./data_register");

//Conexion a mongo
const db = require("./db.js");
db("mongodb+srv://rickertDev:rickertGR12@cluster0.pdrojim.mongodb.net/?retryWrites=true&w=majority");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
   res.send("Hola mundo");
});

// GET
app.get("/product", (req, res) => {
   controller
      .getDataController()
      .then((data) => {
         res.json(data);
      })
      .catch((err) => {
         console.error(err);
      });
});

// POST
app.post("/product", (req, res) => {
   try {
      const { data } = req.body;
      controller.addDataController(data);
      res.json("Success");
   } catch (error) {
      console.error(error);
   }
});

// PUT
app.put("/product/:id", (req, res) => {
   controller
      .updateDataController(req.params.id, req.body.data)
      .then(() => {
         res.json("Update");
      })
      .catch((error) => console.error(error));
});

// DELETE
app.delete("/product/:id", (req, res) => {
   controller
      .deleteDataController(req.params.id)
      .then(() => {
         res.json("Deleted");
      })
      .catch((error) => console.error(error));
});

app.listen(port, () => {
   console.log("Escuchando en: " + port);
});
