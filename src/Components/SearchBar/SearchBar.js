import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.props.searchTerm);
  }

  handleTermChange(event) {
    this.props.onTermChange(event.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder={this.props.searchTerm} onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
