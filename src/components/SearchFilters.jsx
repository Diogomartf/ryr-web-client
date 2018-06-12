import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getVehicleTypeFeatures } from '../redux/selectors/vehicle-type-selector';

import { Card } from './ui/Cards';
import { Divider } from './ui/Dividers';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { RangeFilter, ListFilter } from './Filters';

export class SearchFilters extends Component {
  onPriceRangeChange = priceRange => this.props.onChange({ priceRange });
  onMileageRangeChange = mileageRange => this.props.onChange({ mileageRange });
  onFeatureListChange = items => this.props.onChange({ items });

  buildCheckedFeatureList = () =>
    this.props.vehicleTypeFeatures.map(f => ({
      value: f.pivot.id,
      label: f.name,
      checked: this.props.checkItems.indexOf(f.pivot.id) !== -1
    }));

  renderCheckedFeatureList = list =>
    list.length ? (
      <div>
        <Divider />
        <Section>
          <ListFilter
            name="Features"
            onChange={this.onFeatureListChange}
            units="€"
            list={list}
          />
        </Section>
      </div>
    ) : null;

  render() {
    return (
      <Card border={0} bg="cardBg">
        <Container>
          <Section>
            <RangeFilter
              name="Price"
              units="€"
              min={10}
              max={350}
              defaultValue={this.props.priceRange}
              onChange={this.onPriceRangeChange}
            />
          </Section>

          <Divider />

          <Section>
            <RangeFilter
              defaultValue={this.props.mileageRange}
              onChange={this.onMileageRangeChange}
              min={0}
              max={100}
              name="Kilometers"
              units="kms"
            />
          </Section>

          {this.renderCheckedFeatureList(this.buildCheckedFeatureList())}
        </Container>
      </Card>
    );
  }
}

const mapStateToProps = (reduxState, props) => ({
  vehicleTypeFeatures: getVehicleTypeFeatures(reduxState, { id: props.vehicleTypeId })
});

export default connect(mapStateToProps)(SearchFilters);
