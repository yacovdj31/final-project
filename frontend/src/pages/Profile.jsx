


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const ProfilePage = () => {
//   const [mathItems, setMathItems] = useState([]);
//   const [scrambleItems, setScrambleItems] = useState([]);

//   useEffect(() => {
//     const fetchMathItems = async () => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const token = user ? user.token : null;

//       if (!token) {
//         console.error("You must be logged in to view this page.");
//         return;
//       }

//       try {
//         const response = await axios.get('/api/math/user-math', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMathItems(response.data);
//       } catch (error) {
//         console.error('Error fetching math items:', error);
//       }
//     };

//     const fetchScrambleItems = async () => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const token = user ? user.token : null;

//       if (!token) {
//         console.error("You must be logged in to view this page.");
//         return;
//       }

//       try {
//         const response = await axios.get('/api/scramble/user-scramble', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setScrambleItems(response.data);
//       } catch (error) {
//         console.error('Error fetching scrambled items:', error);
//       }
//     };

//     fetchMathItems();
//     fetchScrambleItems();
//   }, []);

 
//   return (
//     <div className='profile-page'>
//       <h2>Your Math Items</h2>
//       <ul>
//         {mathItems.map(item => (
//           <Link to={`/math/${item._id}`} className="link"> {/* Apply the "link" class */}
//             <li className='profile-items' key={item._id}>
//               {item.num1} {item.operation} {item.num2} = {item.result}
//             </li>
//           </Link>
//         ))}
//       </ul>

//       <h2>Your Scrambled Items</h2>
//       <ul>
//         {scrambleItems.map(item => (
//           <Link to={`/scramble/${item._id}`} className="link"> {/* Apply the "link" class */}
//             <li className="profile-items" key={item._id}>
//               {item.original}
//               <br />
//               {item.scrambled}
//             </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProfilePage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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

  const totalItems = mathItems.length + scrambleItems.length; // Calculate total items

  return (
    <div className='profile-page'>
      <h2>({totalItems})</h2> {/* Display total count */}
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

