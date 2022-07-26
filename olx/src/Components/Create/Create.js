import React, { Fragment, useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';


const Create = () => {

  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const storage = getStorage(firebase);
  const db = getFirestore(firebase);
  // for the navigation
  const navigate = useNavigate();
  const date = new Date()
  // handle submit strat here
  const handleSubmit = () => {
    const mountainImagesRef = ref(storage, `images/${image.name}`);
    // upload task start here
    const uploadTask = uploadBytes(mountainImagesRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      // getting the url start here
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);

        // for saving the data to products collection
          try {
            const docRef = addDoc(collection(db, "products"), {
              name: name,
              category: category,
              price: price,
              url: downloadURL,
              userId: user.uid,
              createdAt:date.toDateString(),
          });
          } catch (e) {
          alert("Error adding document: ",e);
        }//upload data to product end here
        
         // download url end here
      }).then(() => {
              navigate('/');
            })
    }); //uploadTask end here
  }
  // handle submit end here
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(event)=>setName(event.target.value)}
              type="text"
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange = {event=>setCategory(event.target.value)}
              id="fname"
              name="category"
              
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" value={price} onChange={(event)=> setPrice(event.target.value)} name="Price" />
            <br />
       
          <br />
          {image &&  <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img> }
         
      
            <br />
            <input onChange={(event)=>{setImage(event.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
