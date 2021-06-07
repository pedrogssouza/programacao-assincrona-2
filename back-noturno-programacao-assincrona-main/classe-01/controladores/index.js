const axios = require("axios");

function get(req,res){
    const inicio = req.query.inicio;
    const quantidade = req.query.quantidade;
    const pokeAPI = axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${inicio}&limit=${quantidade}`).then(response=>{res.json(response.data.results)});
}

function getComIdOuNome(req,res){
    const idOuNome = req.params.idOuNome;
    const pokeAPI = axios.get(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`).then(response=>{
        const pokemon = response.data;
        const pokemonFormatado = {
            id:pokemon.id,
            name:pokemon.name,
            height:pokemon.height,
            weight:pokemon.weight,
            base_experience:pokemon.base_experience,
            forms:pokemon.forms,
            abilities:pokemon.abilities,
            species:pokemon.species
        }
        res.json(pokemonFormatado);
    })
}

module.exports = {get, getComIdOuNome}