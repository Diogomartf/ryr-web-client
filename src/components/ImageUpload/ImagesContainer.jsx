import React, { Component } from 'react';
import ImagesPreview from './ImagesPreview';
import ImagesDrop from './ImagesDrop';
import { Row } from '../ui';

class ImagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.photos.files || [],
      imagesPreview: props.photos.imagesPreview || [],
      descriptions: props.photos.descriptions || [],
      mainPhoto: props.photos.mainPhoto || 0
    };
  }

  componentDidMount = () => {
    this.props.onRef(this);
  };
  componentWillUnmount = () => {
    this.props.onRef(undefined);
  };

  handleSubmit = () => {
    return this.state;
  };

  changeMainPhoto = index => {
    this.setState({ mainPhoto: index });
  };

  newLength = newFiles => {
    const num = this.props.maxPhotos;
    const currentLength = Math.abs(this.state.files.length - num);
    return currentLength;
  };

  handleImageDrop = files => {
    const numPhotos = this.newLength(files);
    for (let i = 0; i < numPhotos; i++) {
      let reader = new FileReader();
      let file = files[i];

      if (file) {
        reader.onloadend = () => {
          var data = reader.result;
          this.addFileToState(file, data);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  handleDelete = delIndex => {
    this.setState({
      files: this.state.files.filter((file, index) => index !== delIndex),
      imagesPreview: this.state.imagesPreview.filter((image, index) => index !== delIndex)
    });
  };

  handleDescriptions = event => {
    const descriptions = this.state.descriptions;
    descriptions[event.target.name] = event.target.value;
    this.setState({ descriptions: descriptions });
  };

  addFileToState = (file, url) => {
    this.setState({
      files: [...this.state.files, file],
      imagesPreview: [...this.state.imagesPreview, url]
    });
  };

  renderBoxTexts = (texts, note) => {
    const error = this.state.files.length ? '' : this.props.error;
    return (
      <ImagesDrop
        texts={texts}
        maxPhotos={this.props.maxPhotos}
        columnWidth={this.props.columnWidth}
        onChange={this.handleImageDrop}
        note={note}
        error={error}
      />
    );
  };

  render() {
    const filesLength = this.state.files.length;
    const maxPhotos = this.props.maxPhotos;
    const defaultText = 'Drag and Drop';
    return (
      <Row py={3}>
        <ImagesPreview
          images={this.state.imagesPreview}
          descriptions={this.state.descriptions}
          mainPhoto={this.state.mainPhoto}
          columnWidth={this.props.columnWidth}
          onDelete={this.handleDelete}
          onChangeMainPhoto={this.changeMainPhoto}
          onChangeDescription={this.handleDescriptions}
        />
        {!filesLength && this.renderBoxTexts(this.props.texts)}
        {filesLength < maxPhotos && this.renderBoxTexts([defaultText], this.props.note)}
      </Row>
    );
  }
}

export default ImagesContainer;
