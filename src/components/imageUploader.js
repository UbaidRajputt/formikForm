import React from "react";
import ImageUploader from "react-images-upload";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }
  onDrop = picture => {
    this.setState({
      pictures: picture
    });
  };
  render() {
    return (
      <div>
        <ImageUploader
          buttonText="Choose Image"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
        />
      </div>
    );
  }
}
export default Image;
