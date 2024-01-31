// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { useAuthContext } from './hooks/useAuthContext'

// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Navbar from './components/Navbar'
// import MathPage from './pages/MathPage'
// import ScramblePage from './pages/ScramblePage'

// function App() {
//   const { user } = useAuthContext()

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <div className="pages">
//           <Routes>
//             <Route
//               path="/"
//               element={user ? <Home /> : <Navigate to="/login" />}
//             />
//             <Route
//               path="/login"
//               element={!user ? <Login /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/signup"
//               element={!user ? <Signup /> : <Navigate to="/" />}
//             />
//               <Route
//               path="/math"
//               element={!user ? <MathPage /> : <Navigate to="/" />}
//             />
//                <Route
//               path="/scramble"
//               element={!user ? <ScramblePage /> : <Navigate to="/" />}
//             />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// // export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthContext } from "./hooks/useAuthContext";
// import { MathContextProvider } from "./context/MathContext";
// import { ScrambleContextProvider } from "./context/ScrambleContext";

// // Pages and Components
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Navbar from "./components/Navbar";
// import MathPage from "./pages/MathPage";
// import ScramblePage from "./pages/ScramblePage";

// function App() {
//   const { user } = useAuthContext();

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <MathContextProvider>
//           <ScrambleContextProvider>
//             <div className="pages">
//               <Routes>
//                 <Route
//                   path="/"
//                   element={user ? <Home /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                   path="/login"
//                   element={!user ? <Login /> : <Navigate to="/" />}
//                 />
//                 <Route
//                   path="/signup"
//                   element={!user ? <Signup /> : <Navigate to="/" />}
//                 />
//                 <Route
//                   path="/math"
//                   element={!user ? <MathPage /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                   path="/scramble"
//                   element={!user ? <ScramblePage /> : <Navigate to="/" />}
//                 />
//               </Routes>
//             </div>
//           </ScrambleContextProvider>
//         </MathContextProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import MathPage from "./pages/MathPage";
import ScramblePage from "./pages/ScramblePage";
import MathDetail from "./pages/MathDetail";
import ScrambleDetail from "./pages/Scrambledetail";
import Profile from "./pages/Profile";


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/math" element={user ? <MathPage /> : <Navigate to="/login" />} />
            <Route path="/scramble" element={user ? <ScramblePage /> : <Navigate to="/login" />} />
            <Route path="/math/:id" element={<MathDetail />} />
            <Route path="/scramble/:id" element={<ScrambleDetail />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
