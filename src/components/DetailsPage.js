import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleBookmark = () => {
    const isBookmarked = localStorage.getItem(id);
    if (isBookmarked) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, JSON.stringify(pokemonDetails));
    }
    setBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const isBookmarked = localStorage.getItem(id);
    setBookmarked(!!isBookmarked);
  }, [id]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-gray-300 z-10 shadow-xl pb-6 h-20 ">
        <h1 className=" mt-6 ml-6 text-2xl font-semibold capitalize">
          {" "}
          {pokemonDetails?.name}
        </h1>
      </div>
      <div className="bg-slate-950 min-h-screen text-white flex justify-center items-center capitalize">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : pokemonDetails ? (
          <div>
            <h1 className="text-center  text-4xl capitalize font-bold">
              {pokemonDetails.name}
            </h1>
            <div className="flex flex-col md:flex-row gap-8 shadow-xl shadow-gray-700 bg-gray-200 rounded-xl mt-4 py-9 px-5 max-w-[700px] mx-auto">
              <div className="w-full md:w-1/2 h-full rounded-xl p-4">
                <img
                  src={
                    pokemonDetails.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={pokemonDetails.name}
                  className="w-full"
                />
              </div>

              <div className="text-slate-900 font-bold flex-grow">
                <p className="mb-2">Weight: {pokemonDetails.weight}</p>
                <p className="mb-2">Height: {pokemonDetails.height}</p>
                <p className="mb-2">
                  Types:{" "}
                  {pokemonDetails.types
                    .map((type) => type.type.name)
                    .join(", ")}
                </p>
                <p className="mb-2">
                  Abilities:{" "}
                  {pokemonDetails.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>
                <p className="mb-2">Species: {pokemonDetails.species.name}</p>
                <p className="mb-2">Stats:</p>
                <ul className="list-disc pl-6 mb-4">
                  {pokemonDetails.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleBookmark}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  {bookmarked ? "Remove Bookmark" : "Bookmark"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </>
  );
};

export default DetailsPage;
