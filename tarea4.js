const express = require('express');
const app = express();
const crypto = require('crypto');

//Middleware para parsear JSON en la petición
app.use(express.json()); 

app.get('/etag', (req, res) => {
    const content = {mensaje: "Contenido con etag meow"};
    const jsonString = JSON.stringify(content);
    const etag = crypto.createHash('md5').update(jsonString).digest('hex');
    if (req.header['if-none-match']==etag) {
        return res.status(304).end();
    }
    res.set('Etag', etag);
    res.json(content);
})

app.listen(3005, ()=>{
    console.log("Servidor escuchando en puerto 3005");
})