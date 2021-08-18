import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import './Home.css'
import '../../index.css'
import ListBookScroll from "../ListBookScroll/ListBookScroll";
import FeaturedBook from "../FeaturedBook/FeaturedBook";

export default function Home(props) {
  return (
    <div class="container" style={{marginTop: 50}}>
      <div id="head-title">
        <Button onClick={()=>{window.location.href = '/shop'}} color="secondary">View All</Button>{' '}
      </div>
      <ListBookScroll />
      <FeaturedBook />
    </div>
  )
}
