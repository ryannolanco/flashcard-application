import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api";

import "../styles/view-deck.css"

const ViewDeck = ({ foundDeck, existingDecks, setExistingDecks}) => {

	


	/* ---- All Button Handlers for ViewDeck Page ---- */
	//delete handler to delete deck from API
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


	//delete handler to delete card from API
	const handleDeleteCard = async (cardId) => {
		const controller = new AbortController();
		const { signal } = controller;
		const message = "Delete this Card? \n \n You will not be able to recover it."

		if (window.confirm(message)) {
			try {
				await deleteCard(cardId, signal);
				const updatedDecks = existingDecks.map(deck => {
					if (deck.id === foundDeck.id) {
						const updatedCards = deck.cards.filter(card => card.id !== cardId);
						return { ...deck, cards: updatedCards };
					}
					return deck;
				});
				setExistingDecks(updatedDecks);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Failed to delete card:', error)
				}
			}
		}
	}



	/* ---- mapping all cards to a table for presenting cards on page. one data item has the information about the card front and the other data item has information about the card back as well as a delete card button and edit card button. ---- */
	const cards = foundDeck.cards
	const cardItems = cards.map((card, index) => (
		<tr key={index}>
			<td>{card.front}</td>
			<td>{card.back}</td>
			<td>
				<div className="table-buttons">
					<Link className="blue-button" to={`/decks/${foundDeck.id}/cards/${card.id}/edit`}>Edit</Link>
					<button className="trash-button" onClick={() => handleDeleteCard(card.id)}>Delete</button>
				</div>

			</td>
		</tr>
	))

	return (
<div className="view-deck-flex">
	<div className='nav-bar'>
		<p>
			<Link to="/" >Home </Link>/ {foundDeck.name}
		</p>
	</div>
	<div className="viewdeck-page">
		<div className="deck-description">
			<h3>{foundDeck.name}</h3>
			<p>{foundDeck.description}</p>
			<div className="view-deck-buttons">
				<Link className="blue-button" to={`/decks/${foundDeck.id}/edit`}>Edit</Link>
				<Link className="blue-button" to={`/decks/${foundDeck.id}/study`}>Study</Link>
				<Link className="blue-button" to={`/decks/${foundDeck.id}/cards/new`}>Add Cards</Link>
				<button className="trash-button" onClick={() => handleDeleteDeck(foundDeck.id)}>Delete</button>
			</div>

		</div>
		<div className="cards-area">
			<h5>Cards</h5>
			<table className="view-deck-table">
				<tbody>{cardItems}</tbody>
			</table>
		</div>
	</div>
</div>
	)
}


export default ViewDeck