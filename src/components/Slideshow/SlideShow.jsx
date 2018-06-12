import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { SliderArrowLeft, SliderArrowRight } from './SlideArrow';

class SlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  setIndex(value) {
    this.setState({ index: value });
  }

  goToPreviousSlide = () => {
    let newIndex = this.state.index - 1;
    if (this.state.index === 0) {
      newIndex = this.props.images.length - 1;
    }
    this.setIndex(newIndex);
  };

  goToNextSlide = () => {
    let newIndex = this.state.index + 1;
    if (this.state.index === this.props.images.length - 1) {
      newIndex = 0;
    }
    this.setIndex(newIndex);
  };

  render() {
    const { index } = this.state;
    const { images, id } = this.props;
    return (
      <Slider>
        <RouterLink to={`/vehicles/${id}`}>
          <SliderWrapper>
            {images[index] ? (
              <Slide key={images[index].id} image={images[index].image_url} />
            ) : null}
          </SliderWrapper>
        </RouterLink>
        <SliderArrows className="displayArrows">
          <SliderArrowLeft prevSlide={this.goToPreviousSlide} />
          <SliderArrowRight nextSlide={this.goToNextSlide} />
        </SliderArrows>
      </Slider>
    );
  }
}

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  margin: 0 auto;

  overflow: hidden;
  white-space: nowrap;

  &:hover .displayArrows {
    display: block;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SliderArrows = styled.div`
  display: none;
`;

const Slide = styled.div`
  height: 100%;
  min-height: 180px;

  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 60%;
`;

export default SlideShow;
