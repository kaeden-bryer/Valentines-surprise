import React, {CSSProperties, useState, useEffect} from "react";
import { Link } from 'react-router-dom';


interface CollagePictureProps {
    background?: CSSProperties;
    image: string;
    textOrder: CSSProperties;
    imageOrder: CSSProperties;
    title: string;
    text: string;
    date: string;
    memoryKey?: number;
}

const CollagePicture: React.FC<CollagePictureProps> = ( {background, image, textOrder, imageOrder, title, text, date, memoryKey}: CollagePictureProps ) => {


        const [textContent, setTextContent] = useState<string>('');
    
        useEffect(() => {
          // Check if text is a file path (starts with / or contains .txt) or direct text
          if (text.startsWith('/') || text.includes('.txt')) {
            // Fetch the file from the public folder
            fetch(text)
              .then((response) => response.text())
              .then((text) => setTextContent(text))
              .catch((error) => {
                console.error('Error reading file:', error);
                // If fetch fails, use the text directly
                setTextContent(text);
              });
          } else {
            // Use the text directly (from database)
            setTextContent(text);
          }
        }, [text]);
  
    return (
   <div className="collage-container">
        <div className="collage-bar" style={{...background, order: 1}}>

        </div>
        <div className="collage-date" style={{order: 2}}>
            <p>–{date}</p>
        </div>
        <div className="collage-text" style={{...textOrder}}>
            {memoryKey && (
                <Link to={`/add-memory?id=${memoryKey}`} className="edit-icon-btn">
                    <img src="/images/edit.png" alt="Edit" />
                </Link>
            )}
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