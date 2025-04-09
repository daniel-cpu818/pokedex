import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function PokemonsCard({ url }) {
  const [pokemon, setPokemon] = useState({});

  const typeColors = {
    grass: 'bg-green-500',
    poison: 'bg-purple-500',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    flying: 'bg-sky-300',
    bug: 'bg-lime-500',
    electric: 'bg-yellow-400 text-black',
    ground: 'bg-yellow-700',
    psychic: 'bg-pink-500',
    rock: 'bg-yellow-800',
    ice: 'bg-cyan-300 text-black',
    dragon: 'bg-indigo-700',
    ghost: 'bg-indigo-500',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400 text-black',
    fairy: 'bg-pink-300 text-black',
    normal: 'bg-gray-300 text-black'
  };

  

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon data:', error);
      });
  }, [url]);

  if (!pokemon.name) return <div>Cargando...</div>;

  return (
    <Link
      key={pokemon.name}
      to={`/pokedex/${pokemon.name}`}
      className={`bg-white rounded-xl shadow-md p-4 text-center transition transform hover:scale-105 border-4 trasparent border-gray-200 hover:border-gray-300`}
       > 
 
      <div>
        <div className=" flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-inner">

        <img
          src={pokemon.sprites?.other?.['official-artwork']?.front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain"
          />
        </div>
      
      {/* Nombre */}
      <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
      {/* ID */}
      <p className="text-sm text-gray-500 mb-2">N.º {pokemon.id?.toString().padStart(4, '0')}</p>
      </div>
       {/* Tipos */}
       <div className="grid grid-cols-2 gap-2 mt-4">
  {pokemon.types?.map((typeInfo) => {
    const type = typeInfo.type.name;
    return (
      <div
        key={type}
        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-white font-semibold text-sm capitalize ${typeColors[type]}`}
      >
        
        <span>{type}</span>
      </div>
    );
  })}
</div>




    </Link>
  );
}

export default PokemonsCard;
