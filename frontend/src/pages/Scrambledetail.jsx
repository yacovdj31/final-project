

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';

// const ScrambleDetail = () => {
//   const { id } = useParams();
//   const [scrambleItem, setScrambleItem] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchScrambleItem = async () => {
//       if (user && user.token) {
//         try {
//           const response = await axios.get(`/api/scramble/public/${id}`, {
//             headers: {
//               'Authorization': `Bearer ${user.token}`
//             }
//           });
//           setScrambleItem(response.data);
//         } catch (error) {
//           console.error('Error fetching scramble item', error);
//           setErrorMessage("Failed to load scramble item details.");
//         }
//       }
//     };

//     fetchScrambleItem();
//   }, [id, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user.token) {
//       setErrorMessage("You must be logged in to comment.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `/api/scramble/${id}/comment`,
//         {
//           text: commentText,
//           rating: rating,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           },
//         }
//       );

//       setScrambleItem((prevState) => ({
//         ...prevState,
//         comments: [...prevState.comments, response.data],
//       }));
//       setCommentText("");
//       setRating(0);
//     } catch (error) {
//       console.error("Error submitting comment", error);
//       setErrorMessage("Failed to submit comment.");
//     }
//   };

//   if (!scrambleItem) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='scramble-detail'>
//       <h2>Scrambled Word Details</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <p>Original: {scrambleItem.original}</p>
//       <p>Scrambled: {scrambleItem.scrambled}</p>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="comment">Comment:</label>
//         <textarea
//           id="comment"
//           name="comment"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         ></textarea>

//         <label htmlFor="rating">Rating (1-10):</label>
//         <input
//           type="number"
//           id="rating"
//           name="rating"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           min="1"
//           max="10"
//         />
//         <button type="submit">Submit Comment</button>
//       </form>

//       <div className="comments">
//         <h3>Comments:</h3>
//         <ul>
//           {scrambleItem.comments &&
//             scrambleItem.comments.map((comment, index) => (
//               <li key={index}>
//                 Rating: {comment.rating} - {comment.text} - {new Date(comment.createdAt).toLocaleString()}
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScrambleDetail;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';

// const ScrambleDetail = () => {
//   const { id } = useParams();
//   const [scrambleItem, setScrambleItem] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchScrambleItem = async () => {
//       if (user && user.token) {
//         try {
//           const response = await axios.get(`/api/scramble/public/${id}`, {
//             headers: {
//               'Authorization': `Bearer ${user.token}`
//             }
//           });
//           setScrambleItem(response.data);
//         } catch (error) {
//           console.error('Error fetching scramble item', error);
//           setErrorMessage("Failed to load scramble item details.");
//         }
//       }
//     };

//     fetchScrambleItem();
//   }, [id, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user.token) {
//       setErrorMessage("You must be logged in to comment and rate.");
//       return;
//     }

//     try {
//       // Submit the comment
//       const commentResponse = await axios.post(
//         `/api/scramble/${id}/comment`,
//         {
//           text: commentText,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           },
//         }
//       );

//       // Submit the rating
//       const ratingResponse = await axios.post(
//         `/api/scramble/${id}/rating`,
//         {
//           value: rating,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           },
//         }
//       );

//       // Update the scrambleItem state with the new comment and rating
//       setScrambleItem((prevState) => ({
//         ...prevState,
//         comments: [...prevState.comments, commentResponse.data],
//         ratings: [...prevState.ratings, ratingResponse.data],
//       }));

//       setCommentText("");
//       setRating(0);
//     } catch (error) {
//       console.error("Error submitting comment or rating", error);
//       setErrorMessage("Failed to submit comment and rating.");
//     }
//   };

//   if (!scrambleItem) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='scramble-detail'>
//       <h2>Scrambled Word Details</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <p>Original: {scrambleItem.original}</p>
//       <p>Scrambled: {scrambleItem.scrambled}</p>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="comment">Comment:</label>
//         <textarea
//           id="comment"
//           name="comment"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         ></textarea>

//         <label htmlFor="rating">Rating (1-10):</label>
//         <input
//           type="number"
//           id="rating"
//           name="rating"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           min="1"
//           max="10"
//         />
//         <button type="submit">Submit Comment and Rating</button>
//       </form>

//       <div className="comments">
//         <h3>Comments:</h3>
//         <ul>
//           {scrambleItem.comments &&
//             scrambleItem.comments.map((comment, index) => (
//               <li key={index}>
//                 Rating: {comment.rating} - {comment.text} - {new Date(comment.createdAt).toLocaleString()}
//               </li>
//             ))}
//         </ul>
//       </div>
//       <div className="ratings">
//         <h3>Ratings:</h3>
//         <ul>
//           {scrambleItem.ratings &&
//             scrambleItem.ratings.map((userRating, index) => (
//               <li key={`rating-${index}`}>
//                 User Rating: {userRating.value}
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScrambleDetail;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating'; // Import the StarRating component

const ScrambleDetail = () => {
  const { id } = useParams();
  const [scrambleItem, setScrambleItem] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchScrambleItem = async () => {
      try {
        const response = await axios.get(`/api/scramble/public/${id}`);
        setScrambleItem(response.data);
      } catch (error) {
        console.error('Error fetching scramble item', error);
        setErrorMessage('Failed to load scramble item details.');
      }
    };

    fetchScrambleItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;

    if (!token) {
      setErrorMessage('You must be logged in to comment and rate.');
      return;
    }

    try {
      // Submit the comment
      const commentResponse = await axios.post(
        `/api/scramble/${id}/comment`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Submit the rating
      const ratingResponse = await axios.post(
        `/api/scramble/${id}/rating`,
        {
          value: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the scrambleItem state with the new comment and rating
      setScrambleItem((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, commentResponse.data],
        ratings: [...prevState.ratings, ratingResponse.data],
      }));

      setCommentText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting comment or rating', error);
      setErrorMessage('Failed to submit comment and rating.');
    }
  };

  return (
    <div className="scramble-detail">
      <h2>Comments</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='scramble-pull'>
      <p>Original: {scrambleItem?.original}</p>
      <p>Scrambled: {scrambleItem?.scrambled}</p>
      </div>

      {/* Star Rating */}
      <div className="scramble-star-rating">
        <label></label>
        <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />
        {/* <button onClick={handleSubmit}>Submit Comment and Rating</button> */}
      </div>

      <form className='input-button'>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          name="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button className="comment-button" onClick={handleSubmit}>Submit</button>
      </form>

      <div>
      
        <ul className='comment-ul'>
          {scrambleItem?.comments &&
            scrambleItem.comments.map((comment, index) => (
              <li className="comments" key={index}>
               {comment.rating} 
               {comment.text} <br></br> {' '}
                <span className=''>{new Date(comment.createdAt).toLocaleString()}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ScrambleDetail;
