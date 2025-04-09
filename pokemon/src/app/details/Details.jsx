import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const typeColors = {
  normal: 'bg-gray-400 text-black',
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-black',
  ice: 'bg-cyan-300 text-black',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-600 text-black',
  flying: 'bg-sky-300 text-black',
  psychic: 'bg-pink-400 text-black',
  bug: 'bg-lime-600 text-white',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-indigo-700 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-500 text-white',
  fairy: 'bg-pink-300 text-black',
};

function Details() {
  const [pokemon, setPokemon] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params.name) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => {
          setPokemon(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [params.name]);

  if (!pokemon.name) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Imagen e información breve */}
      <div className="w-full md:w-1/2">
        <img
          src={pokemon.sprites?.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full rounded-lg bg-white shadow-lg"
        />
        <p className="text-gray-700 mt-4">
          Este Pokémon es conocido por su tipo y habilidades únicas.
        </p>
      </div>

      <div className="w-full md:w-1/2 bg-blue-100 rounded-lg shadow-lg p-4 space-y-3">
        <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">Altura</p>
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Peso</p>
            <p>{pokemon.weight / 10} kg</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Habilidades</p>
          <ul className="list-disc list-inside">
              {pokemon.abilities?.map(({ ability }, index) => (
              <li key={index} className="capitalize">{ability.name}</li>
              ))}
            </ul>
        </div>


        <div>
          <p className="text-sm font-semibold mb-1">Tipo</p>
          <div className="flex gap-2">
            {pokemon.types?.map(({ type }) => (
              <span
                key={type.name}
                className={`px-2 py-1 rounded-full text-sm font-semibold ${typeColors[type.name]}`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-1">Estadísticas base</p>
          <div className="space-y-1">
            {pokemon.stats?.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs">
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stat.base_stat > 100 ? 100 : stat.base_stat}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
