import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';
// import Loader from './'

function ProductDetail() {
  const {productId} = useParams ()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setproduct] = useState({})
  // console.log(ProductId);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setroduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isLoading? (<Loader/>) : (
        <ProductCard
         product={product} 
         flex={true} 
         renderDesc={true}
         renderAdd={true} />
      )}
    </LayOut>
  );
}

export default ProductDetail