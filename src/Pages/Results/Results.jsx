import React, { useEffect, useState } from 'react'
// import classes from './Results.modules.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css'
import Loader from '../../Components/Loader/Loader';

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();
  // console.log(categoryName);
  useEffect(() => {

 axios
   .get(`${productUrl}/products/category/${categoryName}`)
   .then((res) => {
     // console.log(res);
     setIsLoading(false)
     setResults(res.data);
     //console.log(res.data);
     
   })
   .catch((err) => {
     console.log(err);
     setIsLoading(false)
   });

  }, []);

   return (
     <LayOut>
       <section>
         <h1 style={{ pading: "30px" }}>Results</h1>
         <p style={{ padding: "30px" }}>Category / {categoryName}</p>
         <hr/>
         { isLoading ? (
          <Loader/>
         ) : (  
         

         <div className= {classes.products_container}>
           {results?.map((product) => (
             <ProductCard 
             
              key={product.id} 
              product={product}
              renderDesc={false} 
              renderAdd={true}
              />
           ))}
         </div>
         )}
       </section>
     </LayOut>
   );
}

export default Results