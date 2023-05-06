// import './App.css';
// import React from 'react';
// // import PostAPI from './PostAPI';
// // import GetAPI from './GetAPI';
// import MainPage from './pages/MainPage';

// function App() {
//     return (
//         <>
//             {/* <PostAPI />
//             <GetAPI /> */}
//             <MainPage/>
//         </>
//     );
// }

// export default App;

import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import PostPreview from './pages/PostPreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/post" element={<PostPage />} />
        <Route exact path="/preview" element={<PostPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;