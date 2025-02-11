import React, { useEffect, useState } from "react";
import { fetchArticles, updateArticle  } from "../api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllPosts = () => {
    const [articles, setArticles] = useState([]);
    const [activeTab, setActiveTab] = useState("publish");
    const navigate = useNavigate();

    const loadArticles = async (status) => {
        try {
        const data = await fetchArticles(status);
        setArticles(data);
        } catch (error) {
        console.error("Error fetching articles:", error);
        }
    };
    useEffect(() => {
        loadArticles(activeTab);
    }, [activeTab]);

    const moveToTrash = async (id) => {
        await updateArticle(id, { status: "thrash" });
        loadArticles(activeTab);
    };

    return (
        <div>
        <h2>All Posts</h2>
        <button onClick={() => navigate(`/add`)}>Add New</button>
        <button onClick={() => navigate(`/preview`)}>Preview</button>
        <div>
            <button onClick={() => setActiveTab("publish")}>Published</button>
            <button onClick={() => setActiveTab("draft")}>Drafts</button>
            <button onClick={() => setActiveTab("thrash")}>Trash</button>
        </div>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {articles.length === 0 ? (
                <tr>
                <td colSpan="3">No articles found</td>
                </tr>
            ) : (
                articles.map((article) => (
                <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.category}</td>
                    <td>
                    <FaEdit 
                        style={{ cursor: "pointer", marginRight: "10px", color: "#007bff" }} 
                        onClick={() => navigate(`/edit/${article.id}`)}/>
                    {activeTab !== "thrash" && (
                        <FaTrash 
                        style={{ cursor: "pointer", color: "red" }} 
                        onClick={() => moveToTrash(article.id)}/>
                    )}
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
};

export default AllPosts;
