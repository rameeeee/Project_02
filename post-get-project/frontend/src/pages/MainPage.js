import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
    const [text, setText] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/review/")
            .then((response) => {
                setText([...response.data]);
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    return (
        <>
            <h1>메인 페이지</h1>
            <button><Link to="/post">글쓰기</Link></button>
            {text.map((e) => (
                <div key={e.id}>
                    <div>
                        <span>
                            {e.id}번, {e.title}, {e.content}, {e.update_at}
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default MainPage;
