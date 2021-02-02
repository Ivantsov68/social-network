import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './common/loading/Preloader';

const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => {
            return <React.Suspense fallback={<div>Loading...</div>}>
                <DialogsContainer />
            </React.Suspense>
          }}/>

          <Route path='/profile/:userId?' render={() => {
            return <React.Suspense fallback={<div>Loading...</div>}>
                <ProfileContainer />
            </React.Suspense>
          }}/>

          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <LoginPage />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose (
  withRouter,
  connect( mapStateToProps, { initializeApp }))(App);


