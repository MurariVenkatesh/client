import React from 'react';

function NewsletterSignup() {
  return (
    <section className="newsletter-signup">
      <h2>Stay Updated</h2>
      <p>Subscribe to our newsletter for the latest updates and tips.</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}

export default NewsletterSignup;
