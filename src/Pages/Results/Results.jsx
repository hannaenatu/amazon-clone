import React, { useEffect, useState } from 'react'
// import classes from './Results.modules.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css'

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  // console.log(categoryName);
  useEffect(() => {

 axios
   .get(`${productUrl}/products/category/${categoryName}`)
   .then((res) => {
     // console.log(res);
     setResults(res.data);
     //console.log(res.data);
     
   })
   .catch((err) => {
     console.log(err);
   });

  }, []);

   return (
     <LayOut>
       <section>
         <h1 style={{ pading: "30px" }}>Results</h1>
         <p style={{ padding: "30px" }}>Category / {categoryName}</p>

         <div className= {classes.products_container}>
           {results?.map((product) => (
             <ProductCard 
             
              key={product.id} 
              product={product} 
              />
           ))}
         </div>
       </section>
     </LayOut>
   );
}

export default Results