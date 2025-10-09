import React, { useEffect, useState } from "react"; // Import React and hooks for state and lifecycle management.
import tvshowService from "../../services/tvshowsService"; // Import the TV show service to handle API calls.
import { Tvshows } from "../../types/Tvshow"; // Import the TypeScript type definition for TV shows.
import { Link } from "react-router-dom"; // Import the `Link` component for navigation.

export default function Tvshow() {
    // State for storing the list of TV shows fetched from the backend.
    const [tvshows, setTvshows] = useState<Tvshows[]>([]);

    // State for storing the current TV show being updated or added.
    const [tvshowUpdate, setTvshowupdate] = useState<Tvshows>({
        vid: "",           // Unique ID of the TV show.
        Title: "",         // Title of the TV show.
        Genre: "",         // Genre of the TV show.
        Description: "",   // Description of the TV show.
        Seasons: 0,        // Number of seasons the TV show has.
        ReleaseYear: 0,    // Year of release.
        posterURL: "",     // URL for the poster image.
        videoURL: ""       // URL for the video (trailer or episode).
    });

    /**
     * Handler for updating the `tvshowUpdate` state when an input field is modified.
     * @param event - The event triggered by the input change.
     */
    const handleChange = (event: any) => {
        // Update the corresponding property in the state.
        setTvshowupdate({ ...tvshowUpdate, [event.target.name]: event.target.value });
    };

    /**
     * Fetches the list of TV shows from the backend.
     */
    const getItems = () => {
        tvshowService.getAll() // Call the service method to fetch all TV shows.
            .then((response: any) => {
                setTvshows(response.data); // Update the state with fetched data.
                console.log(tvshows); // Log the state for debugging purposes.
            })
            .catch((e: Error) => {
                console.log(e); // Log the error.
                alert(e.message); // Display an alert with the error message.
            });
    };

    /**
     * Deletes a TV show by its ID.
     * @param vid - The ID of the TV show to delete.
     */
    const deleteItems = (vid: string) => {
        tvshowService.remove(vid) // Call the service method to delete the TV show.
            .then((response: any) => {
                alert(response.data); // Notify the user of successful deletion.
                getItems(); // Refresh the list of TV shows.
            })
            .catch((e: Error) => {
                console.log(e); // Log the error.
                alert(e.message); // Display an alert with the error message.
            });
    };

    /**
     * Populates the form fields with the selected TV show for updating.
     * @param inItem - The TV show to be updated.
     */
    const updateTvshow = (inItem: Tvshows) => {
        setTvshowupdate(inItem); // Update the state with the selected TV show's details.
    };

    /**
     * Saves a new TV show or updates an existing one.
     */
    const saveItem = () => {
        const item = { ...tvshowUpdate }; // Create a copy of the current state.
        tvshowService.put(item) // Call the service method to save or update the TV show.
            .then((response: any) => {
                alert(response.data); // Notify the user of success.
                getItems(); // Refresh the list of TV shows.
            })
            .catch((e: Error) => {
                console.log(e); // Log the error.
                alert(e.message); // Display an alert with the error message.
            });
    };

    /**
     * Resets the form to its initial state.
     */
    const resetform = () => {
        setTvshowupdate({
            vid: "",
            Title: "",
            Genre: "",
            Description: "",
            Seasons: 0,
            ReleaseYear: 0,
            posterURL: "",
            videoURL: ""
        });
    };

    // Fetch the TV shows when the component is mounted.
    useEffect(() => {
        getItems();
    }, []); // Empty dependency array ensures this runs only once on mount.

    return (
        <div className="container is-fluid">
            {/* Header Section */}
            <section className="section">
                <h1 className="title">Shows Catalogue</h1>
            </section>

            {/* Grid of TV Show Cards */}
            <div className="columns is-multiline">
                {tvshows.map((tvshow, index) => (
                    <div className="column" key={index}> {/* Unique key for each card */}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-header-title">{tvshow.Title}</h2>
                            </div>
                            <div className="card-content">
                                <p className="content">ID: {tvshow.vid}</p>
                                <p className="content">Description: {tvshow.Description}</p>
                                <p className="content">Seasons: {tvshow.Seasons}</p>
                                <p className="content">Genre: {tvshow.Genre}</p>
                                <p className="content">Year: {tvshow.ReleaseYear}</p>
                            </div>
                            <div className="card-footer">
                                <Link className="button is-rounded is-info" to={`/items/${tvshow.vid}`}>
                                    View Show
                                </Link>
                                <button className="button is-rounded is-danger" onClick={() => deleteItems(tvshow.vid)}>
                                    Delete Show
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Section for Adding/Updating TV Shows */}
            <section className="section">
                <h2 className="subtitle">Add or Update Show</h2>
                <form>
                    <div className="card">
                        <div className="card-content">
                            {/* Input fields for TV show details */}
                            <p>Show ID</p>
                            <input className="input" type="text" name="vid" value={tvshowUpdate.vid} onChange={handleChange} />
                            <p>Show Title</p>
                            <input className="input" type="text" name="Title" value={tvshowUpdate.Title} onChange={handleChange} />
                            <p>Show Genre</p>
                            <input className="input" type="text" name="Genre" value={tvshowUpdate.Genre} onChange={handleChange} />
                            <p>Show Description</p>
                            <input className="input" type="text" name="Description" value={tvshowUpdate.Description} onChange={handleChange} />
                            <p>Seasons</p>
                            <input className="input" type="number" name="Seasons" value={tvshowUpdate.Seasons} onChange={handleChange} />
                            <p>Year</p>
                            <input className="input" type="number" name="ReleaseYear" value={tvshowUpdate.ReleaseYear} onChange={handleChange} />
                            <p>Show Poster</p>
                            <input className="input" type="text" name="posterURL" value={tvshowUpdate.posterURL} onChange={handleChange} />
                            {/* Buttons to save or reset the form */}
                            <button
                                className="button is-rounded is-success"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent form submission.
                                    saveItem();
                                }}
                            >
                                Add or Update Show
                            </button>
                            <button
                                className="button is-rounded is-danger"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent form submission.
                                    resetform();
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