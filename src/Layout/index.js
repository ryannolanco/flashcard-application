import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import StudyDeck from "../components/StudyDeck";
import ViewDeck from "../components/ViewDeck";
import Homepage from "../components/Homepage";
import { Routes, Route } from "react-router-dom";
import CreateNewDeck from "../components/CreateNewDeck";
import { useState } from "react";
import EditDeck from "../components/EditDeck";
import DeckLayout from "../components/DeckLayout";
import NewCard from "../components/NewCard";
import EditCard from "../components/EditCard";

function Layout() {

  /* ---- creating state that will be passed to StudyDeck and ViewDeck to make it easier to render the deck depending on the component ---- */
  const [foundDeck, setFoundDeck] = useState({
    name: '',
    description: '',
    id: 0,
    cards: [],
  });

  /* ---- this is a shared form state that will be passed to edit card and add card components ---- */
  const intialCardFormData = { front: "", back: "" }
  const [cardFormData, setCardFormData] = useState({ ...intialCardFormData })

  /* ---- creating state that will be passed to HomePage and ViewDeck to make it easier to render the deck depending on the component ---- */
  const [existingDecks, setExistingDecks] = useState([]);


  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/"
            element={<Homepage
              existingDecks={existingDecks}
              setExistingDecks={setExistingDecks}
            />} />
          <Route path="/decks/new"
            element={<CreateNewDeck />} />
          <Route path="/decks/:deckId"
            element={<DeckLayout
              setFoundDeck={setFoundDeck}
              existingDecks={existingDecks}
              setExistingDecks={setExistingDecks}
              setCardFormData={setCardFormData}
              cardFormData={cardFormData}
            />}>
            <Route index
              element={<ViewDeck
                foundDeck={foundDeck}
                existingDecks={existingDecks}
                setExistingDecks={setExistingDecks}
              />} />
            <Route path="study"
              element={<StudyDeck
                foundDeck={foundDeck}
              />} />
            <Route path="edit"
              element={<EditDeck
                foundDeck={foundDeck}
              />} />
          </Route>
          <Route path="/decks/:deckId/cards/new"
            element={<NewCard
              foundDeck={foundDeck}
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              intialCardFormData={intialCardFormData}
              existingDecks={existingDecks}
              setExistingDecks={setExistingDecks}

            />} />
          <Route path={`/decks/:deckId/cards/:cardId/edit`}
            element={<EditCard
              foundDeck={foundDeck}
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              intialCardFormData={intialCardFormData}
              existingDecks={existingDecks}
              setExistingDecks={setExistingDecks}
            />} />
          <Route path="*"
            element={<NotFound />} />
        </Routes>

      </div>
    </>
  );
}

export default Layout;
