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
import store from "./redux/state";


function App() {
    let state = store.getState();
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar friends={state}/>
                <div className="app-wrapper-content">
                    <Route path="/profile"
                           render={() => <Profile profilePage={state.profilePage}
                                                  addPost={store.addPost.bind(store)}
                                                  updateNewPostTex={store.updateNewPostTex.bind(store)}
                           />}/>
                    <Route path="/dialogs"
                           render={() => <Dialogs dialogsPage={state.dialogsPage}
                                                  addMessage={store.addMessage.bind(store)}
                                                  updateNewMessageText={store.updateNewMessageText.bind(store)}
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
