import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home-background">

      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 has-text-white">
            Welcome to Media Stream
          </h1>
          <p className="subtitle is-size-4 has-text-white">
            Discover, manage, and enjoy your favourite movies and TV shows like never before.
          </p>
          <a
            href="/movies"
            className="button is-info is-large is-rounded is-shadowless"
          >
            Explore Movies
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;