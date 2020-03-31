import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

const config = {
  apiKey: "AIzaSyCTLG6W6OYgabIVuV_RHuZn2EYo1Pvl2FI",
  authDomain: "pasteles-app.firebaseapp.com",
  databaseURL: "https://pasteles-app.firebaseio.com",
  projectId: "pasteles-app",
  storageBucket: "pasteles-app.appspot.com",
  messagingSenderId: "480513943003",
  appId: "1:480513943003:web:b78d5ac265557cec1573fe"
};
//firebase.initializeApp(config);

class ProfilePage extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event => this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} width="200" />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

export default ProfilePage;
