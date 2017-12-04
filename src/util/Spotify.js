import {spotifyAuth} from './SpotifyAuth';

const callbackUri = 'https://mkjammmingz.surge.sh';
//const callbackUri = 'http://localhost:3000/';

const scopes = 'playlist-modify-public%20playlist-modify-private';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      let accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${spotifyAuth.clientId}&response_type=token&redirect_uri=${callbackUri}&scope=${scopes}`;
    }
  },

  search(searchTerm) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.tracks.items.map(track => ({ id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri }));
    });
  },

  savePlaylist(name, uriList) {
    console.log("Name = " + name);
    console.log("uriList = " + uriList);
    if ((name === '') || (uriList.length < 1)) {
      console.log("Invalid.");
      return;
    }
    accessToken = Spotify.getAccessToken();
    let userUrl = 'https://api.spotify.com/v1/me'
    const headerData = {Authorization: `Bearer ${accessToken}`};
    let userId = '';
    return fetch(userUrl, {headers: headerData}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userId = jsonResponse.id;
      let createPlaylistUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
      let bodyData = JSON.stringify({
        name: name,
      });
      fetch(createPlaylistUrl, {method: 'POST', headers: headerData, body: bodyData}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        let playlistId = jsonResponse.id;
        let savePlaylistUrl = createPlaylistUrl + '/' + playlistId + '/tracks';
        bodyData = JSON.stringify({
          uris: uriList
        });
        fetch(savePlaylistUrl, {method: 'POST', headers: headerData, body: bodyData}).then(response => {
          return response.json();
        }).then(console.log('Playlist Saved.'));
      });
    });
  }
}

export default Spotify;
