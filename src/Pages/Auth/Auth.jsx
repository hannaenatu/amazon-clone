import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })




  const [{ user }, dispatch] = useContext(DataContext)
  console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name)
    if (e.target.name == "signin") {
      //firebase auth
      setLoading({...loading, signIn:true})

      console.log(password, email);
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,
             
          })
           serLoading({...loading, signIn:false})
        })
        .catch((err) => {
          setError(err.message)
           serLoading({ ...loading, signIn: f });
        });
    } else {
       setLoading({ ...loading, signIn: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
           serLoading({ ...loading, signUp: true });
          // console.log(userInfo);
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,
          });
           serLoading({ ...loading, signIn: false });
        })
        .catch((err) => {
         setError(err.message);
          serLoading({ ...loading, signIn: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      {/* form */}

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            ></input>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="Password"
            ></input>
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >{
            loading.signIn ? ( <ClipLoader color="#000" size={15}></ClipLoader>
            ) :(
              "Sign In"
            )
          }
            {/* Sign In{" "} */}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* creat account btn */}
        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          Create your Amazon Account
        </button>
      {error && <small style={{paddingTop:"5px", color:"red"}}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
