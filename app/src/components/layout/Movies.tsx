import React from "react";
import { Movie } from "../../types/Movie";

interface MoviesProps {
  movies: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <div className="columns is-multiline is-centered">
      {movies.map((movie) => (
        <div key={movie.id} className="column is-one-third">
          <div className="card shadow hover-shadow">
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src={movie.posterURL}
                  alt={movie.Title}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/350x200"; // Fallback for broken links
                  }}
                />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-4">{movie.Title}</h3>
              <p>{movie.Description}</p>
            </div>
            <footer className="card-footer">
              <span className="card-footer-item">{movie.ReleaseYear}</span>
            </footer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;