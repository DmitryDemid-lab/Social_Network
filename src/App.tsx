import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar/Navbar";
import {Route} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store from "./redux/reduxStore"
import DialogsContainer from "./Components/Dialogs/Message/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/Header.container";
import HeaderConnect from "./Components/Header/Header.container";

function App() {
    let state = store.getState();
    return (
        <div className="app-wrapper">
            <HeaderConnect />
            <NavBar friends={state.sideBar.friends}/>
            <div className="app-wrapper-content">
                <Route path="/profile/:userId?"
                       render={() => <ProfileContainer/>
                       }/>
                <Route path="/dialogs"
                       render={() => <DialogsContainer/>}/>
                <Route path="/news"
                       render={() => <News/>}/>
                <Route path="/music"
                       render={() => <Music/>}/>
                <Route path="/settings"
                       render={() => <Settings/>}/>
                <Route path="/users"
                       render={() => <UsersContainer/>}/>
            </div>
        </div>
    )
}

export default App;
