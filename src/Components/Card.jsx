import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import Loader from "../../public/images/Loader.gif"
import { GET_ARTICLE_API_URL } from "../constants/apiConstants";
function Card({ type, categoryId, sourceId, search, date }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('userToken');
  const capitalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  // Fetch articles based on the type prop
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          GET_ARTICLE_API_URL,
          {
            type: type,
            category_id: categoryId,
            keyword: search,
            source_id: sourceId,
            start_date: date

          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setArticles(response.data); // Set articles in state
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      finally {
        setLoading(false); // Stop loading once request is complete
      }
    };

    if (token && type) { // Fetch only if token and type are available
      fetchArticles();
    }
  }, [type, categoryId, sourceId, search, date, token]);

  const formatTimeAgo = (timestamp) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };
  return (
    <>
    <div>
      {loading ? (  // Check if loading
        <div className="flex justify-center w-full">
          <img src={Loader} className="relative w-10 h-10" alt="Loading..." />
        </div>
      ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 py-5 mx-12 mb-5">
            {articles.map((article) => (
              <div key={article.id} className="justify-center sm:mb-0 border-b mb-5 md:mb-5 ml-5">
                {article.urlToImage && (
                  <div className="rounded-lg h-64 overflow-hidden" role="presentation">
                    <img
                      alt="content"
                      className="object-cover object-center h-full w-full -mt-2"
                      src={article.urlToImage}
                    />
                  </div>
                )}
                <h4 className="text-xl font-medium title-font text-gray-900 mt-5">
                  {article.title}
                </h4>
                <p className="text-base leading-relaxed mt-2 mb-2 mx-2">
                  {article.description}
                </p>

                <div className="flex flex-row justify-between pt-1">
                  <p className="text-sm mx-2">
                    {formatTimeAgo(article.published_at)} | 
                    <span className="px-3">{capitalizeText(article.category.name)}</span>
                  </p>
                </div>

                {article.author?.name && (
                  <div className="flex flex-row justify-between p-2">
                    <p className="text-sm">By: {article.author.name}</p>
                  </div>
                )}

                {article.source?.name && (
                  <div className="flex flex-row justify-between pt-1 p-2">
                    <p className="text-sm font-bold">{article.source.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
      ) : (
        <div className="flex justify-center w-full">
          <p>No records found</p>
        </div>
      )}
    </div>
   </>
  );
}

export default Card;
