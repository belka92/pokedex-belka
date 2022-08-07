import React from "react";
import './Navbar.css';
import Pokédex_logo from "../images/Pokédex_logo.png"


const Navbar = ()=>{
    return(
        <div className="navbar">
            <img src={Pokédex_logo} />
        </div>
    );
}

export default Navbar;
