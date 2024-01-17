import React, { Component, useState } from 'react';
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList';

export class Home extends Component {
  static displayName = Home.name;

  constructor (props) {
    super(props);

    this.state = {
     results:[]
    }

    this.setState = this.setState.bind(this)
  }

  render() {
    return (
      <div className="App">
        <div className="search-bar-container">
          <div className='title'>Find a Movie</div>
          <SearchBar setResults={this.setState}/>
          <SearchResultsList results={this.state.results}  />
        </div>
      </div> 
    );
  }
}
