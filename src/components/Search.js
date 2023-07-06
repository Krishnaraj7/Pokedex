import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/Pokédex_logo.png";
import { BsFillBookmarkFill } from "react-icons/bs";
import ListingPage from "./ListingPage";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchInput}`
        );
        setLoading(false);
        navigate(`/details/${response.data.id}`);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-xl pb-6">
        <img
          src={logo}
          className="w-36 md:w-48 lg:w-[270px] absolute py-5 px-4"
          alt="Logo"
        />
        <Link to="/bookmarks">
          <BsFillBookmarkFill
            size={25}
            className="absolute right-0 mt-[30px] md:mt-[50px] mr-7"
          />
        </Link>

        <div className="flex justify-center items-center w-full h-32 bg-white">
          <div className="w-[500px] relative top-10 md:top-0">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Pokémon Name"
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-500 text-black"
              />
              <button
                type="submit"
                className="bg-slate-900 text-white py-2 px-4 rounded-r-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-500"
              >
                Search
              </button>
            </form>
            {loading && (
              <p className="mt-4 text-center text-black">Loading...</p>
            )}
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <div className=" mt-40">
        <ListingPage />
      </div>
    </>
  );
};

export default Search;
