import React from 'react';
import CollagePicture from './CollagePicture';

const CollagePage: React.FC = () => {
  
  
  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        <CollagePicture 
          background={{ background: 'linear-gradient(to bottom, red, orange)' }}
          src="/dogfilter.jpg"
          textOrder = {{ order: 3}}
          imageOrder = {{ order: 4}}
          title = {"Our First Date"}
          date = {"Feb 22'"}
          text = {"I remember how nervous I was to meet you. I was so scared I would mess up, but you made me feel so comfortable. I knew I loved you from the moment I saw you."}
        />
        <CollagePicture
          background={{ background: 'linear-gradient(to bottom, orange, yellow)' }}
          src="/carmirror.jpg"
          textOrder = {{ order: 4}}
          imageOrder = {{ order: 3}}
          title = {"Toronto!"}
          date = {"June 24'"}
          text = {"Insert text about how I love you and how much fun we had in Toronto. I love you so much and I can't wait to go back."}
        />
        <br />

        <a href="/" className="back-link">Back to Letter</a>
      </div>
    </>
  );
};

export default CollagePage;