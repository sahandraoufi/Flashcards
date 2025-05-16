import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";

function Deck() {
  const [deck, setDeck] = useState(null);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
    
    if (confirmed) {
      try {
        await deleteCard(cardId);
        // Reload the deck to update the cards list
        const updatedDeck = await readDeck(deckId);
        setDeck(updatedDeck);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  // Ensure deck.cards exists before accessing it
  if (!deck.cards) {
    return <div>Error: No cards found in this deck.</div>;
  }

  return (
    <div>
      <Breadcrumb 
        deckName={deck.name} 
        deckId={deckId} 
        currentPage={deck.name} 
      />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="mb-4">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary me-2">
          <i className="bi bi-pencil"></i> Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary me-2">
          <i className="bi bi-book"></i> Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary me-2">
          <i className="bi bi-plus-lg"></i> Add Cards
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleDeleteDeck}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>

      <h3>Cards</h3>
      {deck.cards.length === 0 ? (
        <p>No cards in this deck yet.</p>
      ) : (
        <div className="row">
          {deck.cards.map((card) => (
            <div key={card.id} className="col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <p className="card-text">{card.front}</p>
                      <p className="card-text">{card.back}</p>
                    </div>
                    <div className="col-auto d-flex align-items-center">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary me-2"
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Deck; 