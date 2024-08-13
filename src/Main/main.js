import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './main.css'; // Main CSS file for global styling

function Main() {
  return (
        <div className="App">
          <Navbar />
          <main className="main-content">
            <section className="blog">
              <h1>Blog</h1>
              <p>Content for blog...</p>
            </section>
            <section className="videos">
              <h1>Videos</h1>
              <p>Content for videos...</p>
            </section>
          </main>
          <Footer />
        </div>
      );
}

export default Main;
