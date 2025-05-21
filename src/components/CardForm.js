import React from "react";

function CardForm({ formData, handleChange, handleSubmit, handleCancel, submitLabel = "Save" }) {
  return (
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
        {submitLabel}
      </button>
    </form>
  );
}

export default CardForm; 