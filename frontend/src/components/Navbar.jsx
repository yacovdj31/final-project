// import { Link } from 'react-router-dom'
// import { useLogout } from '../hooks/useLogout'
// import { useAuthContext } from '../hooks/useAuthContext'

// const Navbar = () => {
//   const { logout } = useLogout()
//   const { user } = useAuthContext()

//   const handleClick = () => {
//     logout()
//   }

//   return (
//     <header>
//       <div className="container">
//         <Link to="/">Home</Link>
//         <Link to="/math">Math Calculator</Link>
//         <Link to="/scramble">Scramble</Link>
//         <nav>
//           {user && (
//             <div>
//               <span>{user.email}</span>
//               <button onClick={handleClick}>Log out</button>
//             </div>
//           )}
//           {!user && (
//             <div>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Navbar




import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link className="homes" to="/">Home</Link>
        <Link className='calculator' to="/math">Calculator</Link>
        <Link className="scramble" to="/scramble">Scramble</Link>
        <Link className="profile" to="/profile">Profile</Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>

              {user.photo && (
                 <img src={`http://localhost:3000/${user.photo}`} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              )}
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
