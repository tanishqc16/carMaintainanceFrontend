import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Snavbar() {
  return (
    <>
     <header>
        <div>
            <h1>Car Maintainance</h1>
        </div>
        
    </header>
    <nav>
        <ul class="nav-links">
            <li><Link to="/users">User</Link></li>
            <li><Link to="/cars">Car</Link></li>
        </ul>
    </nav>
    </>
  );
}
