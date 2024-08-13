import React from 'react';

function CommunityHighlights() {
  return (
    <section className="community-highlights">
      <h2>Community Highlights</h2>
      <div className="highlight-grid">
        {/* Example highlight */}
        <div className="highlight-card">
          <img src="https://via.placeholder.com/150" alt="Community Highlight" />
          <h3>User Story Title</h3>
          <p>Brief highlight of the story...</p>
        </div>
        {/* More highlights... */}
      </div>
    </section>
  );
}

export default CommunityHighlights;
