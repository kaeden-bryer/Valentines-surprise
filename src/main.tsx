import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LetterBox from './components/LetterBox';
import CollagePage from './components/CollagePage';
import EditMemory from './components/EditMemory';
import Lyrics from './components/Lyrics';
import DatabaseTest from './components/DatabaseTest';
import AddMemory from './components/AddMemory';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<LetterBox />} />
          <Route path="/collage" element={<CollagePage />} />
          <Route path="/lyrics" element={<Lyrics />} />
          <Route path="/edit" element={<EditMemory />} />
          <Route path="/database-test" element={<DatabaseTest />} />
          <Route path="/add-memory" element={<AddMemory />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);