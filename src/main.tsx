import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LetterBox from './components/LetterBox';
import CollagePage from './components/CollagePage';
import Lyrics from './components/Lyrics';
import AddMemory from './components/AddMemory';
import ManageDividers from './components/ManageDividers';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<LetterBox />} />
          <Route path="/collage" element={<CollagePage />} />
          <Route path="/lyrics" element={<Lyrics />} />
          <Route path="/add-memory" element={<AddMemory />} />
          <Route path="/manage-dividers" element={<ManageDividers />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);