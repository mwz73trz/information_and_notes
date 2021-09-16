import { Component } from 'react';
import { Link } from 'react-router-dom';
import frontendAPI from '../api/frontendAPI';
import UserContext from '../contexts/UserContext';

class SubjectPage extends Component {
  state = {
    subject: null
  }

  // helper methods
  async getSubject() {
    try {
      let subjectId = this.props.match.params.subjectId
      let token = this.context
        ? this.context.token
        : null
      let subjectData = await frontendAPI.getSubjectById(subjectId, token)
      if (subjectData) {
        this.setState({ subject: subjectData })
      }
    }catch (error) {
      console.log(error)
    }
  }

  //life cycle
  componentDidMount() {
    this.getSubject()
  }
  
  //render
  renderTitles() {
    let titleElements = this.state.subject.titles.map((title, index) => {
      return (
        <li key={`subject-${index}`}>
          <Link to={`/subjects/${this.state.subject.id}/titles/${title.id}`}>{title.name}</Link>
        </li>
      )
    })
    console.log(titleElements)
    return (
      <ul className="simple-list">
        { titleElements }
      </ul>
    )
  }

  renderSubject() {
    if (!this.state.subject) {
      return <p>No Subject Found!</p>
    }

    return (
      <div>
        <h1>{this.state.subject.name}</h1>
        <h3>{this.state.subject.user}</h3>
        { this.renderTitles() }
        <hr />
        <input id="new-title-name" placeholder="new title"/>
        <button>Add Title</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Subject Page: { this.props.match.params.subjectId }</h1>
        { this.renderSubject() }
      </div>
    )
  }
}

SubjectPage.contextType = UserContext;

export default SubjectPage;