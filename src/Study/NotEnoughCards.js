import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ deckId, cardCount }) {
  return (
    <div className="alert alert-warning">
      <h4 className="alert-heading">Not enough cards.</h4>
      <p>You need at least 3 cards to study. There are {cardCount} cards in this deck.</p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <i className="bi bi-plus-lg"></i> Add Cards
      </Link>
    </div>
  );
}

export default NotEnoughCards; 