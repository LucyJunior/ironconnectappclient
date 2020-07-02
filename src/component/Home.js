import React from 'react';
import Posts from '../component/post/Posts';

const Home = () => (
    <div>
      <div className="jumbotron">
        <h2>Home</h2>
        <h3>Hello Ironhacker</h3>  
        <p>Welcome to IronConnect</p>
      </div>
      <div className="container">
        <Posts />
      </div>
    </div>
  );
  
  export default Home;