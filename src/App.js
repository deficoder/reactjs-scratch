import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import FileUpload from './FileUpload'
import VideoDownload from './VideoDownload'

class App extends Component {
  render() {
    return(
      <div className="App">
        <FileUpload />
        <VideoDownload />
      </div>
    );
  }
}

export default hot(module)(App);
