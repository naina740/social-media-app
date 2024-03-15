import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createpost.css'; // Import the CSS file

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate('/login');
        }
    }, []);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleFormData = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:3000/posts', {
                title: title,
                content: content
            }, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("jwtToken")
                }
            });
            if (response.status === 201) {
                navigate('/posts');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div className="containeerr"> 
            <h1>Create Post :</h1>
            <form onSubmit={handleFormData}>
                <div className="form-group" >
                    <label>Title :</label>
                    <input type='text' value={title} onChange={handleTitle}></input>
                </div>
                <div className="form-group">
                    <label>Content :</label>
                    <input type='text' value={content} onChange={handleContent}></input>
                </div>
                <div className="form-group"> 
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}
