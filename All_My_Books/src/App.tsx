
import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { FavoritesProvider } from './context/FavoritesContext'
// import { useQuery } from './hooks/useQuery';
import { MagicStyle } from './styles/MacicStyle';

import Home from './pages/Home';
import Favorites from './pages/Favorite';
import Navbar from './components/NavBar';


function App() {
  return (
      <ThemeProvider theme={MagicStyle}>
        <FavoritesProvider>
          <Router>
            <Navbar />
            {/* AnimatePresence permite animações na saída de componentes */}
            <AnimatePresence mode="wait">
           
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favoritos" element={<Favorites />} />
                {/* <Route path="/estante" element={<Library />} /> */}
                {/* <Route path="/livro/:id" element={<BookDetails />} /> */}
              </Routes>
  
            </AnimatePresence>
          </Router>
        </FavoritesProvider>
      </ThemeProvider>
  );
}

export default App;
