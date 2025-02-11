import React, { useEffect, useState } from "react";
import { fetchArticleById, updateArticle } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
      title: "",
      content: "",
      category: "",
      status: "",
    });

    useEffect(() => {
      const loadArticle = async () => {
        const data = await fetchArticleById(id);
        setArticle(data);
      };
      loadArticle();
    }, [id]);

    const handleSubmit = async (status) => {
      await updateArticle(id, { ...article, status });
      navigate("/");
    };

    return (
      <div>
        <h2>Edit Article</h2>
        <input
          type="text"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <textarea
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <input
          type="text"
          value={article.category}
          onChange={(e) => setArticle({ ...article, category: e.target.value })}
        />
        <button onClick={() => handleSubmit("publish")}>Publish</button>
        <button onClick={() => handleSubmit("draft")}>Draft</button>
      </div>
    );
};

export default EditArticle;
