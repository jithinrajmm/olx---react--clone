import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import './Signup.css';
import { collection, addDoc,getFirestore } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';




export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const { firebase }  = useContext(FirebaseContext)
  const handlesubmit = (event) => {
    event.preventDefault();

    const auth = getAuth(firebase);
    const db = getFirestore(firebase);

    createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: username
      }).then(() => {
        console.log('name updated')
      }).catch((error) => {
        console.log(error)
      });

    try {
      const docRef = addDoc(collection(db, "users"), {
      id: userCredential.user.uid,
      username: username,
      phone: phone,
    });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }).then(() => {
    navigate('/login');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage)
   

  });
    
  

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/OLX_Logo.jpg/922px-OLX_Logo.jpg'></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange = {(event)=>setEmail(event.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange = {(event)=>setPhone(event.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
