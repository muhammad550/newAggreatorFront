import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_CATEGORY_API_URL } from "../constants/apiConstants";
function CategoriesList({ type , selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('userToken');

  // Function to capitalize the first letter of each word
  const capitalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(GET_CATEGORY_API_URL, {
          type: type
        }, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        console.log("responsedata",response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, [type, token]); // Run the effect when the type or token changes

  // Function to handle category click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Set the clicked category as the selected one
  };

  return (
    <div className="p-4">
      <ul className="flex flex-wrap gap-4 items-center justify-center text-gray-900 dark:text-black mt-3">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>
              <a
                href="#"
                onClick={() => handleCategoryClick(category.id)} // Set the selected category on click
                className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-900"
                } hover:bg-black hover:text-white`}
              >
                {capitalizeText(category.name)} {/* Display category name */}
              </a>
            </li>
          ))
        ) : (
          null
        )}
      </ul>
    </div>
  );
}

export default CategoriesList;
