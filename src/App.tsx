import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar/Navbar";
import {BrowserRouter, Route} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store, {AppStateType} from "./redux/reduxStore"
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderConnect from "./Components/Header/Header.container";
import Login from "./Components/Login/Login";
import Dialogs from "./Components/Dialogs/DialogsContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer/appReducer";
import Preloader from "./Components/common/preloader/Preloader";


class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderConnect/>
                <NavBar friends={store.getState().sideBar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path="/dialogs"
                           render={() => <Dialogs/>}/>
                    <Route path="/news"
                           render={() => <News/>}/>
                    <Route path="/music"
                           render={() => <Music/>}/>
                    <Route path="/settings"
                           render={() => <Settings/>}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/login"
                           render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

export const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

//TYPES
type MapStateToPropsType = {
    initialized: boolean
}
type AppPropsType = MapStateToPropsType & {
    initializeApp: () => void
}
