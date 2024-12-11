"use client";
import React, { useRef, useState, useEffect } from "react";
import Row_of_items from "./recipe_retrieval/item_Mapping";

export default function Page() {
  const [userQuery, setUserQuery] = useState("");
  const [userLimitations, setUserLimitations] = useState([]);
  const [limitations, setLimitations] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserLimitations((prev) => [...prev, value]);
    } else {
      setUserLimitations((prev) => prev.filter((limitation) => limitation !== value));
    }
  };

  useEffect(() => {
    console.log("Updated userLimitations:", userLimitations);
  }, [userLimitations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    setUserQuery(query);
    setLimitations(userLimitations.join(", "));
    console.log(`Query: ${query}, Limitations: ${limitations}`);
    formRef.current.reset();
    setUserLimitations([]);
    //setLimitations("");
  };

  return (
    <main style={{ backgroundColor: "#edccb9", backgroundSize: "Cover"}}>
      <div className="flex justify-center">
        <div className="flex flex-col items-center rounded-lg shadow p-4 m-2"
        style={{ backgroundColor: "#c3604d" , color: "#121520" }}>
          <h2 className="text-3xl font-bold m-2">Let Them Cook</h2>
          <p className="text-lg m-2">A place to find recipes</p>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col m-2">
            <input  type="text" ref={inputRef} className="m-2 p-2" placeholder="Search for a recipe" />
            <div className="m-2 p-2">
              <label className="m-2 p-2">
                <input type="checkbox" id="dairy-free" name="dairy-free" value="Dairy" onChange={handleCheckboxChange} />
                Dairy-Free
              </label>
              <label className="m-2 p-2">
                <input type="checkbox" id="gluten-free" name="gluten-free" value="Gluten" onChange={handleCheckboxChange} />
                Gluten-Free
              </label>
              <label className="m-2 p-2">
                <input type="checkbox" id="peanut-free" name="peanut-free" value="Peanut" onChange={handleCheckboxChange} />
                Peanut-Free
              </label>
              <label className="m-2 p-2"> 
                <input type="checkbox" id="shellfish-free" name="shellfish-free" value="Shellfish" onChange={handleCheckboxChange} />
                Shellfish-Free
              </label>
              <label className="m-2 p-2">
                <input type="checkbox" id="grain" name="grain" value="Grain" onChange={handleCheckboxChange} />
                Grain-Free
              </label>
            </div>
            <button type="submit" className="m-2 p-2 bg-blue-500 text-white rounded-md">Search</button>
          </form>
        </div>
      </div>

      {userQuery ? (
        <div className="search-results">
          <p className="flex text-lg m-2 font-bold justify-center">
            Search Results for: {userQuery}
          </p>
          <p className="flex text-lg m-2 font-bold justify-center">
            Limitations: {limitations}
          </p>
          <div className="flex justify-center">
            <Row_of_items condition={userQuery} limits={limitations}  search = {true}/>
          </div>
        </div>
      ) : (
        <div className="pre-determined-recipes">
          <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Dairy-Free Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Dairy-Free"} limits={""} search = {false}/>
            </div>
          </div>

           <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Vegan Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Vegan"} limits={""} search = {false} />
            </div>
          </div>

          <div className="rounded-md">
            <p className="flex text-lg m-2 font-bold justify-center">
              Gluten-Free Recipes
            </p>
            <div className="flex justify-center">
              <Row_of_items condition={"Gluten-Free"} limits={""} search = {false}/>
            </div>
          </div> 
        </div>
      )}
    </main>
  );
}