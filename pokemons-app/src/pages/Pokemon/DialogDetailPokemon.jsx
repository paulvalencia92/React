// redux
import { useDispatch, useSelector } from "react-redux"
import { toggleDialogPokemon, toggleFavorite } from "../../store/pokemon/pokemonSlice";

// material
import { Alert, Box, Dialog, Divider, IconButton } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Star, StarBorder } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';



import backgroundImgURL from "./../../assets/pokemons/Background.png";
import { useState } from "react";

export const DialogDetailPokemon = () => {


  const [successCopy, setSuccessCopy] = useState(false)


  const dispatch = useDispatch();
  const { openDialogPokemon, pokemon, pokemons } = useSelector(state => state.pokemon);

  const { name, imgURL, weight, height, types } = pokemon;
  const isFavorite = pokemons.some(item => item.name === name && item.isFavorite);

  const handleClose = () => {
    dispatch(toggleDialogPokemon(false));
  }

  const handleToggleFavorite = (event, name) => {
    event.stopPropagation();
    dispatch(toggleFavorite(name));
  };


  const handleShare = async () => {
    const textToCopy = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types.join(', ')}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setSuccessCopy(true);
      setTimeout(() => setSuccessCopy(false), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog onClose={handleClose} open={openDialogPokemon}>
      <Card sx={{ maxWidth: 345 }}>


        <CardMedia
          sx={{
            width: 300,
            height: 300,
            position: 'relative',
            backgroundImage: `url(${backgroundImgURL})`, // Fondo
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            className='animate__animated animate__backInDown'
            src={imgURL}
            alt={name}
            style={{
              width: '80%',
              height: '80%',
            }}
          />
        </CardMedia>

        <CardContent>
          <Typography variant="h6" fontWeight="bold">Name: {name}</Typography>
          <Divider sx={{ my: 1 }}></Divider>
          <Typography variant="body1"><b>Weight:</b> {weight}</Typography>
          <Divider sx={{ my: 1 }}></Divider>
          <Typography variant="body1"><b>Height:</b> {height}</Typography>
          <Divider sx={{ my: 1 }}></Divider>
          <Typography variant="body1"><b>Types:</b> {types.join(', ')}</Typography>
        </CardContent>

        <CardActions>
          <Button
            onClick={handleShare}
            variant="contained"
            color="error" sx={{ borderRadius: 10 }}>
            Share to my friends
          </Button>
          <IconButton onClick={(event) => handleToggleFavorite(event, pokemon.name)}>
            {isFavorite ? <Star color="warning" /> : <StarBorder />}
          </IconButton>
        </CardActions>

      </Card>


      {/* Mensaje de alerta */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={successCopy}
        autoHideDuration={1000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Copied to clipboard! ✅
        </Alert>
      </Snackbar>




    </Dialog>

  )
}
