import React from 'react';
import Posts from '../component/post/Posts';
import './Home.css';

const Home = () => (

<div class="area" >
<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>



    
      <div className="jumbotron header">
        <h3>Hello Ironhacker</h3>  
        <p>Welcome to your network</p>
      </div>
      <div className="container">
        <Posts />
      </div>
    
            </div>
    
  );
  
  export default Home;