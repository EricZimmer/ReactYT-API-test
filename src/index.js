import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDbqNhMk_UJZq9DdrqVgkAYBEzP4z6oyvQ';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null 
    };

    this.videoLoad('Buffalo Sabres');
  }
  videoLoad(term) { 
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({ 
        videos: videos
        
      });
    });
  }

  render() {
    const videoSearchLimit = _.debounce( term => {
      this.videoSearch(term)
    }, 300);

    return ( 
      <div>
        <SearchBar onSearchTermChange={ videoSearchLimit } />
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList 
            onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));