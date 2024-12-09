"use client";
import React, { useState, useEffect } from "react";
import Recipe from './Recipe.js';

export default function RowOfItems({condition}) {
    const [recipes, setRecipes] = useState([]);

    async function fetchRecipes(condition) {
        try {
            const apiKey = '3b39dfa22f1f42468f01ad86fa554199'; // Replace with your actual API key
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${condition}&apiKey=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('API response:', data);
            return data;
        } catch (error) {
            console.log("Error fetching recipes:", error);
        }
    }

    // Add validation function
    function isValidRecipe(recipe) {
        return recipe &&
               typeof recipe === 'object' &&
               typeof recipe.id === 'number' &&
               typeof recipe.title === 'string' &&
               typeof recipe.image === 'string' &&
               recipe.title.trim() !== '' &&
               recipe.image.trim() !== '';
    }

    // Modify loadRecipes function
    async function loadRecipes() {
        const data = await fetchRecipes(condition);
        if (data && data.results !== undefined) {
            const validRecipes = data.results
                .filter(recipe => {
                    const isValid = isValidRecipe(recipe);
                    if (!isValid) {
                        console.warn('Invalid recipe object:', recipe);
                    }
                    return isValid;
                })
                .slice(0, 20);
            setRecipes(validRecipes);
            console.log('Valid recipes:', validRecipes);
        } else {
            setRecipes([]);
        }
    }

    useEffect(() => {
        loadRecipes();
    }, [condition]);

    if (!recipes || recipes.length === 0) {
        return <div className="text-2xl m-2">No recipes available</div>;
    }

    return (
        <div className="flex flex-wrap justify-center max-w-full">
            {recipes.map(item => (
                <div key={item.id} className="p-2 m-4 flex-shrink-0">
                    <Recipe 
                        name={item.title} 
                        image={item.image}
                        id={item.id}
                    />
                </div>
            ))}
        </div>
    );

}