import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Source from "./Components/Source";
import Card from "./Components/Card";
import Cateogries from "./Components/Categories";
import Authors from "./Components/Author";

function Home() {
  const { type } = useParams(); // Get the type from the URL parameters
  const [date, setdate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchkeyword, setSearchkeyword] = useState(null);
 

  // Map route types to API values
  const typeMapping = {
    news: "News",
    newyork: "New York Times",
    theguardian: "The Guardian"
  };
  const apiType = type && typeMapping[type] ? typeMapping[type] : "News"; 

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchkeyword(null);
    if(e.target.value.length > 3){
      setSearchkeyword(e.target.value);
    }
  };

  const handleDate = (e) => {
    setdate(e.target.value);
  };
  useEffect(() => {
    setSelectedCategory(null);
    setSearchkeyword('');
    setdate('');
    setSelectedSource('');
  }, [type]);
  
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-">
        <div className="px-5 flex flex-col p-3 pt-5 mt-5 mx-auto max-w-screen-xl">
          <h4 className="py-3"><b>Search for articles by keyword and filter the results by Date, Category, and Source</b></h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="w-full">
              <div className="w-full">
              <input
                type="text"
                name="search"
                placeholder="Keyword"
                className="border p-2 rounded w-full"
                onChange={handleInputChange} // Use onChange instead of onKeyUp
                value={searchkeyword} // Controlled input value
              />
              </div>
            </div>
            {/* Date Input */}
            <div className="w-full">
              <input
                type="date"
                className="border px-2 py-1 w-full"
                onChange={handleDate}
                value={date}
              />
            </div>
            {/* Source Component */}
            <div className="w-full">
              <Source type={apiType} 
                    selectedSource={selectedSource}
                    setSelectedSource={setSelectedSource}
              />
            </div>
            {/* Authors Component 
            <div className="w-full">
              <Authors type={apiType} /> 
            </div>
            */}
          </div>
        </div>

        <div className="py-5">
          <Cateogries type={apiType}
                    selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory} /> {/* Pass the type as a prop */}
        </div>
        
            <Card type={apiType}  categoryId={selectedCategory} 
              search={searchkeyword}
              date={date}
              sourceId={selectedSource}
            />
        
       
      </div>
    </>
  );
}

export default Home;
