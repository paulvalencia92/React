import { Star, StarBorder } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material'

import { useDispatch } from 'react-redux';
import { toggleFavorite, toggleDialogPokemon } from '../../store/pokemon/pokemonSlice';
import { getPokemon } from '../../store/pokemon/thunks';


export const ListItemPokemon = ({ pokemon }) => {

    const dispatch = useDispatch();

    const handleClickOpen = (name) => {
        dispatch(getPokemon(name));
        dispatch(toggleDialogPokemon(true));
    };

    const handleToggleFavorite = (event, name) => {
        event.stopPropagation();
        dispatch(toggleFavorite(name));
    };

    return (
        <ListItem
            onClick={() => handleClickOpen(pokemon.name)}
            sx={{ bgcolor: 'white', mb: 1, borderRadius: 1, boxShadow: 1, cursor: 'pointer' }}
            secondaryAction={
                <IconButton onClick={(event) => handleToggleFavorite(event, pokemon.name)} edge="end">
                    {pokemon.isFavorite ? <Star color="warning" /> : <StarBorder />}
                </IconButton>
            }
        >
            <ListItemText primary={pokemon.name} />
        </ListItem>
    )
}
