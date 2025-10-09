import React, { useEffect, useState } from "react"; // Import React and hooks for state management and side effects
import tvshowService from "../../services/tvshowsService"; // Import the service for fetching shows data
import { Tvshows } from "../../types/Tvshow"; // Import the type definition for Shows
import { Link } from "react-router-dom"; // Import Link for navigation

export default function Tvshow() {
  // State to hold the list of movies
  const [tvshows, setTvshow] = useState<Tvshows[]>([]);
  
  // State to track if data is loading
  const [isLoading, setIsLoading] = useState(true);

  // State to track the selected movie for the modal
  const [selectedTvshow, setSelectedTvshow] = useState<Tvshows | null>(null);

  // Fetch all movies from the service
  const getTvshow = () => {
    tvshowService
      .getAll()
      .then((response: any) => {
        setTvshow(response.data); // Update state with fetched shows
        setIsLoading(false); // Mark loading as complete
      })
      .catch((e: Error) => {
        console.log(e); // Log errors to console
        alert(e.message); // Alert the user
        setIsLoading(false); // Stop loading even if there's an error
      });
  };

  // Delete a specific movie by ID
  const deleteTvshow = (vid: string) => {
    tvshowService
      .remove(vid)
      .then((response: any) => {
        alert(response.data); // Notify the user of the deletion
        getTvshow(); // Refresh the show list
      })
      .catch((e: Error) => {
        console.log(e); // Log errors
        alert(e.message); // Notify the user
      });
  };

  // Run when the component mounts
  useEffect(() => {
    getTvshow(); // Fetch show data on initial render
  }, []);

  // Open the modal with the selected show details
  const openModal = (tvshow: Tvshows) => {
    setSelectedTvshow(tvshow);
  };

  // Close the modal and clear the selected Show
  const closeModal = () => {
    setSelectedTvshow(null);
  };

  return (
    <div className="container is-fluid">
      {/* Page Header */}
      <section className="section">
        <h1 className="title">Tvshows List</h1>
      </section>

      {/* Grid for movie cards */}
      <div className="columns is-multiline is-centered">
        {isLoading
          ? // Render loading skeletons if data is still loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="column is-one-third">
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
          : // Render the actual movie cards if data has loaded
          tvshows.map((tvshow, index) => (
              <div key={index} className="column is-one-third">
                <div className="card movie-card">
                  {/* Tvshow Poster */}
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src={tvshow.posterURL || "https://via.placeholder.com/350x200"}
                        alt={`${tvshow.Title} Poster`}
                        className="movie-poster"
                        onError={(e) => {
                          // Fallback for broken images
                          e.currentTarget.src = "https://via.placeholder.com/350x200";
                        }}
                      />
                    </figure>
                  </div>

                  {/* Tvshow Title */}
                  <div className="card-header">
                    <h2 className="card-header-title">{tvshow.Title}</h2>
                  </div>

                  {/* Tvshow Details */}
                  <div className="card-content">
                    <p className="content">
                      <strong>ID:</strong> {tvshow.vid}
                    </p>
                    <p className="content">
                      <strong>Description:</strong> {tvshow.Description}
                    </p>
                    <p className="content">
                      <strong>Year:</strong> {tvshow.ReleaseYear}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="card-footer">
                    <button
                      className="button is-rounded is-primary"
                      onClick={() => openModal(tvshow)}
                    >
                      View Show
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Modal for displaying movie details */}
      {selectedTvshow && (
        <div className={`modal ${selectedTvshow ? "is-active" : ""}`}>
          {/* Modal Background */}
          <div className="modal-background" onClick={closeModal}></div>
          
          {/* Modal Card */}
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{selectedTvshow.Title}</p>
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              {/* Modal Details */}
              <p>
                <strong>Description:</strong> {selectedTvshow.Description}
              </p>
              <p>
                <strong>Year:</strong> {selectedTvshow.ReleaseYear}
              </p>
              {/* Play and Download Links */}
              <div className="card-footer">
                <Link
                  className="button is-primary"
                  to={`/movies/${selectedTvshow.vid}`}
                >
                  Play Show
                </Link>
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