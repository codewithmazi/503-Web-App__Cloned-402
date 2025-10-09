import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css'; // Importing Bulma CSS here
import "./App.css";
import { Authenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import About from './components/layout/about';
import MovieDetail from "./components/layout/MovieDetail";
import MoviesPage from './components/layout/MoviesPage';
import Movies from './components/layout/Movies';
import Crops from './components/layout/Crops';
import MovieAdmin from './components/layout/MovieAdmin';
import TVShowsPage from './components/layout/TvshowsPage';
import TVShowAdmin from './components/layout/TvshowAdmin';
import Admin from './components/layout/Admin';
import TvshowDetail from './components/layout/TvshowDetail';
import Search from './components/layout/Search';


// Routing for each pages
const App: React.FC = () => {
  return (
    <Router>
      <div className="has-background-light is-flex is-flex-direction-column is-fullheight">
        <Header />
        <main className="container is-fluid my-6">
        <Authenticator loginMechanisms={['email']} signUpAttributes={['name']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/mvadmin" element={<MovieAdmin />} />
            <Route path="/tvshows" element={<TVShowsPage />} />
            <Route path="/tvadmin" element={<TVShowAdmin />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/tvshows/:vid" element={<TvshowDetail />} />
            <Route path="/search" element={<Search />} />
            

          </Routes>
          </Authenticator>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;