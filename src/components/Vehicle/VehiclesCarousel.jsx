import React, { Component } from 'react';
import VehicleCard from './VehicleCard';
import { Button } from '../ui/Buttons';
import { Row } from '../ui/Row';
import { Column } from '../ui/Column';

class VehiclesCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.goToNextSlide = this.goToNextSlide.bind(this);
  }

  setIndex(value) {
    this.setState({ index: value });
  }

  goToNextSlide = () => {
    let newIndex = this.state.index + 1;
    if (this.state.index === this.props.vehicles.length - 1) {
      newIndex = 0;
    }
    this.setIndex(newIndex);
  };

  cardRender = id => {
    return (
      <VehicleCard
        sizeLeft={[1]}
        sizeRight={[1]}
        sizeInfoTop={[4 / 5]}
        sizeInfoBottom={[1 / 5]}
        key={id}
        id={id}
      />
    );
  };

  boxRender = (v_ids, number) => {
    const size = 9 / number / 11;
    let showCards = [];
    for (let i = 0; i < number; i++) {
      let vehicle = v_ids[(i + this.state.index) % v_ids.length];
      showCards.push(
        <Column width={size} key={i}>
          {this.cardRender(vehicle)}
        </Column>
      );
    }
    return showCards;
  };

  render() {
    const v_ids = this.props.vehicles;
    return (
      <div>
        <Row alignItems="center">
          {this.boxRender(v_ids, this.props.number)}
          <Column size={1 / 11}>
            <Button onClick={this.goToNextSlide}>></Button>
          </Column>
        </Row>
      </div>
    );
  }
}

export default VehiclesCarousel;
