import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../store/pokemon/thunks'
import { selectFilteredPokemons } from '../../store/pokemon/pokemonSlice';

// navigator
import { useNavigate } from 'react-router-dom';

// material
import { Box, Button, Dialog, List, TextField } from '@mui/material';
import { List as ListIcon, Star } from '@mui/icons-material';
import Grid from "@mui/material/Grid2";

// components
import { ListItemPokemon, DialogDetailPokemon } from './';




export const ListPokemon = () => {


  // States
  const [filters, setFilters] = useState({ search: '', showFavorites: false });


  // router
  const navigate = useNavigate();

  // redux toolkit
  const dispatch = useDispatch();
  const filteredPokemons = useSelector(state => selectFilteredPokemons(state, filters));

  useEffect(() => {
    dispatch(getPokemons());
  }, [])



  return (
    <div>

      <Box sx={{ width: '100%', display: 'grid', gap: 1 }}>


        {/* Input search pokemons */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value, showFavorites: filters.showFavorites })}
          sx={{ mb: 2 }}
        />


        {/* When there are no pokemons */}
        <Grid sx={{ display: filteredPokemons.length ? 'none' : '', mb: 1 }} >

          <h2 style={{ marginBottom: 0 }}>Uh-oh!</h2>
          <p style={{ marginTop: 0 }}>You look lost on your journey!</p>

          <Button
            onClick={() => navigate('/')}
            sx={{ borderRadius: 10 }}
            variant='contained'
            color='error'>
            Go back home
          </Button>

        </Grid>


        {/* List Pokemons */}
        <List>
          {
            filteredPokemons
              .map((pokemon, index) => (
                <ListItemPokemon
                  key={index + 1}
                  pokemon={pokemon}
                />
              ))
          }
        </List>


        {/* Button Actions */}
        <Grid
          sx={{ display: filteredPokemons.length ? '' : 'none' }}
          container
          justifyContent="center"

        >
          <Button
            onClick={() => setFilters({ search: filters.search, showFavorites: false })}
            variant="contained"
            sx={{ borderRadius: 10 }}
            color="error">
            <ListIcon />
            All
          </Button>


          <Button
            onClick={() => setFilters({ search: filters.search, showFavorites: true })}
            variant="contained"
            sx={{ backgroundColor: "#e0e0e0", color: "white", borderRadius: 10, marginLeft: 1, }}
            color="error">
            <Star color="red" />
            Favorites
          </Button>


        </Grid>

      </Box>



      {/* Modal Dialog Detail Pokemon */}
      <DialogDetailPokemon />

    </div>
  )
}
