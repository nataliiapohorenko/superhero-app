import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroesPage from './pages/HeroesPage';
import HeroFormPage from './pages/HeroFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroesPage />} />
        <Route path="/create" element={<HeroFormPage />} />
        <Route path="/edit/:id" element={<HeroFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
