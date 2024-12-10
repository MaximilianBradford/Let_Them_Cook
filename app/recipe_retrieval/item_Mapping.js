"use client";
import React, { useState, useEffect } from "react";
import Recipe from './Recipe.js';

export default function RowOfItems({ condition, limits, search }) {
    const [recipes, setRecipes] = useState([]);
    console.log('RowOfItems:', condition, limits);
    async function fetchRecipes(condition, limits) {
        try {
            const apiKey = '3b39dfa22f1f42468f01ad86fa554199'; // Replace with your actual API key
            let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
            
            if (condition) {
                url += `&query=${condition}`;
            }
            if (limits) {
                url += `&intolerances=${limits}`;
            }

            if (search === true) {
                url += `&number=36`;
            } else {
                url += `&number=5`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('API response:', data);
            return data;
        } catch (error) {
            console.log("Error fetching recipes:", error);
            return null;
        }
    }

    async function loadRecipes() {
        console.log('Loading recipes for condition:', condition, 'and limits:', limits);
        const data = await fetchRecipes(condition, limits);
        console.log('Fetched data:', data);
        if (data && data.results !== undefined) {
            const validRecipes = data.results.slice(0, 20);
            setRecipes(validRecipes);
            console.log('Valid recipes:', validRecipes);
        } else {
            setRecipes([]);
            console.warn('Invalid or missing recipe data:', data);
        }
    }

    useEffect(() => {
        loadRecipes();
    }, [condition, limits]);

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