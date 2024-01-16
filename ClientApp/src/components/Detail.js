
import React, { Component, useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';

export class Detail extends Component {
  static displayName = Detail.name;

  constructor(props) {
    super(props);

    this.state = {
      result: [],
      loading: true,
      notFound: false, // Added notFound state
    };

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const imdbID = window.location.search.split('=')[1];

    fetch(`weatherforecast/${imdbID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.title)
        if (data.length === 0 || data.title === null) {
          // Check if the result array is empty
          this.setState({ notFound: true, loading: false });
        } else {
          this.setState({ result: data, loading: false, notFound: false });
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { result, loading, notFound } = this.state;

    return (
      <div className="App">
        <div className="detail-container">
          {loading ? (
            <div>Loading...</div>
          ) : notFound ? (
            <div className='title'>Movie not Found!</div>
          ) : (
            <>
              <div className='title'>{result?.title}</div>
              <br />
              <img src={result?.poster} alt={result?.title}></img>
              <br />

              <div className='subtitle'>Description</div>
              <div>{result?.plot}</div>

              <div className='subtitle'>released</div>
              <div>{result?.released}</div>

              <div className='subtitle'>Genre</div>
              <div>{result?.genre}</div>

              <div className='subtitle'>Writer</div>
              <div>{result?.writer}</div>

              <div className='subtitle'>Year</div>
              <div>{result?.year}</div>

              <div className='subtitle'>country</div>
              <div>{result?.country}</div>

              <div className='subtitle'>language</div>
              <div>{result?.language}</div>

              <div className='subtitle'>IMDB Rating</div>
              <div>{result?.imdbRating}</div>

              <div className='subtitle'>IMDB Votes</div>
              <div>{result?.imdbVotes}</div>

              <div style={{ paddingBottom: '200px' }}></div>
            </>
          )}
        </div>
      </div>
    );
  }
}
