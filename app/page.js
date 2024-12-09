"use client";
import React, { useRef } from "react";
import Row_of_items from "./recipe_retrieval/item_Mapping";
//import {Recipe_Display} from "./Main_Pages/Recipe_Display/[id]/Recipe_Display";
//import {Search_Function} from "./Search_Function";

export default function Page() {
  const [userQuery, setUserQuery] = React.useState("");
  const inputRef = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    setUserQuery(inputRef.current.value);
    console.log(inputRef.current.value); // This will log the user input
  };


  return (
    <main style={{ backgroundColor: "#ecca00", backgroundSize: "Cover" }}>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold m-2">Let Them Cook</h2>
          <p className="text-lg m-2">A place to find recipes</p>
          <form onSubmit = {handleSubmit} className="flex flex-row m-2">
            <input  type="text" ref={inputRef} className="m-2 p-2" placeholder="Search for a recipe"></input>
            <button type="submit" className="m-2 p-2 bg-blue-500 text-white rounded-md">Search</button>
          </form> 
        </div>
      </div>

      {userQuery ? (
        <div className="search-results">
          <p className="flex text-lg m-2 font-bold justify-center">
            Search Results for "{userQuery}"
          </p>
          <div className="flex justify-center">
            <Row_of_items condition={userQuery} />
          </div>
        </div>
      ) : (
        <div className="pre-determined-recipes">
          <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Dairy-Free Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Dairy-Free"} />
            </div>
          </div>

          {/* <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Vegan Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Vegan"} />
            </div>
          </div>

          <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Gluten-Free Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Gluten-Free"} />
            </div>
          </div> */}
        </div>
      )}
    </main>
  );
}