// import React, { useState } from 'react';
// import axios from 'axios';
// import PostPreview from './PostPreview';
// import {
//     Link
//   } from "react-router-dom";

// function PostPage({ history }) {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post("http://127.0.0.1:8000/review/", {
//             title: title,
//             content: content,
//         })
//         .then(function (response) {
//             console.log(response);
//             history.push("/");
//             setSubmitted(true);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//         setTitle("");
//         setContent("");
//     }

//     if (submitted) {
//         return <PostPreview title={title} content={content} />;
//     }

//     return (
//         <>
//             <h1>글쓰기 페이지</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(event) => setTitle(event.target.value)}
//                         placeholder="제목"
//                     />
//                     <textarea
//                         value={content}
//                         onChange={(event) => setContent(event.target.value)}
//                         placeholder="내용"
//                     ></textarea>
//                     <Link to="/preview">
//                         <button type="submit">POST</button>
//                     </Link>
                    
//                 </div>
//             </form>
//         </>
//     );
// }

// export default PostPage;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import PostPreview from './PostPreview';

// function PostPage({ history }) {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post("http://127.0.0.1:8000/review/", {
//             title: title,
//             content: content,
//         })
//         .then(function (response) {
//             console.log(response);
//             history.push("/");
//             setSubmitted(true);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//         setTitle("");
//         setContent("");
//     }

//     if (submitted) {
//         return <PostPreview title={title} content={content} />;
//     }

//     return (
//         <>
//             <h1>글쓰기 페이지</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(event) => setTitle(event.target.value)}
//                         placeholder="제목"
//                     />
//                     <textarea
//                         value={content}
//                         onChange={(event) => setContent(event.target.value)}
//                         placeholder="내용"
//                     ></textarea>
//                     <Link to="/preview">
//                     <button type="submit" onClick={handleSubmit}>POST</button>

//                     </Link>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default PostPage;



import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';

function PostPage({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/review/", {
      title: title,
      content: content,
    })
      .then(function (response) {
        console.log(response);
        history.push("/");
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTitle("");
    setContent("");
  }

  if (submitted) {
    return <PostPreview title={title} content={content} />;
  }

  return (
    <>
      <h1>글쓰기 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
      {/* <Link to="/preview">미리보기</Link> */}
    </>
  );
}

export default PostPage;
