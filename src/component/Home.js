import React from 'react';
import Posts from '../component/post/Posts';
import './Home.css';

const Home = () => (

<div class="area" >
<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>



    
      <div className="jumbotron header ">
        <h3 className>Hello Ironhacker</h3>  
        <h4>Share | Connect | Repeat </h4>
      </div>
      <div className="container">
        <Posts />
      </div>
    
            </div>
    
  );
  
  export default Home;