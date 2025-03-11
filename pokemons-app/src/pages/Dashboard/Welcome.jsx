import React from 'react'
import Grid from "@mui/material/Grid2";
import PokemonImage from "./../../assets/pokemons/Pokemon.png";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const Welcome = () => {

    const navigate = useNavigate();

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
        >
            <img width={200} src={PokemonImage}></img>
            <h2 style={{ marginBottom: 0 }}>Welcome to Pokédex</h2>
            <p style={{ marginTop: 0 }}>Thedigital encyclopedia created by Professor Oak is an invaluable too to Trainers in the Pokémon world.</p>
            <Button
                variant="contained"
                color="error"
                onClick={() => navigate("pokemons")}
            >
                Get started
            </Button>
        </Grid>
    )
}
