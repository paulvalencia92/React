import { createSlice } from '@reduxjs/toolkit'



export const selectFilteredPokemons = (state, filters) => {
    return state.pokemon.pokemons
        .filter(pokemon => pokemon.name.toLowerCase().includes(filters.search.toLowerCase()))
        .filter(pokemon => filters.showFavorites ? pokemon.isFavorite : true);
};


const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemons: [],
        pokemon: {
            name: '',
            weight: 0,
            height: 0,
            types: [],
            imgURL: null,
            isFavorite: false

        },
        openDialogPokemon: false,
    },
    reducers: {
        setPokemons: (state, { payload }) => {
            state.pokemons = payload.map(pokemon => ({
                ...pokemon,
                isFavorite: false
            }))
        },
        toggleFavorite: (state, action) => {
            const pokemonIndex = state.pokemons.findIndex(pokemon => pokemon.name == action.payload);
            if (pokemonIndex !== -1) {
                state.pokemons[pokemonIndex].isFavorite = !state.pokemons[pokemonIndex].isFavorite;
            }
        },
        setPokemon: (state, { payload }) => {
            const types = payload.types.map(item => item.type.name);
            state.pokemon = payload;
            state.pokemon.types = types;
            state.pokemon.imgURL =payload.sprites.other.dream_world.front_default
        },
        toggleDialogPokemon(state, { payload }) {
            state.openDialogPokemon = payload
        }
    }
});

export const { setPokemons, toggleFavorite, toggleDialogPokemon, setPokemon } = pokemonSlice.actions

export default pokemonSlice.reducer