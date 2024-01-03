import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const URL = "http://localhost:3000/api/auth/registaion"
import { useAuth } from '../Store/auth'
import { toast } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate()
  const {storeTokenInLS} = useAuth()

  // const handelSubmit = (e) => {
  //   // console.log(e);
  //   let name = e.target.name
  //   let value = e.target.value
  //   setUser({
  //     ... user,
  //     [name] : value
  //   })
  // }

  // const handelForm = (e) => {
  //   e.preventDefault();
  //   alert("Registration Successful...)")
  //   console.log(user);
  // }

  // return (
  //   <>
  //     <section>
  //       <main>
  //         <div className="section-registration">
  //           <div className="container grid grid-two-cols">
  //             <div className="registration-image reg-img">
  //               <img src="/Images/register.png" alt="fill the form a girl" width="500" height="500" />
  //             </div>
  //             <div className="registration-form">

  //               <h1 className="main-heading mb-3">Registration Form</h1>
  //               <br />

  //               <form onSubmit={handelForm}>
  //                 <div>
  //                   <label htmlFor="username">username</label>
  //                   <input 
  //                     type="text" 
  //                     name='username' 
  //                     id='username' 
  //                     placeholder='Please enter your name' 
  //                     required 
  //                     // autoComplete='off'
  //                     value={user.username}
  //                     onChange={handelSubmit}
  //                   />
  //                 </div>
  //                 <div>
  //                   <label htmlFor="username">email</label>
  //                   <input 
  //                     type="text" 
  //                     name='email' 
  //                     id='email' 
  //                     placeholder='Please enter your email' 
  //                     required 
  //                     // autoComplete='off'
  //                     value={user.email}
  //                     onChange={handelSubmit}
  //                   />
  //                 </div>
  //                 <div>
  //                   <label htmlFor="username">phone</label>
  //                   <input 
  //                     type="number" 
  //                     name='phone' 
  //                     id='phone' 
  //                     placeholder='Please enter your phone' 
  //                     required 
  //                     // autoComplete='off'
  //                     value={user.phone}
  //                     onChange={handelSubmit}
  //                   />
  //                 </div>
  //                 <div>
  //                   <label htmlFor="username">password</label>
  //                   <input 
  //                     type="password" 
  //                     name='password' 
  //                     id='password' 
  //                     placeholder='Please enter your password' 
  //                     required 
  //                     // autoComplete='off'
  //                     value={user.password}
  //                     onChange={handelSubmit} 
  //                   />
  //                 </div>

  //                 <br />
  //                 <button type='submit' className="btn btn-submit">Register Now</button>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </main>
  //     </section>
  //   </>
  // )
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
      })

      const res_data = await response.json()
      console.log("server side data",res_data.message);

      // console.log(response);

      if(response.ok){
        // alert("Registration Successful..)")
        storeTokenInLS(res_data.Token)
        setUser({username: "",email: "",phone: "",password: "",}),
        toast.success("Registration Successful")
        navigate("/")
      }else{
        toast.error(res_data.message)
      }
    } catch (error) {
        console.log("Register ", error);
    }
    
  };

  return (
    <>
      <main>
        <section>
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
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className='div1'>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div className='div1'>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div className='div1'>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div className='div1'>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
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
  );
}

export default Register
