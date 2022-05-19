import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Compositor, Editor } from '~/pages';

function App() {
  return (
    <Routes>
      <Route path="/editor" element={<Editor />} />
      <Route path="/compositor" element={<Compositor />} />
      <Route path="/" element={<Navigate to={'/editor'} />} />
    </Routes>
  );
}

export default App;
