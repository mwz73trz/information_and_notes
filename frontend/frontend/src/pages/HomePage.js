import { Component } from 'react';
import { Link } from 'react-router-dom';
import frontendAPI from '../api/frontendAPI';
import Subject from '../components/Subject';
import UserContext from '../contexts/UserContext';

class HomePage extends Component {
  state = {
    subjects: []
  }

  // helper methods
  getSubjects = async () => {
    try {
      let token = this.context
        ? this.context.token
        : null
      if (token) {
        let subjectData = await frontendAPI.getSubjects(token)
        this.setState({ subjects: subjectData })
      }
    }catch {
    }
  }

  createSubject = async () => {
    let input = document.getElementById("new-subject-name")
    let token = this.context
      ? this.context.token
      : null
    if (input && token) {
      let newSubjectParam = {
        name: input.value,
        user: this.context.user.id
      }
      console.log(newSubjectParam)
      let data = await frontendAPI.createSubject(newSubjectParam, token)
      console.log("new subject", data)
      if (data) {
        let newSubjects = [...this.state.subjects, data]
        this.setState({ subjects: newSubjects })
      }
    }
  }

  deleteSubject = async (subjectId) => {
    try {
      let token = this.context
        ? this.context.token
        : null
      if (subjectId > 0 && token) {
        let result = await frontendAPI.deleteSubject(subjectId, token)
        if (result.success) {
          let newSubjects = this.state.subjects.filter((subject, index) => {
            return subject.id !== subjectId
          })
          this.setState({ subjects: newSubjects })
        }
      }
    }catch {
    }
  }

  // life cycles
  componentDidMount() {
    this.getSubjects()
  }

  //render
  renderWelcome() {
    if (!this.context) {
      return <Link to="/login"><button>Login</button></Link>
    }

    let subjectElements = this.state.subjects.map((subject, index) => {
      return (
        <li key={`subject-${index}`}>
          <Subject subject={subject} />
        </li>
      )
    })

    return (
      <div>
        <h2>Welcome to Your Information and Notes Diary {this.context.user.username}!</h2>
        <h2>Your Subjects:</h2>
        <ul className="simple-list">
          { subjectElements }
        </ul>
        <hr />
        <input id="new-subject-name" placeholder="new subject" />
        <button onClick={this.createSubject}>Create New Subject</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        { this.renderWelcome() }
      </div>
    )
  }
}

HomePage.contextType = UserContext;

export default HomePage;