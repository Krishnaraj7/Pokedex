import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Search from './components/Search';
import ListingPage from './components/ListingPage';
import DetailsPage from './components/DetailsPage';
import BookmarksPage from './components/BookmarksPage';



function App() {
  return (
 <Router>

  <Routes >
    <Route path='/' Component={Search} />
    <Route path='//listing' Component={ListingPage} />
    <Route path='//details/:id' Component={DetailsPage} />
    <Route path='/bookmarks' Component={BookmarksPage} />
  </Routes>
  
  
 </Router>
  );
}

export default App;
