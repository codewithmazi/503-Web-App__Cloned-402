import React, { useState } from "react"; // Import React and the `useState` hook for managing local state.
import axios from "axios"; // Import Axios for making HTTP requests.

const Search: React.FC = () => {
  // State for the user's search query (text input).
  const [query, setQuery] = useState<string>("");

  // State to store the search results returned from the API.
  const [results, setResults] = useState<any[]>([]);

  // State to manage the loading status during the API call.
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Function to handle the search operation.
   * Makes an API call with the current search query and updates the state with the results.
   */
  const handleSearch = async () => {
    if (!query) return; // If the query is empty, exit early.

    setLoading(true); // Set loading state to `true` to indicate that the search is in progress.

    try {
      // Perform a GET request to the search API with the query parameter.
      const response = await axios.get(
        `https://lnn0qzho3m.execute-api.us-east-1.amazonaws.com/search?query=${query}`
      );

      // Update the `results` state with the data from the API response.
      setResults(response.data.results);
    } catch (error) {
      // Log any error encountered during the API call to the console.
      console.error("Search error:", error);
    } finally {
      // Reset the loading state to `false` regardless of success or failure.
      setLoading(false);
    }
  };

  return (
    <div className="container my-6">
      {/* Input field for the search query */}
      <div className="field">
        <div className="control">
          <input
            type="text" // Input type is text.
            className="input" // Bulma class for styling the input field.
            placeholder="Search Movies and TV Shows..." // Placeholder text for user guidance.
            value={query} // Bind the value of the input field to the `query` state.
            onChange={(e) => setQuery(e.target.value)} // Update the `query` state when the input changes.
          />
        </div>
      </div>

      {/* Button to trigger the search */}
      <button
        className="button is-primary" // Bulma class for styling the button.
        onClick={handleSearch} // Call `handleSearch` when the button is clicked.
        disabled={loading} // Disable the button if `loading` is true.
      >
        {loading ? "Searching..." : "Search"} {/* Show "Searching..." when loading, otherwise "Search". */}
      </button>

      {/* Container to display the search results */}
      <div className="results">
        {results.map((item, index) => (
          // Map through the results and render each item.
          <div key={index} className="box"> {/* Use a unique key for each item in the list. */}
            <h3 className="title is-4">{item.Title}</h3> {/* Display the title of the movie/TV show. */}
            <p>{item.Description}</p> {/* Display the description. */}
            <p>
              <strong>Type:</strong> {item.Type} {/* Display the type (e.g., Movie or TV Show). */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;