import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, updateCard, readCard } from "../utils/api";
import { useEffect } from "react";

import "../styles/card-form.css"

const CardForm = ({ cardFormData, setCardFormData, foundDeck, intialCardFormData }) => {
  const navigate = useNavigate();
  const { cardId, deckId } = useParams();
  const deckCards = foundDeck.cards



  useEffect(() => {
    if (cardId) {
      async function retrieveCardData(cardId) {
        const controller = new AbortController();
        const { signal } = controller
        try {
          const data = await readCard(cardId, signal)
          setCardFormData({
            id: data.id,
            deckId: data.deckId,
            front: data.front,
            back: data.back
          })
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to read card", error)
          }
        }
      }
      retrieveCardData(cardId)


    }
  }, [])






  const cardInfo = deckCards.find((card) => Number(cardId) === card.id);
  //handle submit for when save button is pushed
  const handleSubmit = (event) => {
    event.preventDefault();

    async function submitNewCard(newCard) {
      const controller = new AbortController();
      const { signal } = controller;

      try {
        if (!cardId) {
          createCard(deckId, newCard, signal)
        } else {
          updateCard(newCard, signal)
        }

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Failed to create card", error)
        }
      }
    }
    submitNewCard(cardFormData)
    setCardFormData({ ...intialCardFormData })
  }

  //handle canceling of both edit and create card
  const handleCancel = () => {
    setCardFormData(intialCardFormData)
    navigate(`/decks/${deckId}`)
  }

  // handle change fuction to make sure form input is controlled 
  const handleChange = ({ target }) => {
    setCardFormData({ ...cardFormData, [target.name]: target.value })

  }


  return (
    <div className="create-new-card">
      <h2>Create Card</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea
          type="text"
          id="front"
          name="front"
          onChange={handleChange}
          value={cardFormData.front}
        />
        <label htmlFor="back">Back</label>
        <textarea
          type="text"
          id="back"
          name="back"
          onChange={handleChange}
          value={cardFormData.back}
        />
        <div className="form-buttons">
          <button className="trash-button" onClick={handleCancel}>Cancel</button>
          <button className="blue-button" type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default CardForm