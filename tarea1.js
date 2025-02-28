const express = require('express');
const app = express();

app.use(express.json()); 

app.get('/info', (req, res) => {
    const data = { mensaje: "Desarrollo de sistemas en red" };
    const accept = req.accepts(["json", "xml", "html"]);

    if (accept === "json") {
        res.json(data);
    } else if (accept === "xml") { // Aquí corregido
        res.type("application/xml");
        res.send(`<mensaje>${data.mensaje}</mensaje>`);
    } else if (accept === "html") {
        res.send(`<h1>${data.mensaje}</h1>`);
    } else {
        res.status(406).send("Not Acceptable");
    }
});

app.listen(3000, () => {
    console.log("Servidor escuchando en puerto 3000");
});
