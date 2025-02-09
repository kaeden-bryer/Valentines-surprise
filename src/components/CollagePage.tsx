import React from 'react';
import CollagePicture from './CollagePicture';

const CollagePage: React.FC = () => {
  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        <CollagePicture 
          background={{ background: 'linear-gradient(to bottom, red, orange)' }}
          // image
          // title
          // date
        />
        <CollagePicture background={{ background: 'linear-gradient(to bottom, orange, yellow)' }}/>
        <br />

        <a href="/" className="back-link">Back to Letter</a>
      </div>
    </>
  );
};

export default CollagePage;