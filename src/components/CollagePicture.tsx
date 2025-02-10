import React, {CSSProperties, useState, useEffect} from "react";


interface CollagePictureProps {
    background?: CSSProperties;
    image: string;
    textOrder: CSSProperties;
    imageOrder: CSSProperties;
    title: string;
    text: string;
    date: string;
}

const CollagePicture: React.FC<CollagePictureProps> = ( {background, image, textOrder, imageOrder, title, text, date}: CollagePictureProps ) => {


        const [textContent, setTextContent] = useState<string>('');
    
        useEffect(() => {
          // Fetch the file from the public folder
          fetch(text)
            .then((response) => response.text())
            .then((text) => setTextContent(text))
            .catch((error) => console.error('Error reading file:', error));
        }, []);
  
    return (
   <div className="collage-container">
        <div className="collage-bar" style={{...background, order: 1}}>

        </div>
        <div className="collage-date" style={{order: 2}}>
            <p>–{date}</p>
        </div>
        <div className="collage-text" style={{...textOrder}}>
            <h1>{title}</h1>
            <p>{textContent}</p>
        </div>
        <div className="collage-pic" style={{...imageOrder}}>
            <img src={image} alt="Memory 1" />
        </div>
    </div>
    )
};

export default CollagePicture;