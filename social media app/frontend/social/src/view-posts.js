// ViewPosts.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import './view-posts.css'; // Import CSS file for styles

export default function ViewPosts() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        });
        setApiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Something went wrong while fetching posts.');
        setLoading(false);
      }
    };

    if (!localStorage.getItem('jwtToken')) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const handleDeletePost = async (postId) => {
    try {
      console.log('Deleting post with ID:', postId);
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      });
      console.log('Post deleted successfully');
      // Remove the deleted post from the state
      setApiData(apiData.filter(post => post.id !== postId));
      // Navigate back to the view posts page
      return <Navigate to="/view-posts" />;
    } catch (error) {
      console.error('Error deleting post:', error.response);
      setError('Something went wrong while deleting the post.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="containeer"  >
      <h1 style={titleStyle}>Posts:</h1>
      {apiData.map(data => (
        <div className="post" key={data.id}>
          <h4 className="post-title">Title: {data.title}</h4>
          <p className="post-content">Content: {data.content}</p>
        <a href="/createpost" style={buttonStyle}>Create Post</a>
        </div>
      ))}
    </div>
  );
}
const titleStyle={
  fontSize:'24px',
    marginBottom:'20px',
};
const buttonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: '#1da1f2',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};