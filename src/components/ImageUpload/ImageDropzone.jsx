import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Image, Box } from 'rebass';
import { Text } from '../ui';
import theme from '../../styles/theme';

class ImageDropzone extends Component {
  onImageDrop = files => this.props.onChange(files);

  renderText = () => (this.props.text ? this.props.text : '');

  renderIcon = middleText => {
    return (
      <Box my={0} mx={'auto'}>
        <Image
          my={0}
          mx={'auto'}
          src="http://iconshow.me/media/images/ui/ios7-icons/png/256/plus-empty.png"
          width={64}
        />
        <Text align="center">
          <u>{middleText}</u>
        </Text>
      </Box>
    );
  };

  render() {
    const middleText = this.renderText();
    const dropzone = {
      borderWidth: '2px',
      borderColor: this.props.error ? theme.colors.red : '#666',
      borderStyle: 'dashed',
      borderRadius: theme.elements.borderRadius,
      alignItems: 'center',
      display: 'flex',
      minHeight: '180px',
      position: 'relative'
    };
    return (
      <Dropzone
        accept="image/*"
        style={dropzone}
        activeStyle={active}
        rejectStyle={reject}
        disabledStyle={disabled}
        multiple={this.props.multiple}
        onDrop={this.onImageDrop}
      >
        {this.renderIcon(middleText)}
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

const disabled = { opacity: 0.6 };

export default ImageDropzone;
