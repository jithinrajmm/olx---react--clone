
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './store/postcontext'
import React, { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/FirebaseContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)


  useEffect(() => {

    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (users) => {
      if (users) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(users)
        setUser(users)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [])


  return (
    <div className="App">

      <Post>


      
     
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/create' element={<Create />}></Route>
          <Route exact path='/viewpost' element={<ViewPost />}></Route>

        </Routes>
        </BrowserRouter>
    </Post>
    </div>
  );
}

export default App;
