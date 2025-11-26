import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';

const EditMemory: React.FC = () => {
    return (
        <div className="App">
            <div className="edit-memory">
                <h1>Edit Memory Page</h1>
                <p>This is where you can edit your memories.</p>

                <form action="/editMemory" method="POST">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" />
                    <button type="submit">Save Changes</button>
                </form>
                <Link to="/collage">Back to Memories</Link>
            </div>
        </div>
    )
}

export default EditMemory;