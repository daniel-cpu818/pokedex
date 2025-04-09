import React, { useState } from 'react';
import PokemonsCard from './PokemonsCard';

function PokemonsList({ pokemons = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;

  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const currentPokemons = pokemons.slice(startIndex, startIndex + pokemonsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (pokemons.length === 0) {
    return (
      <div className="col-span-3 text-center text-gray-500">
        No se encontraron pokemones.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-6">
        {currentPokemons.map((pokemon) => (
          <PokemonsCard key={pokemon.name} url={pokemon.url} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span className="text-lg font-medium">
          Página {currentPage} de {totalPages}
        </span>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default PokemonsList;


