import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    
    async function loadDecks() {
      try {
        const decksList = await listDecks(abortController.signal);
        setDecks(decksList);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadDecks();
    return () => abortController.abort();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter(deck => deck.id !== deckId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <Link to="/decks/new" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Create Deck
          </Link>
        </div>
      </div>
      <div className="row">
        {decks.map((deck) => (
          <div key={deck.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.cards.length} cards</p>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary me-2">
                      <i className="bi bi-eye"></i> View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                      <i className="bi bi-book"></i> Study
                    </Link>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteDeck(deck.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; 