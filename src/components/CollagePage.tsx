import React from 'react';
import CollagePicture from './CollagePicture';
import data from '../data/data.json';

interface data {
  background: string;
}


const CollagePage: React.FC = () => {
  
  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        <CollagePicture 
          background={{ background: 'linear-gradient(to bottom, red, orange)' }}
          image= {data.Pictures[0].image}
          textOrder = {{ order: 3}}
          imageOrder = {{ order: 4}}
          title = {data.Pictures[0].title}
          date = {data.Pictures[0].date}
          text = {data.Pictures[0].text}
        />

        <CollagePicture 
          background={{ background: 'linear-gradient(to bottom, orange, yellow)' }}
          image= {data.Pictures[1].image}
          textOrder = {{ order: 4}}
          imageOrder = {{ order: 3}}
          title = {data.Pictures[1].title}
          date = {data.Pictures[1].date}
          text = {data.Pictures[1].text}
        />

        <CollagePicture
          background={{ background: 'linear-gradient(to bottom, yellow, lightgreen)' }}
          image="/images/carmirror.jpg"
          textOrder = {{ order: 4}}
          imageOrder = {{ order: 3}}
          title = {"Car Mirror Selfie"}
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