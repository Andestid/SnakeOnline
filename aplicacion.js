const mongoose = require('mongoose'); //instalado
const express = require('express'); //instalado
require('dotenv').config()//configurando dotenv
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //para json
app.use(express.urlencoded({ extended: true })); //para formularios

const uri = `mongodb+srv://${process.env.user}:${process.env.password}
@node.vrslbjn.mongodb.net/${process.env.nombredb}?retryWrites=true&w=majority`; 
mongoose.connect(uri)
.then(() => console.log('Conectado a la base de datos'))

app.listen(port,()=>{
    console.log('Servidor puerto',port); 
})

app.set('view engine','ejs'); //motores de plantilla jes 

app.set('views',__dirname + '/views'); //le decimos plantilla en views

app.use(express.static(__dirname + "/public"))

//rutas web de la API
app.use('/',require('./router/RutasWeb.js'))

app.use((req, res, next) => { //middleware pagina no existente
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Esta pagina no existe"
    });
})