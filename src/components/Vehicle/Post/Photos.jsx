import React, { Component } from 'react';
import ImagesContainer from '../../ImageUpload/ImagesContainer';
import { Title, Section, Text, Row, Column, Button } from '../../ui';

class Photos extends Component {
  constructor(props) {
    super(props);
    const data = props.values;

    this.state = {
      ref: '',
      error: false
    };

    this.photos = data ? data.photos : {};
  }

  handleSubmit = step => {
    this.photos = { photos: this.state.ref.handleSubmit() };
    if (this.photos.photos.files.length || step < 0)
      this.props.onChangeStep(step, this.photos);
    else this.setState({ error: true });
  };

  render() {
    const photos = this.photos;
    return (
      <div>
        <Title fontWeight={'normal'}>Add Photos</Title>
        <Text>
          It’s important for travelers to see your car before the request it. Once you
          have a good photo that shows the whole car, add more photos displaying the car’s
          details and interior.
        </Text>
        <Section>
          <ImagesContainer
            columnWidth={[1, 1 / 3]}
            maxPhotos={6}
            texts={['Vehicle front view', 'Vehicle back view']}
            note={'Photos must be 600 by 320 px'}
            heightDrop={'180px'}
            photos={photos}
            onRef={ref => this.setState({ ref: ref })}
            error={this.state.error}
          />
        </Section>
        <Row width={[1, 2 / 3, 3 / 4, 1 / 3]} my={2}>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.previous)}>Back</Button>
          </Column>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.next)}>Next</Button>
          </Column>
        </Row>
      </div>
    );
  }
}

export default Photos;
