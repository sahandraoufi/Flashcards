import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";

function CreateDeck() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDeck = await createDeck(formData);
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <Breadcrumb 
        currentPage="Create Deck" 
      />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deck Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck; 