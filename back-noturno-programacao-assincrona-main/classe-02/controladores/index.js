const axios = require("axios");
const fs = require("fs");

async function get(req,res){
    const cep = req.params.cep;
    fs.readFile("enderecos.json", async (err,data)=>{
        if (err){
            fs.writeFile("enderecos.json", JSON.stringify([]), (error)=>console.log(error));
            console.log(err);
            return
        }

        const parse = JSON.parse(data);

        const cepFormatado = `${cep.substr(0,5)}-${cep.substr(-3)}`
        const endereco = parse.find(endereco=>endereco.cep===cepFormatado);
        if(endereco){
            res.json("Endereço já está cadastrado");
        }

        else{
            const enderecosAPI = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
            if(enderecosAPI.data.erro){
                res.json(enderecosAPI.data);
                return 
            }
            parse.push(enderecosAPI.data);
            fs.writeFile("enderecos.json", JSON.stringify(parse), (error)=>console.log(error));
            res.json(enderecosAPI.data);
        }
    })
}

module.exports = {get}