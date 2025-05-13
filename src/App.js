import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
// import CreateDeck from "./CreateDeck";
// import Deck from "./Deck";
// import EditDeck from "./EditDeck";
// import Study from "./Study";
// import AddCard from "./AddCard";
// import EditCard from "./EditCard";
import './App.css';

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
      <div className='app-routes'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="decks/new" element={<CreateDeck />} />
            <Route path="decks/:deckId" element={<Deck />} />
            <Route path="decks/:deckId/edit" element={<EditDeck />} />
            <Route path="decks/:deckId/study" element={<Study />} />
            <Route path="decks/:deckId/cards/new" element={<AddCard />} />
            <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard />} /> */}
          </Route>
        </Routes>
      </div>
  );
}

export default App;
