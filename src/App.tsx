import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/Navbar";
import Profile from "./Components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store from "./redux/reduxStore"
import DialogsContainer from "./Components/Dialogs/Message/DialogsContainer";

function App() {
    let state = store.getState();
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar friends={state.sideBar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile"
                           render={() => <Profile store={store}/>
                           }/>
                    <Route path="/dialogs"
                           render={() => <DialogsContainer store={store}/>}/>
                    <Route path="/news"
                           render={() => <News/>}/>
                    <Route path="/music"
                           render={() => <Music/>}/>
                    <Route path="/settings"
                           render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
