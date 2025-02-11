import React, { useState } from "react";
import { createArticle } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/AddArticle.css"; // Tambahkan file CSS untuk styling

const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (status) => {
      if (title.length < 20 || content.length < 200 || category.length < 3) {
        alert("Title harus minimal 20 karakter, Content minimal 200 karakter, dan Category minimal 3 karakter.");
        return;
      }

      try {
        await createArticle({ title, content, category, status });
        alert(`Artikel berhasil ${status === "publish" ? "dipublikasikan" : "disimpan sebagai draft"}`);
        navigate("/"); 
      } catch (error) {
        console.error("Error creating article:", error);
        alert("Gagal membuat artikel.");
      }
    };

    return (
      <div className="add-article-container">
        <h2>Add New Article</h2>
        <form className="article-form">
          <label>Title:</label>
          <input 
            type="text" 
            placeholder="Enter article title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required/>

          <label>Content:</label>
          
          <textarea
            placeholder="Enter article content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required> 
          </textarea>

          <label>Category:</label>
          <input
            type="text"
            placeholder="Enter article category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="button" className="draft-btn" onClick={() => handleSubmit("draft")}>
              Draft
            </button>
            <button type="button" className="publish-btn" onClick={() => handleSubmit("publish")}>
              Publish
            </button>
          </div>
        </form>
      </div>
    );
};

export default AddArticle;
