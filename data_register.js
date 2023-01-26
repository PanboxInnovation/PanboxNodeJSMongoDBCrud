//? MODEL
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Nuevo Esquema
const mySchema = new Schema({
   dateRegister: {
      type: Date,
      required: true,
   },
   data: {
      type: Object,
      required: true,
   },
});

const model = mongoose.model("Producto", mySchema);
const Model = model;

//? STORE
// Añadir
const addData = (dataObject) => {
   const myData = new Model(dataObject);
   return myData.save();
};

// Listar
const listData = () => {
   return Model.find();
};

// Actualizar
const updateData = async (id, data) => {
   const newData = await Model.findOne({
      _id: id,
   });
   newData.data = data;
   return newData.save();
};

// Eliminar
const deleteData = (id) => {
   return Model.deleteOne({
      _id: id,
   });
};

//? CONTROLLER
// Create
function addDataController(data) {
   if (!data) {
      return Promise.reject("Data error");
   }
   const newData = {
      dateRegister: new Date(),
      data: data,
   };

   return addData(newData);
}

// Read
const getDataController = () => {
   return listData();
};

// Update
const updateDataController = (id, data) => {
   if (!id) {
      return Promise.reject("Incorrecto");
   }
   const update = updateData(id, data);
   return update;
};

// Delete
const deleteDataController = (id) => {
   return new Promise((res, rej) => {
      if (!id) {
         rej("Incorrecto");
         return false;
      }
      deleteData(id)
         .then(() => {
            res();
         })
         .catch((e) => {
            rej(e);
         });
   });
};

module.exports = {
   addDataController,
   updateDataController,
   getDataController,
   deleteDataController,
};
