import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar/Navbar";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import store, {AppStateType} from "./redux/reduxStore"
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderConnect from "./Components/Header/Header.container";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {handleError, initializeApp} from "./redux/appReducer/appReducer";
import Preloader from "./Components/common/preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";
import {NavigationBar} from "./Components/NavigationBar/navigationBar";

const Dialogs = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));


class App extends React.Component<AppPropsType> {

    catchAllUnhandledRejections = (promiseRejectionEvent: any) => {
        this.props.handleError(promiseRejectionEvent.reason.message)
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledRejections)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledRejections)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <NavigationBar/>
                <HeaderConnect/>
                {/*<NavBar friends={store.getState().sideBar.friends}/>*/}
                <div className="app-wrapper-content">
                    {/*ВСТАВИТЬ КНОПКУ С ЗАНУЛЕНИЕМ ОШИБКИ*/}
                    {this.props.error && <div className='error'><h4>{this.props.error}</h4></div>}
                    <Switch>
                        <Route path='/' exact><Redirect to='/profile'/></Route>
                        <Route path="/profile/:userId?"
                               render={WithSuspense(ProfileContainer)}/>
                        <Route path="/dialogs"
                               render={WithSuspense(Dialogs)}/>
                       {/* <Route path="/news"
                               render={() => <News/>}/>
                        <Route path="/music"
                               render={() => <Music/>}/>
                        <Route path="/settings"
                               render={() => <Settings/>}/>*/}
                        <Route path="/users"
                               render={() => <UsersContainer/>}/>
                        <Route path="/login"
                               render={() => <Login/>}/>
                        <Route path="*" exact
                               render={() => <div><h2>404 NOT FOUND</h2></div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized,
    error: state.app.error,
})

const AppContainer = connect(mapStateToProps, {initializeApp, handleError})(App);

export const MainApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

//TYPES
type MapStateToPropsType = {
    initialized: boolean
    error: string | null
}
type AppPropsType = MapStateToPropsType & {
    initializeApp: () => void
    handleError: (error: string | null) => void
}