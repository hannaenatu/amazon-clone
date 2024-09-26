import React, { useContext, useEffect } from "react";
import Header from "./Components/Header/Header";
import Routing from "./Routing";
import Category from "./Components/Category/Category";
import CarouselEffect from "./Components/Carousel/Carousel";
import Product from "./Components/Product/Product";

import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";

// import './App.css'

function App() {

  const [{user}, dispatch] = useContext(DataContext)

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {

      if (authUser) {

        dispatch({

          type: Type.SET_USER,
          user: authUser,
        });
      }else {
         dispatch({
           type: Type.SET_USER,
           user: null,
         });

      }
    });


  }, [])
  return (
    <div>
      <Routing />
      {/* <Header />
      <CarouselEffect />
      <Category />
      <Product /> */}
    </div>
  );
}

export default App;
