import { Component } from 'react';
import frontendAPI from '../api/frontendAPI';
import UserContext from '../contexts/UserContext';

class TitlePage extends Component {
  state = {
    title: null
  }

  // helper methods
  async getTitle() {
    try {
      let titleId = this.props.match.params.titleId
      let token = this.context
        ? this.context.token
        : null
      let titleData = await frontendAPI.getTitle(titleId, token)
      if (titleData) {
        this.setState({ title: titleData })
      }
    }catch (error) {
      console.log(error)
    }
  }

  // life cycles
  componentDidMount() {
    this.getTitle()
  }

  // render
  renderTitle() {
    if (!this.state.title) {
      return <p>No Title Found!</p>
    }
    return (
      <div>
        <h1>Name: {this.state.title.name}</h1>
        <h3>Description: {this.state.title.description}</h3>
        <h3>Link: {this.state.title.link}</h3>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Title Page: { this.props.match.params.titleId }</h1>
        { this.renderTitle() }
      </div>
    )
  }
}

TitlePage.contextType = UserContext;

export default TitlePage;