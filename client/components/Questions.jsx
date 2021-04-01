import React from 'react';
import axios from 'axios';
import MediaCard from './MediaCard';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      inputSearch: '',
      inputResult: [],
      resultRecommendation: [],
      type: '',
      loading: false,
    };
    this.updateValue = this.updateValue.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateMediaType = this.updateMediaType.bind(this);
  }

  updateValue(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value })
  }

  updateMediaType(type) {
    this.setState({ 'type': type })
  }

  submitAnswer(e) {
    e.preventDefault();
    this.setState({ 'loading': true });
    axios.get('/similar', {
      params: {
        q: this.state.inputSearch,
        type: this.state.type
      }
    })
      .then((r) => {
        let newCurrent = {...this.state.current};
          newCurrent[r.data.Similar.Info[0].Name] = true;
        this.setState({
          'current': newCurrent,
          'resultRecommendation': r.data.Similar.Results,
          'inputResult': r.data.Similar.Info,
          'loading': false,

        })
      })
  }

  render() {
    let entered = MediaCard(this.state.inputResult);
    let suggestions = this.state.resultRecommendation.map((rec) => {
      return MediaCard(rec);
    })

    return (
      <div>
        {this.state.type !== '' ? (
          <form onSubmit={this.submitAnswer} className="progression">
            <label htmlFor="inputSearch"><h3>Add {this.state.type} you enjoy:</h3></label>
            <br />
            <input type="text" name="inputSearch" onChange={this.updateValue} className="inputMovie"></input>
            <button type="submit">Blast off!</button>
            <br />
            {this.state.inputResult[0] ? (<div><h3>You liked: </h3><div>{Object.keys(this.state.current).map((media) => (<div className="liked" key={media}>{media}</div>
            ))}</div></div>) : null}
            {this.state.inputResult[0] ? (<h3>So we found these options:</h3>) : null}
            {this.state.loading ? (<img src="./loading.jpeg" width="42" height="42" />) : null}
          </form>
        ) : (<div className="progression"><h2>What kind of media are you looking for?</h2><div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType('band') }}>Music</div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType("movie") }}>Movies</div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType("show") }}>TV Shows</div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType("book") }}>Books</div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType("game") }}>Games</div>
          <div className="mediaOption" onClick={(e) => { this.updateMediaType("podcast") }}>Podcasts</div>
        </div>
        </div>)}
        <div key="entered">{entered}</div>
        <div key="suggestions" className="suggestions">{suggestions}</div>
      </div >
    );
  }
}

export default Questions;