import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import CardForm from "../components/CardForm";

function EditCard() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });
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
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
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

  return (
    <div>
      <Breadcrumb 
        deckName={deck.name} 
        deckId={deckId} 
        currentPage={`Edit Card ${cardId}`} 
      />
      <h2>{deck.name}: Edit Card</h2>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        submitLabel="Save"
      />
    </div>
  );
}

export default EditCard; 