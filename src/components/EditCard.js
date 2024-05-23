import React from "react";
import CardForm from "./CardForm"
import { Link } from "react-router-dom";

const EditCard = ( {foundDeck, setCardFormData, cardFormData, intialCardFormData }) => {

  return (
    <>
      <div className='nav-bar'>
        <p><Link to="/">Home </Link> / <Link to={`/decks/${foundDeck.id}`}>{foundDeck.name}</Link> / <p>Add Card</p></p>
      </div>
      <>{<CardForm
      foundDeck={foundDeck}
        cardFormData={cardFormData}
        setCardFormData={setCardFormData}
        intialCardFormData={intialCardFormData}
      />}</>
    </>
  )
}


export default EditCard