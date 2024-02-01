import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const ProfilePage = () => {
  const [mathItems, setMathItems] = useState([]);
  const [scrambleItems, setScrambleItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      if (!token) {
        console.error("You must be logged in to view this page.");
        return;
      }

      try {
        const mathResponse = await axios.get('/api/math/user-math', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMathItems(mathResponse.data);

        const scrambleResponse = await axios.get('/api/scramble/user-scramble', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScrambleItems(scrambleResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const totalItems = mathItems.length + scrambleItems.length; 

  return (
    <div className='profile-page'>
      <h2>({totalItems})</h2> 
      <h3>Math </h3>
      <ul>
        {mathItems.map(item => (
          <Link to={`/math/${item._id}`} key={item._id} className="link">
            <li className='profile-items-math'>
              {item.num1} {item.operation} {item.num2} 
              <br></br>= 
              <br></br>{item.result}
            </li>
          </Link>
        ))}
      </ul>

      <h3>Scrambled</h3>
      <ul>
        {scrambleItems.map(item => (
          <Link to={`/scramble/${item._id}`} key={item._id} className="link">
            <li className="profile-items">
              {item.original} - {item.scrambled}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;

