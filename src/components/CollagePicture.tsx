import React, {CSSProperties} from "react";

interface CollagePictureProps {
    background?: CSSProperties;
}

const CollagePicture: React.FC<CollagePictureProps> = ( {background}: CollagePictureProps ) => {
  return (
   <div className="collage-container">
        <div className="collage-bar" style={background} >

        </div>
        <div className="collage-date">
            <p>–March 22'</p>
        </div>
        <div className="collage-text">
            <h1>Suspiciously Couple</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In minus enim veritatis sed cumque maxime assumenda nihil eos aperiam esse corrupti eligendi alias perspiciatis veniam, fugit unde saepe praesentium cum.</p>
        </div>
        <div className="collage-pic">
            <img src="/dogfilter.jpg" alt="Memory 1" />
        </div>
    </div>
    )
};

export default CollagePicture;