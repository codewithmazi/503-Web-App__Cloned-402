import React, { useEffect, useState } from "react"; // Importing React and hooks for state management and lifecycle effects.
import { useParams } from "react-router-dom"; // Importing `useParams` for extracting route parameters.
import { getTvshowById } from "../../services/tvshowsService"; // Importing a service function to fetch a movie by its ID.
import { Tvshows } from "../../types/Tvshow"; // Importing the Movie type definition for TypeScript type safety.

const TvshowDetail: React.FC = () => {
  // Extract the `id` parameter from the URL using `useParams`.
  const { vid } = useParams<{ vid: string }>();

  // State to hold the movie data; initialized to `null` until data is fetched.
  const [tvshow, setTvshow] = useState<Tvshows | null>(null);

  // Fetch movie data when the component is mounted or when the `id` changes.
  useEffect(() => {
    const fetchTvshow = async () => {
      const tvshowData = await getTvshowById(vid!); // `id!` asserts that `id` is not null or undefined.
      setTvshow(tvshowData); // Update the `movie` state with the fetched movie data.
    };
    fetchTvshow(); // Call the function to fetch movie data.
  }, [vid]); // Dependency array ensures this runs whenever `id` changes.

  // If the movie data has not yet been loaded, display a loading message.
  if (!tvshow) return <p className="loading">Loading...</p>;

  return (
    <div className="movie-detail-container">
      {/* Header section to display the movie's title, release year, and description */}
      <div className="movie-detail-header">
        <h1 className="movie-title">{tvshow.Title}</h1>
        <p className="movie-year">
          <strong>Year:</strong> {tvshow.ReleaseYear}
        </p>
        <p className="movie-description">{tvshow.Description}</p>
      </div>

      {/* Display YouTube video if the movie has a `videoURL` */}
      {tvshow.videoURL ? (
        <div className="movie-video">
          {/* Embedding YouTube video using an iframe */}
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(tvshow.videoURL)}`}
            title={tvshow.Title} // Use the movie title as the iframe title for accessibility
            frameBorder="0" // No border for the iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen // Enable fullscreen playback
          ></iframe>
        </div>
      ) : (
        // If no video URL is available, display a placeholder message
        <p className="no-video">No video available for this show.</p>
      )}
    </div>
  );
};

// Utility function to extract the YouTube video ID from a URL.
const getYouTubeVideoId = (url: string): string => {
  // Regular expression to match YouTube video ID patterns from different URL formats
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&=?\s]+)/
  );
  return match ? match[1] : ""; // Return the video ID if matched, otherwise return an empty string.
};

export default TvshowDetail; // Export the component as the default export.