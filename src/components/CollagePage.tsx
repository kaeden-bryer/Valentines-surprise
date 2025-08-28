import React from 'react';
import CollagePicture from './CollagePicture';
import data from '../data/data.json';
import Milestone from './Milestone';
import BackgroundMusic from './BackgroundMusic';

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
  
  const rows2022: JSX.Element[] = [];
  const rows2023: JSX.Element[] = [];
  const rowsOfficial: JSX.Element[] = [];
  const rows2024: JSX.Element[] = [];
  const rowsOakland: JSX.Element[] = [];
  const rows2025: JSX.Element[] = [];

  let pictureNum = 0;
  let colorIndex = 0;

  data.Pictures.forEach((picture: Picture) => {

    let textOrder: React.CSSProperties;
    let imageOrder: React.CSSProperties;
    let width: React.CSSProperties;
    let background: React.CSSProperties;

    // get background color
    background = getGradientColor(colorIndex);
    colorIndex = (colorIndex + 1) % 7;

    if (pictureNum % 2 === 0) {
      // add textOrder = 3, imageOrder = 4
      textOrder = { order: 3};
      imageOrder = { order: 4};
    } else {
      // add textOrder = 4, imageOrder = 3
      textOrder = { order: 4};
      imageOrder = { order: 3};
    }

    // get image width based on orientation
    width = getImageWidth(picture.orientation);

    // this is just terrible and will require a database to fix
    if (pictureNum < 4) {
      rows2022.push(
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
    } else if (pictureNum < 6 && pictureNum >= 4) {
      rows2023.push(
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
    } else if (pictureNum < 31 && pictureNum >= 6) {
      rowsOfficial.push(
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
    } else if (pictureNum < 46 && pictureNum >= 31) {
      rows2024.push(
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
    } else if (pictureNum < 55 && pictureNum >= 46) {
      rowsOakland.push(
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
    } else {
      rows2025.push(
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
    }
    
    pictureNum++;
});

function getGradientColor(colorIndex: number): React.CSSProperties {
  switch (colorIndex){
    case 0:
      return {background: "linear-gradient(to bottom, red, orange"};
    case 1:
      return {background: "linear-gradient(to bottom, orange, yellow"};
    case 2:
      return {background: "linear-gradient(to bottom, yellow, lightgreen"};
    case 3:
      return {background: "linear-gradient(to bottom, lightgreen, lightblue"};
    case 4:
      return {background: "linear-gradient(to bottom, lightblue, blue"};
    case 5:
      return {background: "linear-gradient(to bottom, blue, purple"};
    case 6:
      return {background: "linear-gradient(to bottom, purple, red"};
    default:
      return {background: "linear-gradient(to bottom, black, white"};
  }
}

// update this in the future to not require an orientation string
function getImageWidth(orientation: string): React.CSSProperties {
  if (orientation === "landscape") {
    return {width: "400px"};
  } else {
    return {width: "180px"};
  }
}

  return (
    <>
      <div className="collage-page">

        <h1>💖Our Memories✨</h1>

        {rows2022}

        < Milestone text="2023" />

        {rows2023}

        < Milestone text="Officially Dating" />

        {rowsOfficial}

        < Milestone text="2024" />

        {rows2024}

        < Milestone text="At Oakland Together" />

        {rowsOakland}

        < Milestone text="2025" />

        {rows2025}

        < Milestone text="Present Date" />

        <div className="link-container">
          <a href="/lyrics" className="back-link">Take me to the Lyrics</a>
        </div>

        <BackgroundMusic />
        
      </div>
    </>
  );
};

export default CollagePage;