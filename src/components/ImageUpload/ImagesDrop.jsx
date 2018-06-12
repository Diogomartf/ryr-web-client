import React, { Component } from 'react';
import ImageDropzone from './ImageDropzone';

import { Column, NoteText } from '../ui';

class ImagesDrop extends Component {
  handleDrop = files => this.props.onChange(files);

  showNote = note => {
    return (
      <NoteText align="center" mt={1}>
        {note}
      </NoteText>
    );
  };

  render() {
    const isMultiple = this.props.maxPhotos !== 1;
    const note = this.props.note;
    const textsBox = this.props.texts.map((text, index) => {
      return (
        <Column width={this.props.columnWidth} my={3} key={index}>
          <ImageDropzone
            multiple={isMultiple}
            onChange={this.handleDrop}
            text={text}
            error={this.props.error}
          />
          {note && this.showNote(note)}
        </Column>
      );
    });
    return textsBox;
  }
}

export default ImagesDrop;
