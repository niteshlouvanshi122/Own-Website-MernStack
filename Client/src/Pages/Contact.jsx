import React, { useState } from 'react'
// import { useAuth } from '../Store/auth';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {

  // const {client} = useAuth();
  // console.log(client.email);

  const [contact, setContact] = useState(defaultContactFormData)

  // const [userData, setUserData] = useState(true)
  // console.log(userData);

  // if (userData && client){
  //   setContact({
  //     username: client.username,
  //     email: client.email,
  //     message: "",
  //   })
  //   setUserData(false);
  // }

  const handelInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // setContact({
    //   ...contact,
    //   [name]:value,
    // })
    setContact((prev) => ({ ...prev, [name]: value }));
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    // alert("Message successful send..")
    // console.log(contact);

      try {

        const response = await fetch("http://localhost:3000/api/form/contact",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(contact)
        })

        if( response.ok ){
          setContact(defaultContactFormData);
          const responseData = await response.json()
          alert(responseData);
          console.log(responseData);
        }else{
          alert("Message successfully Send");
        }

      } catch (error) {
        console.log("FrontEnd Error ",error);
      }

  }

  return (
    <>
      <section className='section-contact'>
        <div className="contact-content container">
          <h1 className='main-heading'>Contact us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img src="/Images/support.png" alt="contact from please drop a msg" width="400" height="500"/>
          </div>

          <section className='section-form'>
            <form onSubmit={handelSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input type="text" name='username' value={Contact.username} onChange={handelInput} id='username' required  />
              </div>
              <div>
                <label htmlFor="username">email</label>
                <input type="email" name='email' value={Contact.email} onChange={handelInput} id='email' required  />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea name="message" value={Contact.message} onChange={handelInput} id="message" cols="30" rows="5" required ></textarea>
              </div>
              <div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </section>
        </div>
        <section className="mb-3">
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.69288447066!2d75.78144818081795!3d22.72395163729518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1702870515885!5m2!1sen!2sin" 
                  width="100%" 
                  height="220"  
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
              </iframe>
          </section>
      </section>
    </>
  )
}

export default Contact
