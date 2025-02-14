import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LetterBox from './components/LetterBox';
import CollagePage from './components/CollagePage';
import Lyrics from './components/Lyrics';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<LetterBox />} />
          <Route path="/collage" element={<CollagePage />} />
          <Route path="/lyrics" element={<Lyrics />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
   document.getElementById('root')
);