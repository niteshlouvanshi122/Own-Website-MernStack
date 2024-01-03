import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const URL = "http://localhost:3000/api/auth/login"
import { useAuth } from '../Store/auth'

const Login = () => {

  const [user, setUser] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const {storeTokenInLS} = useAuth()

  const handelInput = (e) => {
    let name = e.target.name;
    let value = e.target.value

    setUser({
      ... user,
      [name] : value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try {
      
      const response = await fetch( URL, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
      })
      const res_data = await response.json()
      // console.log("LOGiN FORM", response);

      if(response.ok){
        // alert("Login Successful..)")
        // console.log("server side data",res_data.Token);
        storeTokenInLS(res_data.Token)
        setUser({ email: "", password: "" }),
        toast.success("Login Successful")
        navigate("/")
      }else{
        toast.error(res_data.message)
      }

    } catch (error) {
      console.log("Login Form", error);
    }
  }

  return (
    <>
      <main>
        <section>

        {/* <div className="container grid grid-two-cols">
        <div className="registration-image reg-img">
          <img src="/Images/login.png" alt="user login form" width="400" height="500" />
        </div>
        <div className="registration-form">
            <h1 className="main-heading mb-3">Login Form</h1>
            <br />
        <form onSubmit={handelLogin}>
          <div>
            <label htmlFor="email">email</label>
            <input 
              type="email" 
              id='email' 
              name='email' 
              placeholder='Please enter your email' 
              required 
              value={user.email}
              onChange={handelInput}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input 
              type="password" 
              id='password' 
              name='password' 
              placeholder='Please enter your password' 
              required 
              value={user.password}
              onChange={handelInput}
            />
          </div>
          <br />
            <button type='submit' className="btn btn-submit">Login</button>
        </form>
        </div>
        </div> */}

        <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/Images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handelInput}
                      placeholder="email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handelInput}
                      placeholder="password"
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
