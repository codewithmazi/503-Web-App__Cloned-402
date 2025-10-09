import React, { useEffect, useState } from "react"; // Import React for building components and hooks for managing state and lifecycle.
import movieService from "../../services/moviesService"; // Import the movie service for interacting with backend APIs.
import { Movies } from "../../types/Movie"; // Import the `Movies` type definition for TypeScript, ensuring type safety.
import { Link } from "react-router-dom"; // Import `Link` for client-side routing/navigation.

export default function Movie() {
  // State to hold the list of movies fetched from the API
  const [movies, setMovies] = useState<Movies[]>([]);

  // State to hold the details of the movie being edited or added
  const [movieUpdate, setMovieupdate] = useState<Movies>({
    id: "", // Default empty ID for a new movie
    Title: "", // Default empty title
    Description: "", // Default empty description
    ReleaseYear: 0, // Default release year set to 0
    posterURL: "", // Default empty poster URL
  });

  /**
   * Updates the `movieUpdate` state when an input field changes.
   * Dynamically updates the specific property of the movie being edited or added.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieupdate({
      ...movieUpdate, // Retain the current movie details
      [event.target.name]: event.target.value, // Update the property being edited
    });
  };

  /**
   * Fetches all movies from the backend API.
   * On success, updates the `movies` state with the retrieved data.
   */
  const getItems = () => {
    movieService
      .getAll() // Call the `getAll` method from the movie service
      .then((response: any) => {
        setMovies(response.data); // Update the `movies` state with the fetched data
        console.log(movies); // Log the movies for debugging
      })
      .catch((e: Error) => {
        console.error(e); // Log any error encountered during the API call
        alert(e.message); // Display an alert with the error message
      });
  };

  /**
   * Deletes a movie by its ID.
   * On success, fetches the updated list of movies.
   */
  const deleteItems = (id: string) => {
    movieService
      .remove(id) // Call the `remove` method from the movie service with the movie ID
      .then((response: any) => {
        alert(response.data); // Notify the user about successful deletion
        getItems(); // Refresh the movie list after deletion
      })
      .catch((e: Error) => {
        console.error(e); // Log any error encountered
        alert(e.message); // Display an alert with the error message
      });
  };

  /**
   * Populates the `movieUpdate` state with the selected movie's details for editing.
   */
  const updateMovie = (inItem: Movies) => {
    setMovieupdate(inItem); // Set the selected movie data in `movieUpdate`
  };

  /**
   * Saves or updates a movie.
   * If a new movie is being added, or an existing movie is being updated, it calls the `put` method in the service.
   */
  const saveItem = () => {
    const item = { ...movieUpdate }; // Copy the current state of the movie being edited/added
    movieService
      .put(item) // Call the `put` method from the movie service
      .then((response: any) => {
        alert(response.data); // Notify the user about the successful save or update
        getItems(); // Refresh the movie list
      })
      .catch((e: Error) => {
        console.error(e); // Log any error encountered
        alert(e.message); // Display an alert with the error message
      });
  };

  /**
   * Resets the form fields to their initial state, clearing any pre-filled data.
   */
  const resetform = () => {
    setMovieupdate({
      id: "", // Reset ID to an empty string
      Title: "", // Reset title
      Description: "", // Reset description
      ReleaseYear: 0, // Reset release year to 0
      posterURL: "", // Reset poster URL
    });
  };

  /**
   * Hook to fetch movies when the component is first mounted.
   * The empty dependency array ensures this effect runs only once.
   */
  useEffect(() => {
    getItems(); // Fetch the initial list of movies
  }, []);

  return (
    <div className="container is-fluid">
      {/* Section heading */}
      <section className="section">
        <h1 className="title">Movie Catalogue</h1>
      </section>

      {/* Display the list of movies in a responsive grid */}
      <div className="columns is-multiline">
        {movies.map((movie, index) => (
          <div className="column" key={index}>
            <div className="card">
              {/* Movie title in the card header */}
              <div className="card=header">
                <h2 className="card-header-title">{movie.Title}</h2>
              </div>
              {/* Movie details in the card content */}
              <div className="card-content">
                <p className="content">{movie.id}</p>
                <p className="content">Description: {movie.Description}</p>
                <p className="content">Year: {movie.ReleaseYear}</p>
              </div>
              {/* Action buttons in the card footer */}
              <div className="card-footer">
                <Link
                  className="button is-rounded is-success"
                  to={`/items/${movie.id}`}
                >
                  View Movie
                </Link>
                <button
                  className="button is-rounded is-danger"
                  onClick={() => deleteItems(movie.id)} // Trigger delete on click
                >
                  Delete Movie
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form for adding or updating a movie */}
      <section className="section">
        <h2 className="subtitle">Add or Update Movie</h2>
        <form>
          <div className="card">
            <div className="card-content">
              {/* Form fields for movie details */}
              <p>Movie ID</p>
              <input
                className="input"
                type="text"
                name="id"
                value={movieUpdate.id}
                onChange={handleChange} // Update state on input change
              />
              <p>Movie Title</p>
              <input
                className="input"
                type="text"
                name="Title"
                value={movieUpdate.Title}
                onChange={handleChange}
              />
              <p>Movie Description</p>
              <input
                className="input"
                type="text"
                name="Description"
                value={movieUpdate.Description}
                onChange={handleChange}
              />
              <p>Movie Year</p>
              <input
                className="input"
                type="text"
                name="ReleaseYear"
                value={movieUpdate.ReleaseYear}
                onChange={handleChange}
              />
              <p>Movie Poster</p>
              <input
                className="input"
                type="text"
                name="posterURL"
                value={movieUpdate.posterURL}
                onChange={handleChange}
              />
              {/* Buttons for form actions */}
              <button
                className="button is-rounded is-danger"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  saveItem(); // Save the movie
                }}
              >
                Add or Update Item
              </button>
              <button
                className="button is-rounded is-success"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  resetform(); // Reset the form
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}