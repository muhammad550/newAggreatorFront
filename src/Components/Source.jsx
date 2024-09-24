import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_SOURCE_API_URL } from "../constants/apiConstants";
function Select({ type, selectedSource, setSelectedSource }) {
  const [sources, setSources] = useState([]); // State to hold sources
  const token = localStorage.getItem('userToken'); // Replace with your actual token

  useEffect(() => {
    // Fetch sources when the component mounts or type changes
    const fetchSources = async () => {
      try {
        const response = await axios.post(
          GET_SOURCE_API_URL,
          { type: type }, // Use the type prop in the request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in request headers
            },
          }
        );
        setSources(response.data); // Update the sources state with the response data
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchSources(); // Call the function to fetch sources
  }, [type, token]); // Run the effect when the type or token changes

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSource(selectedValue); // Set the selected source in the parent component
  };

  return (
    <div className="flex justify-start">
      <select
        name="source"
        id="source"
        className="border rounded px-2 py-1"
        onChange={handleChange}
        value={selectedSource} // Use selectedSource as the controlled value
      >
        <option value="" disabled>
          Select a source
        </option>
        {sources.length > 0 ? (
          sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name} {/* Display source name */}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Loading sources...
          </option>
        )}
      </select>
    </div>
  );
}

export default Select;
