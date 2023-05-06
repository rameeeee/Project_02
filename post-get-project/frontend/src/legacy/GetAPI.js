import React, { useState } from 'react';
import axios from 'axios';
import "./RestAPI.css";

function GetAPI() {
    const [text, setText] = useState([]);

    const handleGet = () => {
        axios
            .get("http://127.0.0.1:8000/review/")
            .then((response) => {
                setText([...response.data]);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <>
            <h1>GET API 연습</h1>
            <button onClick={handleGet}>GET</button>
            {text.map((e) => (
                <div key={e.id}>
                    <div className="list">
                        <span>
                            {e.id}번, {e.title}, {e.content}, {e.update_at}
                        </span>
                        <button
                            className="btn-delete"
                            onClick={() => {
                                axios.delete(`http://127.0.0.1:8000/review/${e.id}`);
                                setText(text.filter((text) => text.id !== e.id));
                            }}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default GetAPI;