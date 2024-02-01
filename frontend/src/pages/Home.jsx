

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [mathItems, setMathItems] = useState([]);
  const [scrambleItems, setScrambleItems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(''); 

  useEffect(() => {
    const fetchMathItems = async () => {
      try {
        const response = await axios.get('/api/math/public');
        setMathItems(response.data);
      } catch (error) {
        console.error('Error fetching math items', error);
      }
    };

    const fetchScrambleItems = async () => {
      try {
        const response = await axios.get('/api/scramble/public');
        setScrambleItems(response.data);
      } catch (error) {
        console.error('Error fetching scramble items', error);
      }
    };

    fetchMathItems();
    fetchScrambleItems();
  }, [selectedDifficulty]);

  

  const handleMathInputChange = (index, value) => {
    const updatedMathItems = [...mathItems];
    updatedMathItems[index].userAnswer = value;

    if (value === '') {
      updatedMathItems[index].isCorrect = undefined;
    } else {
      const correctAnswer = parseFloat(updatedMathItems[index].result);
      updatedMathItems[index].isCorrect = value === correctAnswer.toString();
    }

    setMathItems(updatedMathItems);
  };

  const handleScrambleInputChange = (index, value) => {
    const updatedScrambleItems = [...scrambleItems];
    updatedScrambleItems[index].userAnswer = value;

    if (value === '') {
      updatedScrambleItems[index].isCorrect = undefined;
    } else {
      updatedScrambleItems[index].isCorrect = value === updatedScrambleItems[index].original;
    }

    setScrambleItems(updatedScrambleItems);
  };

  const submitRating = async (itemId, rating) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;

      if (!token) {
        console.error("You must be logged in to submit a rating.");
        return;
      }

      await axios.post(
        `/api/math/${itemId}/rating`,
        { value: rating },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

     
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  const getDifficultyLevel = (averageRating) => {
    if (averageRating < 3) return 'Easy';
    else if (averageRating >= 3 && averageRating < 7) return 'Medium';
    else return 'Hard';
  };

  const filterItems = (items, difficulty) => {
    return items.filter(item => {
      const difficultyLevel = getDifficultyLevel(parseFloat(item.averageRating));
      return difficulty === '' || difficultyLevel === difficulty;
    });
  };

  
  const handleToggleStatus = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;
  
      if (!token) {
        console.error("You must be logged in to toggle status.");
        return;
      }
  
      const response = await axios.patch(
        `/api/math/toggleStatus/${itemId}`,
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
     
      console.log("Toggle response:", response.data);
    } catch (error) {
      console.error("Error toggling status", error);
    }
  };

  
  const handleToggleStatusScramble = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;
  
      if (!token) {
        console.error("You must be logged in to toggle status.");
        return;
      }
  
      const response = await axios.patch(
        `/api/scramble/toggleStatus/${itemId}`,
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
     
      console.log("Toggle response:", response.data);
    } catch (error) {
      console.error("Error toggling status", error);
    }
  };

  


  return (
    <div>
     <div className='difficulty-buttons'>

  <button className="all" onClick={() => setSelectedDifficulty('')}>All</button>
  <button className="easy" onClick={() => setSelectedDifficulty('Easy')}>Easy</button>
  <button className="medium" onClick={() => setSelectedDifficulty('Medium')}>Medium</button>
  <button className="hard" onClick={() => setSelectedDifficulty('Hard')}>Hard</button>
</div>

      <ul className='home-ul'>
        {filterItems(mathItems, selectedDifficulty).map((item, index) => {
        
          return (
            <li className='home-questions'
              key={item._id}
              style={{
                backgroundColor:
                  item.userAnswer === ''
                    ? ''
                    : item.isCorrect === true
                    ? 'lightgreen'
                    : item.isCorrect === false
                    ? 'red'
                    : '',
                cursor: 'pointer',
              }}
          
            >
              <p className='difficulty'>{getDifficultyLevel(parseFloat(item.averageRating))}</p>
              <p>{item.num1} {item.operation} {item.num2}</p>
              <input className='home-input'
                type="text"
                value={item.userAnswer || ''}
                onChange={(e) => handleMathInputChange(index, e.target.value)}
                placeholder="Your Answer"
                onClick={(e) => e.stopPropagation()}
              />
              {item.isCorrect === true && (
                <button className="comment-button" onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStatus(item._id);
                  }}
                >
                  {item.userStatus ? 'Add' : 'Remove'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <ul className='home-ul'>
        {filterItems(scrambleItems, selectedDifficulty).map((item, index) => {
          return (
            <li className='home-questions'
              key={item._id}
              style={{
                backgroundColor:
                  item.userAnswer === ''
                    ? ''
                    : item.isCorrect === true
                    ? 'lightgreen'
                    : item.isCorrect === false
                    ? 'red'
                    : '',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.location.href = `/scramble/${item._id}`;
              }}
            >
              <p className='difficulty'> {getDifficultyLevel(parseFloat(item.averageRating))}</p>
              <p>{item.scrambled}</p>
              <input className='home-input'
                type="text"
                value={item.userAnswer || ''}
                onChange={(e) => handleScrambleInputChange(index, e.target.value)}
                placeholder="Your Answer"
                onClick={(e) => e.stopPropagation()}
              />
               {item.isCorrect === true && (
                <button className='comment-button' onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStatusScramble(item._id);
                  }}
                >
                  {item.userStatus ? 'Add' : 'Remove'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

