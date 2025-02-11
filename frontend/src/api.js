import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const fetchArticles = async (status) => {
    const response = await api.get(`/article/status/${status}`); 
    return response.data;
};
  

export const fetchArticleById = async (id) => {
    const response = await api.get(`/article/${id}`);
    return response.data;
};

export const createArticle = async (data) => {
    const response = await api.post("/article/", data);
    return response.data;
};

export const updateArticle = async (id, data) => {
    const response = await api.put(`/article/${id}`, data);
    return response.data;
};

export const deleteArticle = async (id) => {
    const response = await api.delete(`/article/${id}`);
    return response.data;
};
