// src/Home.js

import React from 'react';
import Header from './header';
import HeroSection from './herosection';
import FeaturedContent from './featurecontent';
import Categories from './categories';
import CommunityHighlights from './cummunityhighlight';
import NewsletterSignup from './newsletter';
import Footer from './footer';
import './home.css';

function Home() {
  const handleSportsClick = () => {
    // Add functionality for Sports button
    console.log('Sports button clicked');
  };

  const handleYogaClick = () => {
    // Add functionality for Yoga button
    console.log('Yoga button clicked');
  };

  const handleTravelsClick = () => {
    // Add functionality for Travels button
    console.log('Travels button clicked');
  };

  return (
    <div className="App">
      <Header />
      <video autoplay loop muted>
    <source src='C:/Users/apjmu/OneDrive/Desktop/Blogspace/client/public/intro.mp4' type='video/mp4'/>
    Your browser does not support the video tag.
    </video>

      {/* <HeroSection />
      <main className="content">
        <h1>Welcome to AdventureBlog</h1>
        <div className="button-group">
          <button onClick={handleSportsClick}>Sports</button>
          <button onClick={handleYogaClick}>Yoga</button>
          <button onClick={handleTravelsClick}>Travels</button>
        </div>
      </main> */}
      <FeaturedContent />
      <Categories />
      <CommunityHighlights />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default Home;
