import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const App = () => {
  const [article, setArticle] = useState({
    topic: '',
    author: '',
    body: '',
  });

  const handleChange = (e) => {
      setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/articles/', article);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <TextField
        label="Topic"
        name="topic"
        value={article.topic}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        name="author"
        value={article.author}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body"
        name="body"
        value={article.body}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default App;
