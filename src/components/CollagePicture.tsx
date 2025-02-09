import React, {CSSProperties} from "react";

interface CollagePictureProps {
    background?: CSSProperties;
    src: string;
    textOrder: CSSProperties;
    imageOrder: CSSProperties;
    title?: string;
    text?: string;
    date?: string;
}

const CollagePicture: React.FC<CollagePictureProps> = ( {background, src, textOrder, imageOrder, title, text, date}: CollagePictureProps ) => {
  return (
   <div className="collage-container">
        <div className="collage-bar" style={{...background, order: 1}}>

        </div>
        <div className="collage-date" style={{order: 2}}>
            <p>–{date}</p>
        </div>
        <div className="collage-text" style={{...textOrder}}>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
        <div className="collage-pic" style={{...imageOrder}}>
            <img src={src} alt="Memory 1" />
        </div>
    </div>
    )
};

export default CollagePicture;