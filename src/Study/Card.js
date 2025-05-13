import React from "react";

function Card({ card, cardNumber, totalCards, isFlipped, onFlip, onNext }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {cardNumber} of {totalCards}
        </h5>
        <p className="card-text">
          {isFlipped ? card.back : card.front}
        </p>
        <button className="btn btn-secondary me-2" onClick={onFlip}>
          <i className="bi bi-arrow-repeat"></i> Flip
        </button>
        {isFlipped && (
          <button className="btn btn-primary" onClick={onNext}>
            <i className="bi bi-arrow-right"></i> Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Card; 