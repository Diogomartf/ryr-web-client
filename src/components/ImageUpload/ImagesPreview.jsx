import React, { Component } from 'react';
import ImageBox from './ImageBox';
import Image from './Image';
import ImageButtons from './ImageButtons';
import { Column, NoteText, Input } from '../ui';

class ImagesPreview extends Component {
  handleDelete = index => this.props.onDelete(index);

  handleMainPhoto = index => this.props.onChangeMainPhoto(index);

  renderInputDescription = (index, description) => {
    return (
      <NoteText align="center" mt={-1}>
        <Input
          name={[index]}
          type="text"
          placeholder="Add description"
          defaultValue={description}
          onChange={this.props.onChangeDescription}
        />
      </NoteText>
    );
  };

  renderImageBox = (index, image, boolMainPhoto) => {
    return (
      <ImageBox>
        <Image source={image} />
        <ImageButtons
          onDelete={() => {
            this.handleDelete(index);
          }}
          onClick={() => {
            this.handleMainPhoto(index);
          }}
          mainPhoto={boolMainPhoto}
        />
      </ImageBox>
    );
  };

  render() {
    const ImagesBoxs = this.props.images.map((image, index) => {
      const boolMain = index === this.props.mainPhoto;
      return (
        <Column width={this.props.columnWidth} my={3} key={index}>
          {this.renderImageBox(index, image, boolMain)}
          {this.renderInputDescription(index, this.props.descriptions[index])}
        </Column>
      );
    });

    return ImagesBoxs;
  }
}

export default ImagesPreview;
