import React, { useEffect, useState } from "react";
import movieService from "../../services/moviesService"; // Service for making API calls related to movies.
import { Movies } from "../../types/Movie"; // Type definition for a movie object.
import { Link } from "react-router-dom"; // Link component for navigation.

export default function Movie() {
  // State for storing movies data.
  const [movies, setMovie] = useState<Movies[]>([]);
  // State for handling loading state.
  const [isLoading, setIsLoading] = useState(true);
  // State for tracking the selected movie in a modal.
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  // State to track likes for each movie by their ID.
  const [likes, setLikes] = useState<{ [id: string]: number }>({});

  // Function to fetch movies from the API and handle loading and error states.
  const getMovie = () => {
    movieService
      .getAll()
      .then((response: any) => {
        setMovie(response.data); // Update the movies state with fetched data.
        setIsLoading(false); // Stop the loading indicator.

        // Initialize the likes state for each movie with default value of 0.
        const initialLikes = response.data.reduce((acc: any, movie: Movies) => {
          acc[movie.id] = 0; // Default likes for each movie.
          return acc;
        }, {});
        setLikes(initialLikes); // Set likes state.
      })
      .catch((e: Error) => {
        console.log(e); // Log error for debugging.
        alert(e.message); // Show error message to the user.
        setIsLoading(false); // Stop the loading indicator in case of error.
      });
  };

  // Function to delete a movie based on its ID.
  const deleteMovie = (id: string) => {
    movieService
      .remove(id)
      .then((response: any) => {
        alert(response.data); // Notify the user about the deletion.
        getMovie(); // Refresh the movie list after deletion.
      })
      .catch((e: Error) => {
        console.log(e); // Log error for debugging.
        alert(e.message); // Show error message to the user.
      });
  };

  // useEffect is used to fetch the movies data when the component is mounted.
  useEffect(() => {
    getMovie();
  }, []);

  // Opens the modal for the selected movie.
  const openModal = (movie: Movies) => {
    setSelectedMovie(movie);
  };

  // Closes the modal.
  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Handles the like functionality by incrementing the like count for a specific movie ID.
  const handleLike = (id: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes, // Spread the previous likes state.
      [id]: prevLikes[id] + 1, // Increment like count for the given ID.
    }));
  };

  return (
    <div className="container is-fluid">
      {/* Page Title Section */}
      <section className="section">
        <h1 className="title">Movies List</h1>
      </section>

      {/* Movies List or Skeleton Loader */}
      <div className="columns is-multiline is-centered">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="column is-one-third">
                {/* Skeleton loader while data is being fetched */}
                <div className="card movie-card skeleton">
                  <div className="card-image">
                    <figure className="image is-4by3 loading"></figure>
                  </div>
                  <div className="card-content">
                    <h2 className="title loading">Loading Title...</h2>
                    <p className="content loading">Loading Description...</p>
                    <p className="content loading">Loading Year...</p>
                  </div>
                </div>
              </div>
            ))
          : movies.map((movie, index) => (
              <div key={index} className="column is-one-third">
                {/* Displaying each movie card */}
                <div className="card movie-card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      {/* Movie poster with fallback URL for errors */}
                      <img
                        src={movie.posterURL || "https://via.placeholder.com/350x200"}
                        alt={`${movie.Title} Poster`}
                        className="movie-poster"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/350x200"; // Fallback image URL.
                        }}
                      />
                    </figure>
                  </div>

                  {/* Movie Title */}
                  <div className="card-header">
                    <h2 className="card-header-title">{movie.Title}</h2>
                  </div>

                  {/* Movie Details */}
                  <div className="card-content">
                    <p className="content">
                      <strong>ID:</strong> {movie.id}
                    </p>
                    <p className="content">
                      <strong>Description:</strong> {movie.Description}
                    </p>
                    <p className="content">
                      <strong>Year:</strong> {movie.ReleaseYear}
                    </p>
                  </div>

                  {/* Card Footer with Like and View Buttons */}
                  <div className="card-footer">
                    {/* Like Button */}
                    <button
                      className="button is-rounded is-success"
                      onClick={() => handleLike(movie.id)}
                    >
                      <span className="icon">
                        <i className="fas fa-thumbs-up"></i>
                      </span>
                      <span>{likes[movie.id] || 0}</span>
                    </button>

                    {/* View Movie Button */}
                    <button
                      className="button is-rounded is-primary"
                      onClick={() => openModal(movie)}
                    >
                      View Movie
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Modal for Viewing Movie Details */}
      {selectedMovie && (
        <div className={`modal ${selectedMovie ? "is-active" : ""}`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{selectedMovie.Title}</p>
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              <p>
                <strong>Description:</strong> {selectedMovie.Description}
              </p>
              <p>
                <strong>Year:</strong> {selectedMovie.ReleaseYear}
              </p>
              <div className="card-footer">
                {/* Link to Play the Movie */}
                <Link
                  className="button is-rounded is-primary"
                  to={`/movies/${selectedMovie.id}`}
                >
                  Play Movie
                </Link>
                {/* Download Button */}
                <a className="button is-primary" href="https://yt1d.com/en12/">
                  <span className="icon">
                    <i className="fas fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={closeModal}>
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}