const mongoose = require('mongoose'); //mongoose npm package
const Schema = mongoose.Schema; //esquema mongoose


const UsuariosSchema = new Schema({ //esquema usuario schema
    nombre:  String, 
    descripcion: String,
    puntaje: Number
  })

  //crear modelo
  const usuario = mongoose.model('Usuarios', UsuariosSchema); //modelousuario
  
  module.exports = usuario //exporta const del modelo