import './Login.css'
import { linearGradientDef } from '@nivo/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import React,{ useState,useContext } from 'react'
import { auth } from '../../firebase';
import {AuthContext} from '../../apis/AuthContext'

const Login = () => {
 const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user})
      navigate("/user")
    })
    .catch((error) => {
      setError(true)
    });
  }
  return (
    <div className='m'>
        <div className="login-box" style={{background:linearGradientDef("#141e30", "#243b55")}}>
        <h2>Login</h2>
        <form>
        <div className="user-box">
            <input type="text" name="" required="" onChange={(e) => setEmail(e.target.value)}/>
            <label>Email</label>
        </div>
        <div className="user-box">
            <input type="password" name="" required="" onChange={(e) => setPassword(e.target.value)}/>
            <label>Password</label>
        </div>
        <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
        </form>
    </div>
  </div>
  )
}

export default Login