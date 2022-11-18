import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterRecipeByTitle } from "../../../../redux/action/action";

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterRecipeByTitle(search));
    setSearch('');
  }
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name="search" value={search} onChange={(e) => handleChange(e)} id="" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}