import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Type } from "../../Utility/action.type";

function Cart() {
   const [{ basket, user }, dispatch] = useContext(DataContext);
   //console.log(basket);
   const total = basket.reduce((amount, item) => {
      // Calculate the total price
      return item.price * item.amount + amount;
   }, 0);
   // console.log(basket);

   const increment = (item) => {
      // Increment the quantity of an item
      dispatch({
         type: Type.ADD_TO_BASKET,
         item
      });
   };

   const decrement = (id) => {
      // Decrement the quantity of an item

      dispatch({
         type: Type.REMOVE_FROM_BASKET,
         id
      });
   };

   return (
      <LayOut>
         <div className={classes.container}>
            <div className={classes.cart_container}>
               <h2>Hello</h2>
               <h3>Your Shopping Basket</h3>
               <hr />
               {basket?.length === 0 ? (
                  <p>Opps ! Your cart is empty</p>
               ) : (
                  basket?.map((item, id) => {
                     //console.log(item);

                     return (
                        <section key={item.id} className={classes.cart_product}>
                           <ProductCard
                              product={item}
                              renderDesc={true}
                              renderAdd={false}
                              flex={true}
                           />
                           <div className={classes.btn_container}>
                              <button
                                 className={classes.btn}
                                 onClick={() => increment(item)}
                              >
                                 <IoIosArrowUp size={18} />
                              </button>
                              <span>{item.amount}</span>
                              <button
                                 className={classes.btn}
                                 onClick={() => decrement(item.id)}
                              >
                                 <IoIosArrowDown size={18} />
                              </button>
                           </div>
                        </section>
                     );
                  })
               )}
            </div>

            {basket?.length !== 0 && (
               <div className={classes.subtotal}>
                  <div>
                     <p>Subtotal ({basket?.length} items)</p>
                     <CurrencyFormat amount={total} />
                  </div>
                  <span>
                     <input type="checkbox" />
                     <small>This order contains a gift</small>
                  </span>

                  <Link to="/payments">Continue to Checkout</Link>
               </div>
            )}
            <section />
         </div>
      </LayOut>
   );
}

export default Cart;




//************************************************************************************************************** */

// import React from "react";
// import LayOut from "../../Components/LayOut/LayOut";
// import { useContext } from "react";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import { Link } from "react-router-dom";
// import classes from "./Cart.module.css";
// import {Type} from '../../Utility/action.type'
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";


// function Cart() {
//   const [{ basket, user }, dispatch] = useContext(DataContext);
//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const increment =(item)=>{
//     dispatch({
//       type:Type.ADD_TO_BASKET,
//       item
//     })
//   }
//   const decrement =(id)=>{
//     dispatch({
//       type:Type.REMOVE_FROM_BASKET,
//       id
//     })
//   }

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.cart_container}>
//           <h2>Hello</h2>
//           <h3>Your shopping basket </h3>
//           <hr />
//           {basket?.length == 0 ? (
//             <p>Opps ! No item in your cart</p>
//           ) : (
//             basket?.map((item, i) => {
//               return (
//                 <section className={classes.Cart_product}>
//                   <ProductCard
//                     key={i}
//                     product={item}
//                     renderDesc={true}
//                     renderAdd={false}
//                     flex={true}
//                   />
//                   <div className={classes.btn_container}>
//                     <button
//                       className={classes.btn_container}
//                       onClick={() => increment(item)}
//                     >
//                       <IoIosArrowUp size={20} />
//                     </button>
//                     <span>{item.amount}</span>
//                     <button
//                       className={classes.btn}
//                       onClick={() => decrement(item.id)}
//                     >
//                       <IoIosArrowDown size={20} />
                      
//                     </button>
//                   </div>
//                 </section>
//               );
//             })
//           )}
//         </div>

//         {basket?.length !== 0 && (
//           <div className={classes.subtotal}>
//             <div>
//               <p>Subtotal ({basket?.length} items)</p>
//               <CurrencyFormat amount={total} />
//             </div>
//             <span>
//               <input type="checkbox" />
//               <small>This order containt a gift</small>
//             </span>
//             <Link to="/payments">Continue to checkout</Link>
//           </div>
//         )}
//       </section>
//     </LayOut>
//   );
// }

// export default Cart;
