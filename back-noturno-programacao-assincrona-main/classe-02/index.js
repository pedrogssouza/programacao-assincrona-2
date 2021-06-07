const express = require("express");
const {get} = require("./controladores/index")

const app = express();

app.get("/enderecos/:cep", get)

app.listen(8000)
