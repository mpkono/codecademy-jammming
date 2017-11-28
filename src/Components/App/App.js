import React, { Component } from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
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
      ],
      playlistName: 'Jammmers',
      playlistTracks: [
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
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* Add a Playlist component */}
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
