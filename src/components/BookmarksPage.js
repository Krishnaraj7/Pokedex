import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookmarkPage = () => {
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);

  useEffect(() => {
    const fetchBookmarkedPokemons = async () => {
      const bookmarkedIds = Object.keys(localStorage);
      const pokemons = [];

      for (const id of bookmarkedIds) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const pokemon = {
            id,
            name: response.data.name,
            imageUrl:
              response.data.sprites.other["official-artwork"].front_default,
          };
          pokemons.push(pokemon);
        } catch (error) {
          console.error(
            `Error fetching bookmarked pokemon with ID: ${id}`,
            error
          );
        }
      }

      setBookmarkedPokemons(pokemons);
    };

    fetchBookmarkedPokemons();
  }, []);

  const handleRemoveBookmark = (id) => {
    localStorage.removeItem(id);
    setBookmarkedPokemons((prevPokemons) =>
      prevPokemons.filter((pokemon) => pokemon.id !== id)
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-xl pb-6 h-20">
        <h1 className="mt-6 ml-6 text-2xl font-semibold">Bookmarks</h1>
      </div>
      {bookmarkedPokemons.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-16 px-7 mt-24">
          {bookmarkedPokemons.map((pokemon) => (
            <div
              key={pokemon.name}
              className="rounded-xl overflow-hidden shadow-2xl bg-slate-950"
            >
              <Link to={`/details/${pokemon.id}`}>
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="h-40"
                />
                <p className="text-gray-50 font-semibold text-center capitalize text-lg py-3">
                  {pokemon.name}
                </p>
              </Link>
              <button
                onClick={() => handleRemoveBookmark(pokemon.id)}
                className="text-black bg-white rounded-md px-3 mt-2 mb-4 mx-auto block"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarked pokemons found.</p>
      )}
    </div>
  );
};

export default BookmarkPage;
