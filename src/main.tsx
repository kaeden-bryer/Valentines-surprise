import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LetterBox from './components/LetterBox';
import CollagePage from './components/CollagePage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<LetterBox />} />
          <Route path="/collage" element={<CollagePage />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
   document.getElementById('root')
);