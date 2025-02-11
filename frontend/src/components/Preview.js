import React, { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import "../styles/Preview.css";
const Preview = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5; 

    const loadArticles = async () => {
        try {
        const data = await fetchArticles("publish"); 
        setArticles(data);
        } catch (error) {
        console.error("Error fetching articles:", error);
        }
    };
    useEffect(() => {
        loadArticles();
    }, []);

   
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    return (
        <div>
        <h2>Preview</h2>
        {currentArticles.length === 0 ? (
            <p>No articles found</p>
        ) : (
            <div>
            {currentArticles.map((article) => (
                <div key={article.id} className="article">
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <span>Category: {article.category}</span>
                <hr />
                </div>
            ))}
            </div>
        )}
 
        {totalPages >= 1 && (
            <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                    Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                </button>
            ))}

            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    Next
            </button>
            </div>
        )}
        </div>
    );
};

export default Preview;
