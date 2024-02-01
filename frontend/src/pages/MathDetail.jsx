


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating"; // Import the StarRating component

const MathDetail = () => {
  const { id } = useParams();
  const [mathItem, setMathItem] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMathItem = async () => {
      try {
        const response = await axios.get(`/api/math/public/${id}`);
        setMathItem(response.data);
      } catch (error) {
        console.error("Error fetching math item", error);
        setErrorMessage("Failed to load math item details.");
      }
    };

    fetchMathItem();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setErrorMessage("You must be logged in to comment.");
      return;
    }

    try {
      // Submit the comment
      const commentResponse = await axios.post(
        `/api/math/${id}/comment`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the mathItem state with the new comment
      setMathItem((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, commentResponse.data],
      }));
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment", error);
      setErrorMessage("Failed to submit comment.");
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setErrorMessage("You must be logged in to rate.");
      return;
    }

    try {
      // Submit the rating
      const ratingResponse = await axios.post(
        `/api/math/${id}/rating`,
        {
          value: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the mathItem state with the new rating
      setMathItem((prevState) => ({
        ...prevState,
        ratings: [...prevState.ratings, ratingResponse.data],
      }));
      setRating(0);
    } catch (error) {
      console.error("Error submitting rating", error);
      setErrorMessage("Failed to submit rating.");
    }
  };

  return (
    <div className="math-detail">
      <h2>Comments</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {mathItem ? (
        <>
          <div className="scramble-pull">
            <p>
              {mathItem.num1} {mathItem.operation} {mathItem.num2} = {mathItem.result}
            </p>
          </div>

          <div>
            <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />
          </div>

          <form className="input-button">
            <label htmlFor="comment"></label>
            <textarea
              id="comment"
              name="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button className="comment-button" onClick={handleCommentSubmit}>Submit</button>
          </form>

          <div>
           
            <ul className="comment-ul">
              {mathItem.comments &&
                mathItem.comments.map((comment, index) => (
                  <li className="comments" key={index}>
                   {comment.text} <br></br>{new Date(comment.createdAt).toLocaleString()}
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MathDetail;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import StarRating from "../components/StarRating"; // Import the StarRating component

// const DEFAULT_PHOTO_URL = "path/to/default/user/photo.jpg"; // Placeholder path

// const MathDetail = () => {
//   const { id } = useParams();
//   const [mathItem, setMathItem] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchMathItem = async () => {
//       try {
//         const response = await axios.get(`/api/math/public/${id}`);
//         setMathItem(response.data);
//       } catch (error) {
//         console.error("Error fetching math item", error);
//         setErrorMessage("Failed to load math item details.");
//       }
//     };

//     fetchMathItem();
//   }, [id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     // Comment submission logic...
//   };

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();
//     // Rating submission logic...
//   };

//   return (
//     <div className="math-detail">
//       <h2>Math Item Details</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {mathItem ? (
//         <>
//           <div className="detail-item">
//             <p>
//               {mathItem.num1} {mathItem.operation} {mathItem.num2} = {mathItem.result}
//             </p>
//           </div>

//           <div>
//             <label>Your Rating:</label>
//             <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />
//             <button onClick={handleRatingSubmit}>Submit Rating</button>
//           </div>

//           <form>
//             <label htmlFor="comment">Comment:</label>
//             <textarea
//               id="comment"
//               name="comment"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             ></textarea>
//             <button onClick={handleCommentSubmit}>Submit Comment</button>
//           </form>

//           <div className="comments">
//             <h3>Comments:</h3>
//             <ul>
//               {mathItem.comments.map((comment, index) => (
//                 <li key={index}>
//                   <img
//                     src={comment.user.photoUrl || DEFAULT_PHOTO_URL}
//                     alt="User"
//                     style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
//                   />
//                   {comment.text} - {new Date(comment.createdAt).toLocaleString()}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default MathDetail;
