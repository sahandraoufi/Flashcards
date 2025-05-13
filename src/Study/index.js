import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import Card from "./Card";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumb 
        deckName={deck.name} 
        deckId={deckId} 
        currentPage="Study" 
      />
      <h2>Study: {deck.name}</h2>
      
      {deck.cards.length <= 2 ? (
        <NotEnoughCards 
          deckId={deckId} 
          cardCount={deck.cards.length} 
        />
      ) : (
        <Card
          card={deck.cards[currentCardIndex]}
          cardNumber={currentCardIndex + 1}
          totalCards={deck.cards.length}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default Study; 