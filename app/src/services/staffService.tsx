import http from '../Https'; // Import a custom HTTP client for making API requests.
import { Staff } from '../../src/types/Staff'; // Import the TypeScript type for Movie objects.
import { fetchAuthSession } from 'aws-amplify/auth'; // Import function to fetch authentication session from AWS Amplify.


// Base URL for the API
const API_BASE_URL = "https://s8ux4vvov0.execute-api.us-east-1.amazonaws.com/prod";


/**
 * Fetches the list of movies from the API without requiring authentication.
 * @returns {Promise<any[]>} - The list of movies or an empty array in case of an error.
 */
export async function getStaff() {
  try {
    const response = await fetch(`${API_BASE_URL}/staff`, { method: "GET" }); // Sends GET requests to the movies endpoint.
    if (!response.ok) throw new Error("Failed to fetch cropss"); // Checks for HTTP response status.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching crops:", error); // Logs any errors that occur.
    return []; // Returns an empty array in case of an error.
  }
}

/**
 * Fetches a specific movie by  its ID from the API without requiring authentication.
 * @param {string} staff_id - The ID of the movie to fetch.
 * @returns {Promise<any>} - The movie data or null in case of an error.
 */
export async function getCropById(staff_id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/${staff_id}`, { method: "GET" }); // Sends GET request to the specific movie endpoint.
    if (!response.ok) throw new Error("Failed to fetch movie"); // Checks for HTTP response status.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching movie:", error); // Logs any errors that occur.
    return null; // Returns null in case of an error.
  }
}

/**
 * Fetches all movies using the custom HTTP client with authentication.
 * @returns {Promise<Array<Crops>> | undefined} - The list of movies or undefined in case of an error.
 */
const getAll = async () => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Array<Staff>>("/staff", {
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
 * @param {string} staff_id - The ID of the movie to fetch.
 * @returns {Promise<Movies> | undefined} - The movie data or undefined in case of an error.
 */
const get = async (staff_id: string) => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Staff>(`/staff/${staff_id}`, {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};



const staffService = {
 // getCropById, // Publicly expose `getMovieById` function.
  getStaff,    // Publicly expose `getMovies` function.
  get,          // Publicly expose `get` function.
  getAll,       // Publicly expose `getAll` function.
 // remove,       // Publicly expose `remove` function.
 // put,          // Publicly expose `put` function.
};


export default staffService;