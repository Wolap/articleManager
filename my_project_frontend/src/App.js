import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

function App() {
  const [articles, setArticles] = useState([]); 
  const [form, setForm] = useState({ topic: "", author: "", body: "" }); 
  const [editMode, setEditMode] = useState(false); 
  const [selectedArticleId, setSelectedArticleId] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddArticle = () => {
    fetch("http://localhost:8000/api/articles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles([...articles, data]); 
        setForm({ topic: "", author: "", body: "" });
      });
  };

  const handleEdit = (article) => {
    setForm({ topic: article.topic, author: article.author, body: article.body });
    setEditMode(true);
    setSelectedArticleId(article.id); 
  };

  const handleUpdateArticle = () => {
    fetch(`http://localhost:8000/api/articles/${selectedArticleId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((updatedArticle) => {

        const updatedArticles = articles.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        );
        setArticles(updatedArticles);
        setForm({ topic: "", author: "", body: "" });
        setEditMode(false);
        setSelectedArticleId(null);
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Articles
      </Typography>

      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <Typography variant="h6">{article.topic}</Typography>
          <Typography>{article.body}</Typography>
          <Typography variant="caption">Author: {article.author}</Typography>
          <div style={{ marginTop: "10px" }}>
            <Button variant="outlined" color="primary" onClick={() => handleEdit(article)}>
              Edit
            </Button>
          </div>
        </div>
      ))}

      <Typography variant="h5" component="h2" gutterBottom>
        {editMode ? "Edit Article" : "Add Article"}
      </Typography>
      <TextField
        label="Topic"
        name="topic"
        value={form.topic}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body"
        name="body"
        value={form.body}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={editMode ? handleUpdateArticle : handleAddArticle}
        style={{ marginTop: "10px" }}
      >
        {editMode ? "Save Changes" : "Add Article"}
      </Button>
    </Container>
  );
}

export default App;
