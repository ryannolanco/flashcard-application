import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

import "../styles/homepage-view.css"

const HomepageDecksView = ({ existingDecks, setExistingDecks }) => {





  //retrieves all deck and updates the state upon intial render of page
  useEffect((event) => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchDecks() {
      try {
        const decks = await listDecks(signal);
        setExistingDecks(decks)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to retrieve decks:', error);
        }
      }

    }
    fetchDecks();
  }, [])

  //delete handler to delete deck from api
  const handleDeleteDeck = async (deckId) => {
    const controller = new AbortController();
    const { signal } = controller;
    const message = "Delete this deck? \n \n You will not be able to recover it."

    if (window.confirm(message)) {
      try {
        await deleteDeck(deckId, signal);
        const updatedDecks = existingDecks.filter(deck => deck.id !== deckId);
        setExistingDecks(updatedDecks);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to delete deck:', error)
        }
      }
    }
  }






  const listItems = existingDecks.map((deck, index) => (
    <li className="deck-list-items" key={index}>
      <div>
        <div className="title-header-area">
          <div className="title-header">
            <h3>{deck.name}</h3>
            <p>{`${deck.cards.length} cards`}</p>
          </div>
        </div>
        <div className="deck-description-area">
          <p>{deck.description}</p>
          <div className="deck-list-buttons">
            <div className="view-study-buttons">
              <Link className="grey-button" to={`/decks/${deck.id}`}>View</Link>
              <Link className="blue-button" to={`/decks/${deck.id}/study`}>Study</Link></div>
            <div>
              <button className="trash-button" onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  ))

  return (
    <div className="deck-list">
    <div className="list-items">
      <ul>
        {listItems}
        <Link className="create-button" to={"/decks/new"}>+ Create Deck</Link>
      </ul>
    </div>
  </div>
  )
}


export default HomepageDecksView;