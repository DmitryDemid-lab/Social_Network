import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import state, {addMessage, addPost, updateNewMessageText, updateNewPostTex} from "./redux/state";


function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar friends={state.sideBar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile"
                           render={() => <Profile profilePage={state.profilePage}
                                                  addPost={addPost}
                                                  updateNewPostTex={updateNewPostTex}
                           />}/>
                    <Route path="/dialogs"
                           render={() => <Dialogs dialogsPage={state.dialogsPage}
                                                  addMessage={addMessage}
                                                  updateNewMessageText={updateNewMessageText}
                           />}/>
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
