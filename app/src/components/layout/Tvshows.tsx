import React from "react";
import { Tvshows } from "../../types/Tvshow";

interface TVShowsProps {
  tvShows: Tvshows[];
}

const TVShows: React.FC<TVShowsProps> = ({ tvShows }) => {
  return (
    <div className="columns is-multiline is-centered">
      {tvShows.map((tvShow) => (
        <div key={tvShow.vid} className="column is-one-third">
          <div className="card shadow hover-shadow">
            <div className="card-image">
              <img src="https://via.placeholder.com/350x200" alt={tvShow.Title} />
            </div>
            <div className="card-content">
              <h3 className="title is-4">{tvShow.Title}</h3>
              <p>{tvShow.Description}</p>
            </div>
            <footer className="card-footer">
              <span className="card-footer-item">{tvShow.ReleaseYear}</span>
              <span className="card-footer-item">{tvShow.Seasons} Seasons</span>
            </footer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TVShows;