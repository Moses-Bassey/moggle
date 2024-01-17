import React, { Component, useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'

export class SearchBar extends Component {

    constructor(props) {
        super(props);
        // this.props.setResults
        this.state = { input: '' };
    }
    
    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
        this.fetchData(e.target.value);
    };

    fetchData = async (text) => {
        fetch(`weatherforecast?title=${text}&pageNum=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            this.props.setResults({ results: data ?? [] })
        })
        .catch(error => {
            this.props.setError({ error: 'An error occured!' })
        });
    }

    render() {
        return (
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                placeholder='Type to search...'
                value={this.state.input}
                onChange={this.handleInputChange}
                />
            </div>
        );
    }
}
