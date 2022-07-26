import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase);

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        console.log('logedin')
        // ...
      }).then(() => {
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode)
        alert(errorMessage)
      });

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/OLX_Logo.jpg/922px-OLX_Logo.jpg'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={event => (setEmail(event.target.value))}
            name="email"
            defaultValue="j@gmail.com"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={event => (setPassword(event.target.value))}
            name="password"
            defaultValue="123456789"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>(navigate('/signup'))}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
