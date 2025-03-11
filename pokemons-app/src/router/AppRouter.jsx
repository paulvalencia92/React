import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ListPokemon } from '../pages/Pokemon/'
import { Welcome } from '../pages/Dashboard/Welcome'
import loaderImg from "./../assets/pokemons/Loader.png";


const Loader = () => (
    <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
        background: "rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 9999
    }}>
        <img src={loaderImg} alt="Loading..." width="100" />
    </div>
);



export const AppRouter = () => {

    const location = useLocation();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 200); 
        return () => clearTimeout(timer);
    }, [location.pathname]); 

    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/pokemons' element={<ListPokemon />} />
                <Route path='/*' element={<Navigate to="/" />} />
            </Routes>
        </>

    )
}
