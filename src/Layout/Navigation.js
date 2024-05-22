import React from "react";
import { NavLink } from "react-router-dom";



const Navigation = ({ foundDeck }) => {
  const { name } = foundDeck
  return (
    <nav className="nav-bar">
      <NavLink to="/" >Home</NavLink> /
      <NavLink to=""> {name} </NavLink> /
      <p>Study</p>
    </nav>

  )
}

export default Navigation