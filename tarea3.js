const express = require('express');
const app = express();

//Middleware para parsear JSON en la petición
app.use(express.json()); 

app.get('/cache', (req,res)=>{
    res.set({
        'Cache-Control': 'public, max-age=30',
        'Expires': new Date(Date.now()+30000).toUTCString(),
        'Pragma': 'no-cache'
    })
    res.json({mensaje: "Esta respuesta se puede cachear por 30 segundos"});
})

app.listen(3002, ()=>{
    console.log("Servidor escuchando en puerto 3002");
})