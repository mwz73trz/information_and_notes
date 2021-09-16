import { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import SubjectPage from './pages/SubjectPage';
import LoginPage from './pages/LoginPage'
import TitlePage from './pages/TitlePage';
import UserContext from './contexts/UserContext';

class App extends Component {
  state = {
    user: null
  }

  // helper
  updateUser = (newUserData) => {
    console.log(newUserData)
    this.setState({ user: newUserData })
  }

  // render
  renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={this.updateUser} />
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={this.state.user}>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact render={this.renderLoginPage} />
              <Route path="/subjects/:subjectId" exact component={SubjectPage} />
              <Route path="/subjects/:subjectId/titles/:titleId" exact component={TitlePage} />
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
