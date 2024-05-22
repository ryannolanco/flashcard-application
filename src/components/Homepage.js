
import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import HomepageDecksView from './HomepageDecksView';

import "../styles/homepage-view.css"


const HomePage = ({existingDecks, setExistingDecks}) => {
  



  return (
    <div className="home-page">
      <div className='homepage-decks'>
        <HomepageDecksView existingDecks={existingDecks} setExistingDecks={setExistingDecks} />
      </div>
    </div>
  )
}

export default HomePage