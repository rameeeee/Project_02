import React from 'react';

function PostPreview({title, content}) {
    return (
        <>
            <h2>{title}</h2>
            <p>{content}</p>
        </>
    );
}

export default PostPreview;


// import React from 'react';

// function PostPreview(props) {
//   return (
//     <>
//       <h1>미리보기</h1>
//       <h2>{props.title}</h2>
//       <p>{props.content}</p>
//     </>
//   );
// }

// export default PostPreview;