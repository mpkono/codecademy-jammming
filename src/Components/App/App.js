import React, { Component } from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'Enter a Song, Album, or Artist',
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  // Add a track to the Playlist
  addTrack(track) {
    let playList = this.state.playlistTracks;
    let newTrack = true;
    playList.forEach(playListTrack => {
      if (track.id === playListTrack.id) {
        newTrack = false;
      }
    });
    if (newTrack) {
      playList.push(track);
      this.setState({
        playlistTracks: playList
      });
    }
  }

  // Remove a track from the Playlist
  removeTrack(track) {
    let playList = this.state.playlistTracks;
    playList.splice(playList.indexOf(track), 1);
    this.setState({
      playlistTracks: playList
    });
  }

  // Change the name of the Playlist
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  // Save the Playlist to Spotify
  savePlaylist() {
    const uriList = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, uriList);
    this.setState({
      playlistTracks: []
    })
  }

  // Search Spotify using the user-entered term
  search(term) {
    Spotify.search(term).then(results => {
      this.setState({
        searchResults: results
      })
    })
  }

  // Update the user-entered search term
  updateSearchTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar onSearch={this.search} onTermChange={this.updateSearchTerm} searchTerm={this.state.searchTerm} />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* Add a Playlist component */}
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
