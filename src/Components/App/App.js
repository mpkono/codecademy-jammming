import React, { Component } from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import Spotify from '../../util/Spotify';


/*
Sample Search Results Info
[
  {
    name: 'Hot Dog',
    artist: 'Majestic Rock Force',
    album: 'Shields'
  },
  {
    name: 'Welding My Superstructure',
    artist: 'Yellow Phase',
    album: 'Out of Town'
  },
  {
    name: 'Shelby',
    artist: 'My Moldy Breads',
    album: 'Vanilla Vinalla'
  }
]


Sample Playlist Info
[
  {
    name: 'Four Angry Cats',
    artist: 'Size Seven',
    album: 'Shanties'
  },
  {
    name: 'Yowza',
    artist: 'Steps Ahead',
    album: 'Singularity'
  },
  {
    name: 'Church Time',
    artist: 'Yesterday Shoes',
    album: 'Ugly Parking Lot'
  }
]
*/


//let trackURIs = trackList.map(track => track.uri);

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

  addTrack(track) {
    let playList = this.state.playlistTracks;
    console.log(playList);
    playList.push(track);
    this.setState({
      playlistTracks: playList
    });
  }

  removeTrack(track) {
    let playList = this.state.playlistTracks;
    console.log(playList);
    playList.splice(playList.indexOf(track), 1);
    this.setState({
      playlistTracks: playList
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
    this.setState({
      playlistTracks: []
    })
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(results => {
      this.setState({
        searchResults: results
      })
    })
  }

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
