import React from 'react';

const CollagePage: React.FC = () => {
  return (
    <div className="collage-page">
      <h1>💖Our Memories✨</h1>
      <div className="collage">

        <div className="collage-pic">
            <img src="/dogfilter.jpg" alt="Memory 1" width="300px" />
            <figcaption>Suspiciously couple</figcaption>
        </div>
        <div className="collage-pic">
            <img src="/carmirror.jpg" alt="Memory 2" width="300px"/>
            <figcaption>First time to Beulah !</figcaption>
        </div>
        <div className="collage-pic">
            <img src="/toronto.jpg" alt="Memory 3" width="300px"/>
            <figcaption>Toronto !</figcaption>
        </div>


        {/* Add more images as needed */}
      </div>


      <br />
      <a href="/" className="back-link">Back to Letter</a>
    </div>
  );
};

export default CollagePage;