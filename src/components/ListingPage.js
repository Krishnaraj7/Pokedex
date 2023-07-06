import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const offset = (page - 1) * 20;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
        );
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchPokemonList();
  }, [page]);

  useEffect(() => {
    setPokemonList([]);
    setPage(1);
  }, [location.state]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-16 px-7">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className=" rounded-xl overflow-hidden shadow-2xl items-center justify-center flex h-[250px] bg-slate-950"
          >
            <Link to={`/details/${pokemon.url.split("/")[6]}`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
                className="h-40"
              />
              <p className=" text-gray-50 font-semibold text-center capitalize text-lg py-3 ">
                {pokemon.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ListingPage;
