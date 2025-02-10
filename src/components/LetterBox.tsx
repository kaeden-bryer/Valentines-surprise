import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LetterBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenBox = (): void => {
    setIsOpen(true);
  };

  return (
    <div className="App">
      <div className="box-container">
        {!isOpen ? (
          <div className="heart-box" onClick={handleOpenBox}>
            <img
              src="/images/heartbox.png" // Path to the heart image in the public folder
              alt="Heart"
              className="heart-image"
            />
            <p>Click me!</p>
          </div>
        ) : (
          <div className="letter">
            <h1>To My Love,</h1>
            <p>
              You mean the world to me. You've brought so much light into my life, and
              I smile so much more because of you. I know I've been spending a lot of
              time coding, so I thought this would be the perfect time to make that
              website. It's not amazing, but I hope you like it
            </p>
            <p>Forever yours,</p>
            <p>Kaeden</p>
            
            <Link to="/collage">Click to see our memories</Link>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterBox;