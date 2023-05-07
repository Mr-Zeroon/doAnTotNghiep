import './Login.css'
import { linearGradientDef } from '@nivo/core'
import { useNavigate } from 'react-router-dom'
import React,{ useState } from 'react'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const [user,setUser] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const fetchPost = async () => {  
    await getDocs(collection(db, "/users"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setUser(newData);
        }) 
      }
  useEffect(()=>{
    fetchPost();
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    if(user.find(u=>u.email===email&& u.passWord===password&&u.typeUser==="ADMIN"))
    {
      const admin = user.filter(u=>u.email===email)
      navigate('/')
      localStorage.setItem("admin",JSON.stringify(admin));
    }
    else if(user.find(u=>u.email===email&& u.passWord===password&&u.typeUser!=="ADMIN")){
      toast.error("You are not authorized to enter this website")
    }
    else {
      toast.error("Email or password is incorrect")
    }

  }
  return (
    <div className='m'>
        <div className="login-box" style={{background:linearGradientDef("#141e30", "#243b55")}}>
        <h2>Login</h2>
        <form onClick={handleLogin}>
        <div className="user-box">
            <input type="text" name="" required="Please enter your email" onChange={(e) => setEmail(e.target.value)}/>
            <label>Email</label>
        </div>
        <div className="user-box">
            <input type="password" name="" required="Please enter your password" onChange={(e) => setPassword(e.target.value)}/>
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