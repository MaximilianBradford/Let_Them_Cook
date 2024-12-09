"use client";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
    const { id } = useState(params);
    const [recipeData, setRecipeData] = useState(null);
    const [dataStatus, setDataStatus] = useState(false);

    useEffect(() => {
        if (id) {
            loadRecipe();
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
        <main>
        return <div className="text-2xl m-2">No recipe available</div>;
        </main>
    } else {
        return (
            <main style={{ backgroundColor: "#ecca00", backgroundSize: "Cover" }}>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">{recipeData.title}</h1>
                    <img 
                        src={recipeData.image} 
                        alt={`${recipeData.title} image`} 
                        className="w-96 h-96 object-cover rounded-md mb-4"
                    />
                    <p className="text-lg">Ready in {recipeData.readyInMinutes} minutes</p>
                    <div className="mt-4 p-4 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Dietary Information</h3>
                        <ul className="flex flex-row space-x-4 flex-wrap">
                            <li className="text-lg bg-gray-100 p-2 rounded">
                                {recipeData.glutenFree ? "✓ Gluten-Free" : "✗ Contains Gluten"}
                            </li>
                            <li className="text-lg bg-gray-100 p-2 rounded">
                                {recipeData.dairyFree ? "✓ Dairy-Free" : "��� Contains Dairy"}
                            </li>
                            <li className="text-lg bg-gray-100 p-2 rounded">
                                {recipeData.vegetarian ? "✓ Vegetarian" : "✗ Non-Vegetarian"}
                            </li>
                            <li className="text-lg bg-gray-100 p-2 rounded">
                                {recipeData.vegan ? "✓ Vegan" : "✗ Non-Vegan"}
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold p-4">Ingredients</h2>
                        <ul>
                            {recipeData.extendedIngredients.map((ingredient, index) => (
                                <li key={index} className="p-4">
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold p-4">Instructions</h2>
                    <ol>
                        {recipeData.analyzedInstructions[0].steps.map((step, index) => (
                            <li key={index} className="p-4">
                                {step.step}
                            </li>
                        ))}
                    </ol>
                </div>
    
            </main>
        );
    }

    
}