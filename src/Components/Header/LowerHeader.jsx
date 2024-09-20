import React from 'react'
import { IoMdMenu } from "react-icons/io";
import classes from './Header.module.css';

function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoMdMenu />
          <p>All</p>
        </li>
        <li>Same-Day Delivery</li>
        <li>Medical Care</li>
        <li>Keep Shooping for</li>
        <li>Prime Video</li>
        <li>Today's Deals</li>
        <li>Best Sellers</li>
        <li>Toy and Games</li>
        <li>Groceries</li>
        <li>Prime</li>
        <li>Buy Again</li>
        <li>Shop By Interest</li>
        <li>House Hold, Health & Baby Care</li>
        <li>Livestreams</li>
        <li>Subscribe & Save</li>
      </ul>
    </div>
  );
}

export default LowerHeader