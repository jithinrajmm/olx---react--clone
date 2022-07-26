import React, { useState, useEffect, useContext } from 'react';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

import './Post.css';
import { Postss } from '../../store/postcontext';
import { useNavigate } from 'react-router-dom';


function Posts() {

  const [product, setProduct] = useState([])
  const navigate = useNavigate()
  const {setSinglepost} = useContext(Postss)
  const { firebase } = useContext(FirebaseContext)
  const db = getFirestore(firebase)

  useEffect(() => {
    getdata();
},[])

  const getdata = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProduct(querySnapshot.docs.map(product =>{
      console.log(product)
      return {...product.data(), id:product.id}}))
        }



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards"
>
          {product.map((product,index) => {
            return <div className="card" key={index} onClick={() => {
                      setSinglepost(product)
                      navigate('/viewpost')
              
                                    }} >
                        <div className="favorite">
                          <Heart></Heart>
                        </div>
                        
                        <div className="image">
                          <img src={product.url} alt="" />
                        </div>
                        
                        <div className="content">
                            <p className="rate">&#x20B9; {product.price}</p>
                            <span className="kilometer">{product.category}</span>
                            <p className="name"> {product.name}</p>
                        </div>
                        
                        <div className="date">
                            <span>{product.createdAt}</span>
                        </div>
                   </div>
          })}
        
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

       
        <div className="cards" >
        {product && product.map((product, index) => 
               
            <div className="card" key={index}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
                <p className="rate">&#x20B9;{ product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{ product.name}</p>
            </div>
            <div className="date">
                <span>{product.createdAt}</span>
            </div>
          </div>
        
       
          )}
           </div>
      </div>
    </div>
  );
}

export default Posts;
