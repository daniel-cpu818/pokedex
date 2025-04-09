import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonsList from './pokedex/PokemonsList';
import { useName } from '../contexts/nameContext';
import PokemonsCard from './pokedex/PokemonsCard';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

function Pokedex() {
  const  name  = useName();
  const [pokemons, setPokemons] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getPokemons = async () => {
    axios.get(baseUrl + `?limit=150`)
  .then((res) => {
    setPokemons(res.data.results);
  })
  .finally(() => {
    setTimeout(() => setLoading(false), 2000); 
  })
  .catch((error) => console.log(error));
  };

    useEffect(() => {
      getPokemons();
    }, []);
    
    
    useEffect(() => {
      setLoading(true);
      axios.get(`https://pokeapi.co/api/v2/type?limit=21`)
      .then((res) => {
        setType(res.data.results);
      })
      .catch((error) => console.log(error));
    }, []);
    
    
    useEffect(() => {
     
    
      axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((res) => {
         const filtered = res.data.pokemon.map((p) => p.pokemon);
          setFilteredPokemons(filtered);
          setSinglePokemon(null);
        })
        .catch((error) => console.log(error));
    }, [selectedType, pokemons]);
    
    
  useEffect(() => {  
    setFilteredPokemons(
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    ); 
    searchPokemons();
  
  }, [search, pokemons]);


  const searchPokemons = () => {
    if (!search) {
      setSinglePokemon(null);
      return;
    }

    axios.get(baseUrl + "/" + search.toLowerCase())
      .then(res => {
        setSinglePokemon(baseUrl + "/" + res.data.name);
      })
      .catch(error => console.log(error));
    }

  


  return (
    <div>
  
  {loading && (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-red-100 to-blue-100 z-50">
      {/* Pokéball Spinner */}
      <div className="w-24 h-24 border-[6px] border-black border-t-white border-b-white rounded-full animate-spin relative">
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
      </div>

      {/* Texto tipo Pokémon */}
      <p className="mt-6 text-xl font-bold text-red-600 tracking-wide animate-pulse">
        ¡Buscando Pokemones!
      </p>
    </div>
  )}


    {!loading && (
     <>
     <div className="max-w-5xl mx-auto px-4 py-6">
       {/* Encabezado estilizado */}
       <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
         <span className="text-red-500">Bienvenido {name.state.name}</span> a tu Pokédex
       </h2>
   
       {/* Buscador y filtros */}
       <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
         <input
           type="text"
           placeholder="Buscar Pokémon..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="px-4 py-2 rounded-xl border-2 border-yellow-400 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none shadow-md w-64"
         />
   
         <button
           onClick={searchPokemons}
           className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-xl shadow-lg transition duration-300"
         >
           Buscar
         </button>
   
         <select
           value={selectedType}
           onChange={(e) => setSelectedType(e.target.value)}
           className="px-4 py-2 rounded-xl border-2 border-yellow-400 bg-white/80 text-gray-800 shadow-md focus:outline-none  "
         >
           <option value="all">Seleccionar tipo</option>
           {type.map((t) => (
             <option key={t.name} value={t.name} className="capitalize">
               {t.name}
             </option>
           ))}
         </select>
       </div>
       <div className="mt-4">
         {singlePokemon ? (
           <div className="flex justify-center">
             <PokemonsCard url={singlePokemon} />
           </div>
         ) : (
           <PokemonsList pokemons={filteredPokemons} />
         )}
       </div>
     </div>
   </>
   
    )}
    </div>
  );
}

export default Pokedex;
