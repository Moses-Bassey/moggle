import React, { Component, useState } from 'react';
import './SearchResult.css';
import { Link } from 'react-router-dom';

export class SearchResults extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    render() {
        const { result } = this.props;
        return (
            <div className='search-result'>
                <img style={{height: '20px'}} src={ result?.poster === 'N/A' ? 'https://i.ibb.co/Lv9gYz3/Screenshot-2024-01-17-at-7-20-25-AM.png' : result?.poster} alt={result?.title}></img>&nbsp;&nbsp;<Link to={`/movie/?title=${result.imdbID}`}>{result.title}</Link>
            </div>
        );
    }
}
