import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tab from './Tab'; // Assuming Tab component handles the tab navigation
import Loader from "../../public/images/Loader.gif"
import { GET_CATEGORY_API_URL,
  GET_SOURCE_API_URL,
  GET_AUTHOR_API_URL,
  GET_PREFRENCES_API_URL,
  POST_PREFRENCES_API_URL
 } from "../constants/apiConstants";
function Preferences() {
  const token = localStorage.getItem('userToken');

  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [disbale, setDisabale] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for showing loader

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState([]);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);

  const [activeTab, setActiveTab] = useState('Categories');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(GET_PREFRENCES_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { preferred_sources, preferred_categories, preferred_authors } = response.data;

        setSelectedSourceIds(preferred_sources ? JSON.parse(preferred_sources) : []);
        setSelectedCategoryIds(preferred_categories ? JSON.parse(preferred_categories) : []);
        setSelectedAuthorIds(preferred_authors ? JSON.parse(preferred_authors) : []);

      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [categoryResponse, sourceResponse, authorResponse, userPreferenceResponse] = await Promise.all([
          axios.post(GET_CATEGORY_API_URL, { type: 'all' }, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post(GET_SOURCE_API_URL, { type: 'all' }, { headers: { Authorization: `Bearer ${token}` } }),
          axios.post(GET_AUTHOR_API_URL, { type: 'all' }, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(GET_PREFRENCES_API_URL, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setCategories(categoryResponse.data);
        setSources(sourceResponse.data);
        setAuthors(authorResponse.data);

        const savedPreferences = userPreferenceResponse.data;
        setSelectedCategoryIds(savedPreferences.preferred_categories ? JSON.parse(savedPreferences.preferred_categories) : []);
        setSelectedSourceIds(savedPreferences.preferred_sources ? JSON.parse(savedPreferences.preferred_sources) : []);
        setSelectedAuthorIds(savedPreferences.preferred_authors ? JSON.parse(savedPreferences.preferred_authors ) : []);

      } catch (error) {
        console.error("Error fetching preferences data:", error);
      }
      finally {
        setIsLoading(false); // Stop the loader
      }
    };

    fetchData();
  }, [token]);

  const handleCheckboxChange = (id, type) => {
    switch (type) {
      case 'Category':
        setSelectedCategoryIds((prev) => {
          if (Array.isArray(prev)) {
            return prev.includes(id) ? prev.filter((categoryId) => categoryId !== id) : [...prev, id];
          } else {
            return [id];
          }
        });
        break;

      case 'Source':
        setSelectedSourceIds((prev) => {
          if (Array.isArray(prev)) {
            return prev.includes(id) ? prev.filter((sourceId) => sourceId !== id) : [...prev, id];
          } else {
            return [id];
          }
        });
        break;

      case 'Author':
        setSelectedAuthorIds((prev) => {
          if (Array.isArray(prev)) {
            return prev.includes(id) ? prev.filter((authorId) => authorId !== id) : [...prev, id];
          } else {
            return [id];
          }
        });
        break;

      default:
        break;
    }
  };

  const renderList = (items, type) => {
    const allSelected = (
      type === 'Category' ? selectedCategoryIds :
      type === 'Source' ? selectedSourceIds :
      selectedAuthorIds
    ).length === items.length;

    return (
      <>
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id={`select-all-${type}`}
              checked={allSelected}
              onChange={() => handleSelectAll(type)}
              className="mr-2"
            />
            <label htmlFor={`select-all-${type}`} className="text-sm font-medium">{`Select All ${type}s`}</label>
          </div>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           
            {items.map(item => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${type}-${item.id}`}
                  checked={
                    type === 'Category' ? selectedCategoryIds.includes(item.id) :
                    type === 'Source' ? selectedSourceIds.includes(item.id) :
                    selectedAuthorIds.includes(item.id)
                  }
                  onChange={() => handleCheckboxChange(item.id, type)}
                  className="mr-2"
                />
                <label htmlFor={`${type}-${item.id}`} className="text-sm">{item.name}</label>
              </div>
            ))}
         
          </div>
         
          
        </div>
        </>
    );
  };

  const handleSelectAll = (type) => {
    switch (type) {
      case 'Category':
        setSelectedCategoryIds(
          selectedCategoryIds.length === categories.length
            ? []
            : categories.map(category => category.id)
        );
        break;
      case 'Source':
        setSelectedSourceIds(
          selectedSourceIds.length === sources.length
            ? []
            : sources.map(source => source.id)
        );
        break;
      case 'Author':
        setSelectedAuthorIds(
          selectedAuthorIds.length === authors.length
            ? []
            : authors.map(author => author.id)
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPreferences = {
      preferred_sources: Array.isArray(selectedSourceIds) ? JSON.stringify(selectedSourceIds) : selectedSourceIds,
      preferred_categories: Array.isArray(selectedCategoryIds) ? JSON.stringify(selectedCategoryIds) : selectedCategoryIds,
      preferred_authors: Array.isArray(selectedAuthorIds) ? JSON.stringify(selectedAuthorIds) : selectedAuthorIds,
    };

    try {
      const response = await axios.post(POST_PREFRENCES_API_URL, selectedPreferences, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Preferences saved:", response.data);
      setSuccessMessage('Preferences updated successfully!'); // Set success message
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Customize Your Preferences</h2>
      <Tab tabs={['Categories', 'Sources', 'Authors']} activeTab={activeTab} onTabChange={setActiveTab} />

      <form onSubmit={handleSubmit}>
        {activeTab === 'Categories' && renderList(categories, 'Category')}
        {activeTab === 'Sources' && renderList(sources, 'Source')}
        {activeTab === 'Authors' && renderList(authors, 'Author')}
        {isLoading  ? (  // Check if loading
          <div className="flex justify-center w-full">
            <img src={Loader} className="relative w-10 h-10" alt="Loading..." />
          </div>
          ) : (
            <button
            type="submit"
            // Disable button when loading
            className="w-full text-white bg-[#000000] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"
          >
            Save Preferences
          </button>
          )
        }

       
        
        
      </form>
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Preferences;
