import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';

function ProductDetail() {
  const {ProductId} = useParams ()
  const [product, setproduct] = useState(second)
  // console.log(ProductId);
  useEffect(()=>{
    axios.get(`${productUrl}/products/${ProductId}`)
    .then(()=>{
      useState
    })
    first

    return () => {
      second
    }
  },[third])

  return (
    <LayOut>
      <div>ProductDetail</div>
    </LayOut>
  );
}

export default ProductDetail