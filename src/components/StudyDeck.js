import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../styles/study-deck.css"

const StudyDeck = ({ foundDeck }) => {

	const [cardIndex, setCardIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);



	//handling setting the cardId ++ so that the page can rerender the new card
	const handleNextClick = () => {
		setCardIndex(cardIndex + 1);
		setFlipped(false);
	};
	//handling setting the flipped state to the opposite of what it is
	const handleFlipClick = () => {
		setFlipped(!flipped);
	};
	//handling setting the card index back to 0 to restart study session
	const handleRestartClick = () => {
		setCardIndex(0);
	};


	const cardList = foundDeck.cards.map((card, index) => (
		<div className="study-page-card">
			<div>
				<p className='card-count'>
					Card {index + 1} of {foundDeck.cards.length} &nbsp;&nbsp;
				</p>
			</div>
			<div className='study-card'>
				<p>{flipped ? card.back : card.front}</p>
			</div>
			<div className='study-buttons'>
				<button className="flip-button" onClick={handleFlipClick}>
					Flip
				</button>
				<>{flipped ? <button className="next-button" onClick={handleNextClick}>Next</button> : ""}</>
			</div>
		</div>
	));

	const finalCard = (
		<div className="study-page-last-card">
			<p>Would you like to study again?</p>
			<button onClick={handleRestartClick}>Restart</button>
		</div>
	);


	if (cardList.length > 2) {
		return (
			<>
				<div className='nav-bar'>
					<p>
						<Link to="/" >Home</Link> /
						<Link to={`/decks/${foundDeck.id}`}> {foundDeck.name} </Link> / Study
					</p>
				</div>
				<div className="study-page-all-cards">
					<h2>{foundDeck.name}: Study</h2>
					<div className="card-display">
						{cardIndex > cardList.length - 1 ? finalCard : cardList[cardIndex]}
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className='nav-bar'>
					<p>
						<Link to="/" >Home</Link> /
						<Link to={`/decks/${foundDeck.id}`}> {foundDeck.name} </Link> / Study
					</p>
				</div>
				<div className="study-page-all-cards">
					<h2>{foundDeck.name}: Study</h2>
					<div className="not-enough-cards">
						<h3>Not enough cards.</h3>
						<p>{`You need at least 3 cards to study. There are only ${foundDeck.cards.length} cards in this deck.`}</p>
						<div className='not-enough-button'>
							<Link className="blue-button" to={`/decks/2/cards/new`}>+ Add Cards</Link>
						</div>
					</div>
				</div>
			</>
		)
	}

};

export default StudyDeck;
