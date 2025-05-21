import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import CardForm from "../components/CardForm";

function AddCard() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
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

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, formData);
      setFormData({
        front: "",
        back: "",
      });
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
        currentPage="Add Card" 
      />
      <h2>{deck.name}: Add Card</h2>
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

export default AddCard; 