import http from '../Https'; // Import a custom HTTP client for making API requests.
import { Movies } from '../types/Movie'; // Import the TypeScript type for Movie objects.
import { fetchAuthSession } from 'aws-amplify/auth'; // Import function to fetch authentication session from AWS Amplify.

// Base URL for the API
const API_BASE_URL = "https://s8ux4vvov0.execute-api.us-east-1.amazonaws.com/prod";

/**
 * Fetches the list of movies from the API without requiring authentication.
 * @returns {Promise<any[]>} - The list of movies or an empty array in case of an error.
 */
export async function getMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`, { method: "GET" }); // Sends GET requests to the movies endpoint.
    if (!response.ok) throw new Error("Failed to fetch movies"); // Checks for HTTP response status.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching movies:", error); // Logs any errors that occur.
    return []; // Returns an empty array in case of an error.
  }
}

/**
 * Fetches a specific movie by  its ID from the API without requiring authentication.
 * @param {string} id - The ID of the movie to fetch.
 * @returns {Promise<any>} - The movie data or null in case of an error.
 */
export async function getMovieById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, { method: "GET" }); // Sends GET request to the specific movie endpoint.
    if (!response.ok) throw new Error("Failed to fetch movie"); // Checks for HTTP response status.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching movie:", error); // Logs any errors that occur.
    return null; // Returns null in case of an error.
  }
}

/**
 * Fetches all movies using the custom HTTP client with authentication.
 * @returns {Promise<Array<Movies>> | undefined} - The list of movies or undefined in case of an error.
 */
const getAll = async () => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Array<Movies>>("/movies", {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Fetches a single movie by its ID using the custom HTTP client with authentication.
 * @param {string} id - The ID of the movie to fetch.
 * @returns {Promise<Movies> | undefined} - The movie data or undefined in case of an error.
 */
const get = async (id: string) => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Movies>(`/movies/${id}`, {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Deletes a movie by its ID using the custom HTTP client with authentication.
 * @param {string} id - The ID of the movie to delete.
 * @returns {Promise<void> | undefined} - The deletion result or undefined in case of an error.
 */
const remove = async (id: string) => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.delete<Movies>(`/movies/${id}`, {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Updates or adds a new movie using the PUT method with authentication.
 * @param {Movies} data - The movie data to save.
 * @returns {Promise<Response>} - The API response object.
 */
const put = async (data: Movies) => {
  // Fetches authentication tokens from AWS Amplify.
  const { idToken } = (await fetchAuthSession()).tokens ?? {};
  const response = await window.fetch(`${API_BASE_URL}/movies`, {
    method: 'PUT', // Specifies the HTTP method as PUT.
    headers: {
      Authorization: idToken!.toString(), // Attaches the ID token as the Authorization header.
    },
    body: JSON.stringify(data), // Sends the movie data as a JSON string in the request body.
  });
  return response; // Returns the raw response object.
};


 // An object encapsulating all movie-related service functions.
const movieService = {
  getMovieById, // Publicly expose `getMovieById` function.
  getMovies,    // Publicly expose `getMovies` function.
  get,          // Publicly expose `get` function.
  getAll,       // Publicly expose `getAll` function.
  remove,       // Publicly expose `remove` function.
  put,          // Publicly expose `put` function.
};

export default movieService; // Exports the movie service for use in other parts of the application.