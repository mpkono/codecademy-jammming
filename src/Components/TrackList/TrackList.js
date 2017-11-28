import React from 'react';
import Track from '../../Components/Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
          {/* You will add a map method that renders a set of Track components */}
          {this.props.tracks.map((track, i) => {
            return <Track track={track} key={i} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />
          })}
      </div>
    );
  }
}

export default TrackList;
