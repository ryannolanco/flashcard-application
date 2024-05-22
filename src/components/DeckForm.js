import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createDeck, readDeck, updateDeck } from "../utils/api";

import "../styles/deck-form.css"


const DeckForm = () => {

  const { deckId } = useParams();
  const intialDeckFormState = { name: "", description: "", id: "" }
  const [deckData, setDeckData] = useState({...intialDeckFormState})
  const navigate = useNavigate();
  
  //when page renders if there is a deck id present the setDeckData will be called allowing the form to populate with the current deck data

  useEffect(() => {
    if (deckId) {
      async function retrieveDeckData(deckId) {
        const controller = new AbortController();
        const { signal } = controller;
        try {
          const data = await readDeck(deckId, signal)
          setDeckData({
            id: data.id,
            name: data.name,
            description: data.description
          })
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to read deck", error)
          }
        }
      }
      retrieveDeckData(deckId)
    }
  }, [])

  //FUNCTION TO HANDLE SUBMIT OF FORM BUTTON
  const handleSubmit = (event) => {
    event.preventDefault();

    async function submitDeck(newDeck) {
      const controller = new AbortController();
      const { signal } = controller;

      try {
        if (!deckId) {
          createDeck(newDeck, signal)
        } else {
          updateDeck(newDeck, signal)
        } 
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to read deck:', error);
        }
      }
    }
    submitDeck(deckData)
    setDeckData({ ...intialDeckFormState })
  }

    //handle canceling of both edit and create card
    const handleCancel = () => {
      setDeckData({...intialDeckFormState})
      if (!deckId) {
        navigate('/')
      } else {
        navigate(`/decks/${deckId}`)
      }
      
    }

  // handle change fuction to make sure form input is controlled 
    const handleChange = ({ target }) => {
      setDeckData({ ...deckData, [target.name]: target.value })
    }
  
  
   

  return (
    <>
      <div className='nav-bar'>
        <p><Link to="/">Home</Link> / Create Deck</p>
      </div>
      <div className="create-new-deck">
        <h2>Create Deck</h2>
        <form onSubmit={handleSubmit}>
          <div>
          </div>
          <label htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            type='text'
            name='name'
            placeholder='Deck Name'
            value={deckData.name}
            onChange={handleChange} />
          <label htmlFor='description'>
            Description
          </label>
          <textarea id='description'
            name='description'
            rows='5'
            columns='40'
            placeholder='Brief description of deck'
            value={deckData.description}
            onChange={handleChange} />
          <div className="form-buttons">
            <button className="trash-button" onClick={handleCancel}>Cancel</button>
            <button className="blue-button" type="submit" >Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DeckForm