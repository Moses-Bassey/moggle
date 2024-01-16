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
                <Link to={`/movie/?title=${result.imdbID}`}>{result.title}</Link>
            </div>
        );
    }
}
