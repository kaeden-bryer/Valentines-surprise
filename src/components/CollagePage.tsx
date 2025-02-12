import React from 'react';
import CollagePicture from './CollagePicture';
import data from '../data/data.json';
import Milestone from './Milestone';

interface data {
  background: string;
}

interface Picture {
  image: string;
  title: string;
  date: string;
  text: string;
}


const CollagePage: React.FC = () => {
  
  const rows: JSX.Element[] = [];

  let i = 0;

  data.Pictures.forEach((picture: Picture) => {

    let textOrder: React.CSSProperties;
    let imageOrder: React.CSSProperties;


    if (i % 2 === 0) {
      // add textOrder = 3, imageOrder = 4
      textOrder = { order: 3};
      imageOrder = { order: 4};
    } else {
      // add textOrder = 4, imageOrder = 3
      textOrder = { order: 4};
      imageOrder = { order: 3};
    }

    rows.push(
      <CollagePicture 
        image= {picture.image}
        title = {picture.title}
        textOrder = {textOrder}
        imageOrder = {imageOrder}
        date = {picture.date}
        text = {picture.text}
      />
    );
    console.log("adding picture");
    i++;
});


  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        {rows}

        <br />

        < Milestone text="Present Date" />

        <a href="/" className="back-link">Back to Letter</a>
      </div>
    </>
  );
};

export default CollagePage;