const express = require('express'); //express
const usuario = require('../models/usuario.js'); //requerir usuario model
const router = express.Router(); //router middleware express

router.get('/',(req,res)=>{
    res.render("index") //titulo seria un variable, podria ser cualquiera 
})


router.post('/', async(req,res) =>{ // establece una ruta POST en la raíz del servidor
    const body = req.body; // obtiene los datos enviados en el cuerpo de la solicitud
    console.log(body.nombre,body.descripcion,0); // imprime en la consola los valores del nombre y la descripción del usuario
    try {
        const newUser = new usuario({
            nombre: body.nombre,
            descripcion: body.descripcion,
            puntaje: 0
        }) // intenta crear un nuevo usuario utilizando los datos enviados en la solicitud
        newUser.save(); // guarda el nuevo usuario en la base de datos
        res.redirect(`/juego/${newUser._id}`); // redirige al usuario a la ruta /juego/:id con el id del usuario recién creado
    } catch (error) {
        console.log('error', error) // si ocurre un error, imprime el error en la consola
    }
});

router.get('/juego/:id', async(req,res) =>{ // establece una ruta GET en /juego/:id del servidor
    const id = req.params.id; // obtiene el id enviado en la url
    try {
        const usuariodb = await usuario.findById({_id:id}) // intenta encontrar un usuario en la base de datos utilizando el id obtenido en la ruta
        console.log(usuariodb)
        res.render('juego',{ // renderiza la vista juego y le pasa algunos datos ala vista
            titulo_juego: "Empieza a jugar",
            usuario:usuariodb,
            error:false, 
            mensaje: "existe usuario"
        })
    } catch (error) {
        console.log('error', error)
        res.render('juego',{
            titulo_juego: "Empieza a jugar",
            error:true,
            mensaje: "No existe usuario"
        })
    }
})

router.get('/puntajes-vanilla.ejs',async(req,res)=>{
    try{
    const todousuario = await usuario.find();
    res.render("puntajes-vanilla",{
        titulo_juego: "¡Mira los puntajes mas altos!",
        arrayusuario:todousuario
    })
}catch(error){
console.log(error)
}
})

router.get('/juego/puntajes/:id', async(req,res) =>{ // est
    const id = req.params.id;
    try {
        const usuariodb = await usuario.findById({_id:id}) // intenta encontrar un usuario en la base de datos utilizando el id obtenido en la ruta
        const todousuario = await usuario.find();
        console.log(usuariodb)
        res.render('puntajes',{ // renderiza la vista juego y le pasa algunos datos ala vista
            titulo_juego: "¡Mira los puntajes mas altos!",
            usuario:usuariodb,
            arrayusuario:todousuario,
            error:false, 
            mensaje: "existe usuario"
        })
    } catch (error) {
        console.log('error', error)
        res.render('juego',{
            titulo_juego: "Error",
            error:true,
            mensaje: "No existe usuario"
        })
    }
})
router.put('/:id',async(req,res) =>{ //actualizar un documento
    const id = req.params.id; //leer id
    const puntaje = req.body.puntaje; // leer puntaje
    console.log(puntaje);
    const usuariodb = await usuario.findById({_id:id})
    if(usuariodb.puntaje < puntaje){
        try {
            const usuarioupdate = await usuario.findByIdAndUpdate(
                id,
                {$set:{puntaje:puntaje}}, // actualiza solo el puntaje
                {new: true, useFindAndModify: false}
              )    
                res.json({
                    estado:true,
                    mensaje:"Puntaje guardado"
                })
            console.log(usuarioupdate)           
        }catch(error){
            res.json({
                estado: false,
                mensaje: "error"
            })
        }
    } else {
        res.json({
            estado: false,
            mensaje: "Tienes puntajes mejores :D"
        })
    }
})

module.exports = router;