import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

// function  component from handling the payment process
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext); // Get setBasket from DataContext

  // Calculate total number of items and total price
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  ); // calculating the total price of items in the basket

  const [cardError, setCardError] = useState(null);

  const [processing, setProcessing] = useState(false); // Disable button during payment

  const stripe = useStripe(); // stripe hook to access stripe function 
  const elements = useElements();// stripe hook to access the card input elements
  const navigate = useNavigate();// hook for navigation

  

  const handleChange = (e) => {
    setCardError(e?.error?.message || ""); // Set card error if it exists
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // if (!stripe || !elements) return;
    
    if (basket.length === 0) {
      setCardError("Your basket is empty.")// Ig the basket is empty, show an error
    }

    
    try {
      setProcessing(true); // Disable button while processing

      // Make a request to the backend to create a payment intent with stripe
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // total in cents
      });

      const clientSecret = response.data.clientSecret;
      

      // Confirm payment on the client side
      //2. client side (react side confirmation) using stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement), // get the card details from the  carElement
          },
        }
      );

      //  if (error) {
      //     setCardError(error.message);
      //     setProcessing(false);
      //  } else if (paymentIntent.status === "succeeded") {
      //     console.log("Payment successful");
      //     console.log(paymentIntent);
      //     clearBasket(); // Clear basket after payment

      //     //Save the order to Firestore after payment confirmation
      //     // Further actions: Save order to Firestore, etc.
      //     //3. after the confirmation -----> order firestore db to save the order, then clear the basket, once order is saved on the db, no more needed in the basket at this point
      //     await setDoc(
      //        doc(
      //           collection(db, "users"),
      //           user.uid,
      //           "orders",
      //           paymentIntent.id
      //        ),
      //        {
      //           basket: basket,
      //           amount: paymentIntent.amount,
      //           created: paymentIntent.created,
      //        }
      //     );

      /// store the der in firebase firestroe
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empty the baseket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);

      navigate("/orders", {state: {msg: "you have placed a new order"}});
        } catch (error) {
      console.error("Payment error:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout {totalItem} items</div>

      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Washington, D.C</div>
          </div>
        </div>
        <hr />

        {/* Products */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>

          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              {/* Client-side payment functionality */}
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}> {cardError} </small>
                )}

                {/* Card Element */}
                <CardElement onChange={handleChange} />

                {/* Total price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
