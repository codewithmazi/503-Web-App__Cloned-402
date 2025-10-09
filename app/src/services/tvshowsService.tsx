// Import a custom HTTP client for making API requests.
import http from '../Https';

// Import the TypeScript type for TV shows.
import { Tvshows } from '../types/Tvshow';

// Import function to fetch authentication session from AWS Amplify.
import { fetchAuthSession } from 'aws-amplify/auth';

// Base URL for the API to interact with TV shows.
const API_BASE_URL = "https://v4mqw4wyt0.execute-api.us-east-1.amazonaws.com";

/**
 * Fetches all TV shows from the API without requiring authentication.
 * @returns {Promise<any[]>} - A list of TV shows or an empty array in case of an error.
 */
export async function getTvshows() {
  try {
    const response = await fetch(`${API_BASE_URL}/tvshows`, { method: "GET" }); // Makes a GET request to the TV shows endpoint.
    if (!response.ok) throw new Error("Failed to fetch shows"); // Throws an error if the response status is not OK.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching shows:", error); // Logs any errors that occur.
    return []; // Returns an empty array in case of an error.
  }
}

/**
 * Fetches a single TV show by its ID without requiring authentication.
 * @param {string} vid - The ID of the TV show to fetch.
 * @returns {Promise<any>} - The TV show data or null in case of an error.
 */
export async function getTvshowById(vid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tvshows/${vid}`, { method: "GET" }); // Makes a GET request for a specific TV show.
    if (!response.ok) throw new Error("Failed to fetch show"); // Throws an error if the response status is not OK.
    return await response.json(); // Parses and returns the JSON response.
  } catch (error) {
    console.error("Error fetching show:", error); // Logs any errors that occur.
    return null; // Returns null in case of an error.
  }
}

/**
 * Fetches all TV shows using the custom HTTP client with authentication.
 * @returns {Promise<Array<Tvshows>> | undefined} - A list of TV shows or undefined in case of an error.
 */
const getAll = async () => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Array<Tvshows>>("/tvshows", {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Fetches a single TV show by its ID using the custom HTTP client with authentication.
 * @param {string} vid - The ID of the TV show to fetch.
 * @returns {Promise<Tvshows> | undefined} - The TV show data or undefined in case of an error.
 */
const get = async (vid: string) => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.get<Tvshows>(`/tvshows/${vid}`, {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Deletes a TV show by its ID using the custom HTTP client with authentication.
 * @param {string} vid - The ID of the TV show to delete.
 * @returns {Promise<void> | undefined} - The deletion result or undefined in case of an error.
 */
const remove = async (vid: string) => {
  try {
    // Fetches authentication tokens from AWS Amplify.
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return http.delete<Tvshows>(`/Tvshows/${vid}`, {
      headers: {
        Authorization: idToken?.toString(), // Attaches the ID token as the Authorization header.
      },
    });
  } catch (err) {
    console.log(err); // Logs any errors that occur.
  }
};

/**
 * Adds or updates a TV show using the PUT method with authentication.
 * @param {Tvshows} data - The TV show data to save.
 * @returns {Promise<Response>} - The API response object.
 */
const put = async (data: Tvshows) => {
  // Fetches authentication tokens from AWS Amplify.
  const { idToken } = (await fetchAuthSession()).tokens ?? {};
  const response = await window.fetch(`${API_BASE_URL}/tvshows`, {
    method: 'PUT', // Specifies the HTTP method as PUT.
    headers: {
      Authorization: idToken!.toString(), // Attaches the ID token as the Authorization header.
    },
    body: JSON.stringify(data), // Sends the TV show data as a JSON string in the request body.
  });
  return response; // Returns the raw response object.
};


// An object encapsulating all TV show-related service functions.

const tvshowService = {
  getTvshowById, // Expose the `getTvshowById` function.
  getTvshows,    // Expose the `getTvshows` function.
  get,           // Expose the `get` function.
  getAll,        // Expose the `getAll` function.
  remove,        // Expose the `remove` function.
  put,           // Expose the `put` function.
};

export default tvshowService; // Exports the TV show service for use in other parts of the application.