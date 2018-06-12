import React, { Component } from 'react';
import styled from 'styled-components';
import { Image as rebassImage } from 'rebass';

class ImageButtons extends Component {
  handleDelete = () => this.props.onDelete();

  handleChangeMain = () => this.props.onClick();

  buttonImage = isMainPhoto => {
    return isMainPhoto
      ? 'https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/bookmark2-2-256.png'
      : 'https://cdn3.iconfinder.com/data/icons/social-productivity-line-art-1/128/bookmark2-2-256.png';
  };

  renderButtons = isMainPhoto => {
    const coverImageButton = this.buttonImage(isMainPhoto);
    const deleteImageButton = 'http://cdn.onlinewebfonts.com/svg/img_422287.png';

    const topRight = {
      top: '3px',
      right: '3px'
    };
    const bottomLeft = {
      bottom: '3px',
      left: '0px'
    };

    return (
      <div>
        {Button(coverImageButton, bottomLeft, 30, this.handleChangeMain)}
        {Button(deleteImageButton, topRight, 16, this.handleDelete)}
      </div>
    );
  };

  render() {
    const isMainPhoto = this.props.mainPhoto;

    return this.renderButtons(isMainPhoto);
  }
}

const Button = (src, style, size, funct) => {
  return <ImageButton src={src} style={style} width={size} onClick={funct} />;
};

const ImageButton = styled(rebassImage)`
  position: absolute;
  cursor: pointer;
`;

export default ImageButtons;
