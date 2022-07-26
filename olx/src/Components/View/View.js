import React,{useContext,useState,useEffect} from 'react';
import { Postss } from '../../store/postcontext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, doc, getFirestore, query, where, getDocs } from "firebase/firestore";

import './View.css';
import { getMetadata } from 'firebase/storage';
import { async } from '@firebase/util';
function View() {
  const [userDetails, setuserDetails] = useState();
  const { singlePost } = useContext(Postss);
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase)
  useEffect(() => {
    
    getData();
  })
  
  const getData = async ()=> {

    let id = singlePost.userId
    const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));
    querySnapshot.forEach((doc) => {
       setuserDetails(doc.data());
    });
  }
  
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={singlePost.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{singlePost.price}</p>
          <span>{singlePost.name}</span>
          <p>{singlePost.category}</p>
          <span>{singlePost.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          
          <p>{userDetails && userDetails.username}</p>
          <p>{userDetails && userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
