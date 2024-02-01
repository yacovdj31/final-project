import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const maxRating = 10; 
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const starClass = i <= rating ? "star-filled" : "star-empty";

    stars.push(
      <span
        key={i}
        className={`star ${starClass}`}
        onClick={() => onRatingChange(i)}
      >
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
