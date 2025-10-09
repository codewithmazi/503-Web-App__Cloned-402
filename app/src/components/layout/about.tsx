import React from "react";

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-6">
          <div className="card shadow">
            <div className="card-content">
              <h2 className="title is-3 has-text-primary">About Media Stream</h2>
              <p className="is-size-5">
                Media Stream is the ultimate platform to explore your favorite movies, manage your collection, and discover new titles. 
                With an intuitive interface and powerful features, Media Stream makes browsing and tracking movies a fun experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;