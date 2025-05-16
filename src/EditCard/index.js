import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";

function EditCard() {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const [loadedDeck, loadedCard] = await Promise.all([
          readDeck(deckId, abortController.signal),
          readCard(cardId, abortController.signal)
        ]);
        setDeck(loadedDeck);
        setCard(loadedCard);
        setFormData({
          front: loadedCard.front,
          back: loadedCard.back,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadData();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ ...formData, id: cardId });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck || !card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumb 
        deckName={deck.name} 
        deckId={deckId} 
        currentPage={`Edit Card ${cardId}`} 
      />
      <h2>{deck.name}: Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of card"
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
            rows="4"
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard; 