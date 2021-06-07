const express = require("express");
const {get, getComIdOuNome} = require("./controladores/index");
const app = express();

app.get("/pokemon", get);

app.get("/pokemon/:idOuNome", getComIdOuNome);


app.listen(8000);