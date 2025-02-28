const express = require('express');
const app = express();

app.use(express.json());

app.get('/preferencia', (req, res) => {
    const data = { mensaje: "Desarrollo de sistemas en red" };
    const acceptHeader = req.headers.accept || "";

    const preferences = acceptHeader.split(',').map(type => {
        let [mediaType, qValue] = type.split(';q=');
        return {
            mediaType: mediaType.trim(),
            q: qValue ? parseFloat(qValue) : 1.0
        };
    });

    for (let pref of preferences) {
        if (pref.mediaType === "application/json") {
            return res.json(data);
        } else if (pref.mediaType === "application/xml") {
            res.type("application/xml");
            return res.send(`<mensaje>${data.mensaje}</mensaje>`);
        } else if (pref.mediaType === "text/html") {
            return res.send(`<h1>${data.mensaje}</h1>`);
        }
    }

    res.status(406).send("Not Acceptable");
});

app.listen(3000, () => {
    console.log("Servidor escuchando en puerto 3000");
});
