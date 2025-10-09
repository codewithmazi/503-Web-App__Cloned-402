import http from '../Https'; // Import a custom HTTP client for making API requests.
import { Movies } from '../types/Movie'; // Import the TypeScript type for Movie objects.
import { fetchAuthSession } from 'aws-amplify/auth'; // Import function to fetch authentication session from AWS Amplify.


// Base URL for the API
const API_BASE_URL = "https://s8ux4vvov0.execute-api.us-east-1.amazonaws.com/prod";


/**
 * Fetches the list of movies from the API without requiring authentication.
 * @returns {Promise<any[]>} - The list of movies or an empty array in case of an error.
 */
export async function getCrops() {
  try {
    const response = await fetch(`${API_BASE_URL}/crops`, { method: "GET" }); // Sends GET requests to the movies endpoint.
    if (!response.ok) throw new Error("Failed to fetch movies"); // Checks for HTTP response status.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching movies:", error); // Logs any errors that occur.
    return []; // Returns an empty array in case of an error.
  }
}