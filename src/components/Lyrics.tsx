import React from "react"
import { Link } from "react-router-dom";

const Lyrics: React.FC = () => {
    return (
        <div className="lyrics-container">
            <div className="lyrics">
                <h1>Lyrics</h1>
                <p>I'll never fall again</p>
                <p>I've fallen for you and Ill</p>
                <p>Drown in your eyes</p>
                <p>Till you're gone</p>
                <br />

                <p>Yeah I'll never love again</p>
                <p>I'm enchanted forever and</p>
                <p>I'll wait for you</p>
                <p>Till you're gone</p>
                <br />

                <p>Jinji don't you cry</p>
                <p>I'll be by your side</p>
                <p>Look up to the sky</p>
                <p>Hold your hand in mind</p>
                <br />
                
                <Link to="/" className="back-link">Back to the beginning</Link>
            </div>
        </div>
    )
};

export default Lyrics;