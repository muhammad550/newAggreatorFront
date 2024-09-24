import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_AUTHOR_API_URL } from "../constants/apiConstants";
function AuthorSelect({ type }) {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const token = localStorage.getItem('userToken'); // Replace with your actual token

  useEffect(() => {
    // Fetch authors when the component mounts or when the type changes
    const fetchAuthors = async () => {
      try {
        const response = await axios.post(GET_AUTHOR_API_URL, {
            type: type // Use the type prop in the API request
        }, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in request headers
          }
        });
        setAuthors(response.data); // Update the authors state with the response data
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors(); // Call the function to fetch authors
  }, [type, token]); // Run the effect when the type or token changes

  const handleChange = (e) => {
    setSelectedAuthor(e.target.value); // Update the selected author
  };

  return (
    <div className="flex justify-start">
      <select
        id="authors"
        name="authors"
        className="border rounded px-2 py-1"
        value={selectedAuthor}
        onChange={handleChange}
      >
        <option value="" disabled>Select an author</option>
        {authors.length > 0 ? (
          authors.map((author) => {
            // Truncate author name if more than two commas are present
            const displayName = truncateAuthorName(author.name);
            return (
              <option key={author.id} value={author.id}>
                {displayName.length > 25 ? `${displayName.substring(0, 25)}...` : displayName}
              </option>
            );
          })
        ) : (
          <option>Loading authors...</option>
        )}
      </select>
    </div>
  );
}

// Utility function to truncate author names
const truncateAuthorName = (name) => {
    if (!name) return ""; // Handle null or undefined name
    
    const commaIndex1 = name.indexOf(',');
    const commaIndex2 = name.indexOf(',', commaIndex1 + 1);
    
    if (commaIndex2 === -1) {
      // If there are fewer than two commas, return the name as is
      return name;
    }
    
    // Return the substring up to the second comma
    return name.substring(0, commaIndex2);
  };

export default AuthorSelect;
