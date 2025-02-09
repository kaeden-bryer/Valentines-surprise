import React from 'react';
import CollagePicture from './CollagePicture';


const CollagePage: React.FC = () => {
  
  
  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        <CollagePicture 
          background={{ background: 'linear-gradient(to bottom, red, orange)' }}
          src="/images/dogfilter.jpg"
          textOrder = {{ order: 3}}
          imageOrder = {{ order: 4}}
          title = {"Our First Date"}
          date = {"Feb 22'"}
          text = "/text/dogfilter.txt"
        />
        <CollagePicture
          background={{ background: 'linear-gradient(to bottom, orange, yellow)' }}
          src="/images/carmirror.jpg"
          textOrder = {{ order: 4}}
          imageOrder = {{ order: 3}}
          title = {"Toronto!"}
          date = {"June 24'"}
          text = "/text/carmirror.txt"
        />
        <br />

        <a href="/" className="back-link">Back to Letter</a>
      </div>
    </>
  );
};

export default CollagePage;