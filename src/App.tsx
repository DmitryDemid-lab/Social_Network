import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar/Navbar";
import {HashRouter, Route} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store, {AppStateType} from "./redux/reduxStore"
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderConnect from "./Components/Header/Header.container";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer/appReducer";
import Preloader from "./Components/common/preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";

const Dialogs = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));


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
                           render={WithSuspense(ProfileContainer)}/>
                    <Route path="/dialogs"
                           render={WithSuspense(Dialogs)}/>
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

/*
<React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
*/

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

export const MainApp = () => {
    return <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

//TYPES
type MapStateToPropsType = {
    initialized: boolean
}
type AppPropsType = MapStateToPropsType & {
    initializeApp: () => void
}