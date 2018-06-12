import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { BackgroundImage, Image, Box } from 'rebass';
import { Text } from './ui/Typography';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreview: '',
      error: false
    };
  }

  uploadImage = image => {
    //call to API
  };

  onImageDrop = files => {
    for (let i = 0; i <= files.length; i++) {
      let reader = new FileReader();
      let file = files[i];

      if (file) {
        reader.onloadend = () => {
          var data = reader.result;
          this.uploadImage(data);
          this.changeState(file, data, false);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  changeState = (file, url, error) => {
    this.setState({
      file: file,
      imagePreview: url,
      error: error
    });
  };

  invalid = () => !this.state.file || this.state.error;

  renderText = () => {
    return (
      <Text>
        <u>Drag or click to upload {this.props.multiple && 'multiple files'}</u>
      </Text>
    );
  };

  render() {
    const dropzone = {
      border: '2px',
      borderStyle: this.state.imagePreview ? 'none' : 'dashed',
      borderColor: '#666',
      borderRadius: '3px',
      alignItems: 'center',
      display: 'flex'
    };
    return (
      <Dropzone
        accept="image/*"
        style={dropzone}
        activeStyle={active}
        rejectStyle={reject}
        disabledStyle={disabledStyle}
        disabled={this.props.disabled ? true : false}
        multiple={this.props.multiple}
        onDrop={this.onImageDrop.bind(this)}
      >
        {this.invalid() && (
          <Box my={0} mx={'auto'} p={5}>
            <Image
              my={0}
              mx={'auto'}
              src="http://iconshow.me/media/images/ui/ios7-icons/png/256/plus-empty.png"
              width={64}
            />
            {this.renderText()}
          </Box>
        )}
        <BackgroundImage backgroundSize="100% 100%" src={this.state.imagePreview} />
      </Dropzone>
    );
  }
}

const active = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const reject = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};
const disabledStyle = {
  opacity: 0.5
};

export default ImageUpload;
