import React, { useContext } from 'react'
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { MdAddShoppingCart } from "react-icons/md";
import {Link} from 'react-router-dom'

import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';



function Header() {
  const [{basket},dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount 
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* logo section*/}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
              />
            </Link>
            <div className={classes.delivery}>
              {/* delivery */}
              <span>
                <SlLocationPin size={15}/>
              </span>
              <div>
                <p>Delivered to </p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <IoIosSearch />
          </div>
          <div className={classes.order_container}>
            {/* right side link */}
            <Link to="" className={classes.language}>
              <img
                src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to="/auth">
              <div>
                <p>SignIn</p>
                <span>Account & Lists</span>
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders" >
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <MdAddShoppingCart />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </section>
  );
}

export default Header