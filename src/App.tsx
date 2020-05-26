import React from 'react';
import './App.css';
import Header from "./Components/Header";
import NavBar from "./Components/Navbar";
import Profile from "./Components/Profile";


const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <NavBar/>
            <Profile/>
        </div>
    )
}

export default App;
