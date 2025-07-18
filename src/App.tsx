import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Details from './components/details/Details';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Search from './components/search/SearchPokemon';
import Favorite from './components/favourite/Favorite';
import Dashboard from './components/dashboard/Dashboard';
import Default404 from './components/default/DefaultPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsMobile } from './redux/feature/typeFilterSlice';

function App() {
  const { inMobile } = useSelector((state: any) => state.typeFilter);
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
    return () => { }
  }, [inMobile])
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/pokemon/:pokemonName" element={<Details />} />
        <Route path="*" element={<Default404 text='You Lost 😂😂😂😂' />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

