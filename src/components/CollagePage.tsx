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
  orientation: string;
}


const CollagePage: React.FC = () => {
  
  const rows: JSX.Element[] = [];

  let i = 0;
  let colorIndex = 0;

  data.Pictures.forEach((picture: Picture) => {

    let textOrder: React.CSSProperties;
    let imageOrder: React.CSSProperties;
    let width: React.CSSProperties;
    let background: React.CSSProperties = { background: "linear-gradient(to bottom, red, orange)" };

    if (colorIndex == 0){
      background = {background: "linear-gradient(to bottom, red, orange"};
      colorIndex++;
    } else if (colorIndex == 1){
      background = {background: "linear-gradient(to bottom, orange, yellow"};
      colorIndex++;
    } else if (colorIndex == 2){
      background = {background: "linear-gradient(to bottom, yellow, lightgreen"}; 
      colorIndex++;
    } else if (colorIndex == 3){ 
      background = {background: "linear-gradient(to bottom, lightgreen, lightblue"};
      colorIndex++;
    } else if (colorIndex == 4){
      background = {background: "linear-gradient(to bottom, lightblue, blue"};
      colorIndex++;
    } else if (colorIndex == 5){
      background = {background: "linear-gradient(to bottom, blue, purple"};
      colorIndex++;
    } else if (colorIndex == 6){
      background = {background: "linear-gradient(to bottom, purple, red"};
      colorIndex = 0;
    }

    if (i % 2 === 0) {
      // add textOrder = 3, imageOrder = 4
      textOrder = { order: 3};
      imageOrder = { order: 4};
    } else {
      // add textOrder = 4, imageOrder = 3
      textOrder = { order: 4};
      imageOrder = { order: 3};
    }

    if (picture.orientation === "landscape") {
      width = {width: "300px"};
    } else {
      width = {width: "180px"};
    }

    rows.push(
      <CollagePicture 
        image= {picture.image}
        title = {picture.title}
        textOrder = {textOrder}
        imageOrder = {imageOrder}
        date = {picture.date}
        text = {picture.text}
        orientation = {width}
        background = {background}
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

        < Milestone text="2023" />

        < Milestone text="Officially Dating" />

        < Milestone text="2024" />

        < Milestone text="At Oakland Together" />

        < Milestone text="2025" />

        < Milestone text="Present Date" />

        <div className="link-container">
          <a href="/lyrics" className="back-link">Take me to the Lyrics</a>
        </div>
        
      </div>
    </>
  );
};

export default CollagePage;