import { pokemonApi } from "../../api/pokemonApi"
import { setPokemons, setPokemon } from "./pokemonSlice"

export const getPokemons = () => {
    return async (dispatch) => {
        const response = await pokemonApi.get('pokemon')
        const {results} = await response.data
        dispatch(setPokemons(results))

    }
}

export const getPokemon = (pokemonName) => {

    return async (dispatch) => {
        const response = await pokemonApi.get(`pokemon/${pokemonName}`)
        const data = await response.data;
        const {name,weight,height,types, sprites} = await data;
        dispatch(setPokemon({name,weight,height,types,sprites })) 
    }
}