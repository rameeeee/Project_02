import React, { useState } from 'react';
import axios from 'axios';
import "./RestAPI.css";

function PostAPI() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/review/", {
            title: title,
            content: content,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        setTitle("");
        setContent("");
    }

    return (
        <>
            <h1>POST API 연습</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-area">
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="제목"
                    />
                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="내용"
                    ></textarea>
                    <button type="submit">POST</button>
                </div>
            </form>
        </>
    );
}

export default PostAPI;