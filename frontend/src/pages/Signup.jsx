// import { useState } from "react"
// import { useSignup } from "../hooks/useSignup"

// const Signup = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const {signup, error, isLoading} = useSignup()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     await signup(email, password)
//   }

//   return (
//     <form className="signup" onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>
      
//       <label>Email address:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//       />
//       <label>Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//       />

//       <button disabled={isLoading}>Sign up</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )
// }

// export default Signup



import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [photo, setPhoto] = useState(null); 
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
    
      return;
    }

    if (!photo) {
      
      return;
    }

    await signup(email, password, photo);
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
        <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmPassword} 
      />
      <label>Photo:</label>
      <input 
        type="file" 
        onChange={(e) => setPhoto(e.target.files[0])} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup