import React, { Component, useState } from 'react';
import './SearchResultList.css';
import { SearchResults } from './SearchResult';

export class SearchResultsList extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    render() {
        const { results, error } = this.props;
        return (
            <div className="results-list">
               {
                // eslint-disable-next-line no-undef
                results.map(result  => {
                    return <SearchResults key={result.imdbID} result={result}/>
                }) 
               }
            </div>
        );
    }
}
