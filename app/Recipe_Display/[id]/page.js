"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
    const [id, setId] = useState(null);
    const [recipeData, setRecipeData] = useState(null);
    const [dataStatus, setDataStatus] = useState(false);

    useEffect(() => {
        async function unwrapParams() {
            const unwrappedParams = await params;
            setId(unwrappedParams.id);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            loadRecipe(id);
        }
    }, [id]);

    async function fetchRecipeData(recipeID) {
        try {
            const apiKey = '3b39dfa22f1f42468f01ad86fa554199';
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Validate required fields
            if (!isValidRecipeData(data)) {
                console.warn('Invalid recipe data received:', data);
                return null;
            }
            
            return data;
        } catch (error) {
            console.log("Error fetching recipe:", error);
            return null;
        }
    }

    function isValidRecipeData(data) {
        return data &&
               typeof data === 'object' &&
               typeof data.title === 'string' &&
               typeof data.image === 'string' &&
               typeof data.readyInMinutes === 'number' &&
               Array.isArray(data.extendedIngredients) &&
               typeof data.glutenFree === 'boolean' &&
               typeof data.dairyFree === 'boolean' &&
               typeof data.vegetarian === 'boolean' &&
               typeof data.vegan === 'boolean';
    }

    async function loadRecipe() {
        const data = await fetchRecipeData(id);
        if (data && isValidRecipeData(data)) {
            setRecipeData(data);
            setDataStatus(true);
        } else {
            setRecipeData(null); 
            console.warn('Invalid or missing recipe data');
            setDataStatus(false);
        }
    }

    if (dataStatus === false) {
        return (
            <main>
                <div className="text-2xl m-2">No recipe available</div>
            </main>
        );
    }

    return (
        <main style={{ backgroundColor: "#edccb9", backgroundSize: "Cover", color: "#121520" }}>
            <div className="p-4 text-center">
                <div className="flex flex-col justify-center rounded-lg shadow p-4" 
                style={{ backgroundColor: "	#c3604d" }}>
                    <h1 className="text-3xl font-bold mb-4 m-2">{recipeData.title}</h1>
                    <p className="text-lg mb-2">Ready in {recipeData.readyInMinutes} minutes</p>
                </div>
                
                <img 
                    src={recipeData.image} 
                    alt={`${recipeData.title} image`} 
                    className="w-96 h-96 object-cover rounded-md mb-4 mx-auto m-4"
                />
                
                <div className="mt-4 p-4 rounded-lg shadow"
                style={{ backgroundColor: "	#c3604d" }}> 
                    <h3 className="text-xl font-bold mb-2">Dietary Information</h3>
                    <ul className="flex flex-row space-x-4 flex-wrap justify-center">
                        <li className="text-lg p-2 rounded"
                        style={{ backgroundColor: "#efa383" }}>
                            {recipeData.glutenFree ? "✓ Gluten-Free" : "✗ Contains Gluten"}
                        </li>
                        <li className="text-lg p-2 rounded"
                        style={{ backgroundColor: "#efa383" }}>
                            {recipeData.dairyFree ? "✓ Dairy-Free" : "✗ Contains Dairy"}
                        </li>
                        <li className="text-lg p-2 rounded"
                        style={{ backgroundColor: "#efa383" }}>
                            {recipeData.peanutFree ? "✓ Peanut-Free" : "✗ Contains Peanuts"}
                        </li>
                        <li className="text-lg p-2 rounded"
                        style={{ backgroundColor: "#efa383" }}>
                            {recipeData.shellfishFree ? "✓ No shellfish" : "✗ Contains Shellfish"}
                        </li>
                        <li className="text-lg p-2 rounded"
                        style={{ backgroundColor: "#efa383" }}>
                            {recipeData.vegan ? "✓ Vegan" : "✗ Not Vegan"}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-4 rounded-lg shadow m-4"
            style={{ backgroundColor: "#c3604d" }}>
                <h2 className="flex underline text-2xl font-bold p-4 justify-center">Ingredients</h2>
                <ul className="list-disc list-inside">
                    {recipeData.extendedIngredients.map((ingredient, index) => (
                        <li key={index} className="p-4 font-bold">
                            {ingredient.original}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 rounded-lg shadow m-4"
            style={{ backgroundColor: "#c3604d" }}>
                <h2 className="flex underline text-2xl font-bold p-4 justify-center">Instructions</h2>
                <ol  className="list-decimal list-inside">
                    {recipeData.analyzedInstructions[0].steps.map((step, index) => (
                        <li key={index} className="p-4 font-bold">
                            {step.step}
                        </li>
                    ))}
                </ol>
            </div>
            <Link href="/">
                    <button className="flex underline text-2xl font-bold p-4 justify-center">Back to Main Page</button>
            </Link>

        </main>
    );
}