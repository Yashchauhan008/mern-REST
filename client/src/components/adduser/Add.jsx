import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:""
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
    .then((responses)=>{
       toast.success(responses.data.msg, {position:"top-center"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <div className='icon'>
        <Link to={"/"}><i class="fa-solid fa-circle-left"></i></Link>
        </div>
        <h3>Add new user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last name</label>
                <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
            </div>  
            <div className="inputGroup">
                <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add