import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';

import {
  MediumText,
  Row,
  Container,
  Section,
  Button,
  Divider,
  Title,
  SmallText,
  Card,
  Column
} from './ui';

import DatePicker from './DatePicker';
import Bill from './Bill';

export const buildCheckoutQuery = params =>
  '/checkout' +
  '?' +
  queryString.stringify({
    ...params,
    from: params.from ? new Date(params.from * 1).getTime() : undefined,
    to: params.to ? new Date(params.to * 1).getTime() : undefined
  });

class RentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: props.currentRental.from,
      to: props.currentRental.to
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onFromChange = from => {
    this.setState({ from });
    if (!this.props.to) {
      this.focusTo();
    }
  };

  onToChange = to => {
    this.setState({ to });
  };

  focusTo() {
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }

  datesAreSet = () => this.state.from && this.state.to;

  renderBill() {
    const basePrice = this.props.vehicle.base_price;
    const { from, to } = this.state;
    if (this.datesAreSet()) {
      return (
        <Section>
          <Bill price={basePrice} to={to} from={from} />
        </Section>
      );
    }
  }

  renderButton = () => {
    if (this.datesAreSet()) {
      return (
        <Section>
          <Button onClick={this.handleSubmit}>Rent Now</Button>

          <SmallText pt={1} align="center">
            You won't be charged yet!
          </SmallText>
        </Section>
      );
    }
  };

  handleSubmit = () => {
    const { from, to } = this.state;

    const { history, createRental, vehicle, currentUser } = this.props;

    history.push(
      buildCheckoutQuery({
        from: from,
        to: to,
        vehicle: vehicle.id
      })
    );
    createRental(from, to, vehicle, currentUser);
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const fromOrToday = from ? from : new Date();

    return (
      <Card>
        <Container mx={3} py={3}>
          <Section>
            <Row justifyContent={'center'} alignItems={'baseline'} pb={3}>
              <Title>{this.props.vehicle.base_price}€</Title>
              <SmallText px={1}>per day</SmallText>
            </Row>
            <Divider />
          </Section>
          <Section>
            <Row alignItems="center" py={1}>
              <Column w={[0.15, 0.15, 0.25]}>
                <MediumText textAlign="right" fontWeight="bold">
                  From
                </MediumText>
              </Column>
              <Column w={[0.85, 0.85, 0.75]}>
                <Card>
                  <DatePicker
                    dayPickerRef={element => (this.to = element)}
                    value={from}
                    placeholder="From"
                    dayPickerProps={{
                      selectedDays: [from, { from, to }],
                      disabledDays: { before: new Date(), after: to },
                      toMonth: to,
                      modifiers
                    }}
                    onChange={this.onFromChange}
                  />
                </Card>
              </Column>
            </Row>

            <Row alignItems="center" py={1}>
              <Column w={[0.15, 0.15, 0.25]}>
                <MediumText textAlign="right" fontWeight="bold">
                  To
                </MediumText>
              </Column>
              <Column w={[0.85, 0.85, 0.75]}>
                <Card>
                  <DatePicker
                    dayPickerRef={element => (this.to = element)}
                    value={to}
                    placeholder="To"
                    dayPickerProps={{
                      selectedDays: [from, { from, to }],
                      disabledDays: { before: fromOrToday },
                      month: from,
                      fromMonth: from,
                      modifiers
                    }}
                    onChange={this.onToChange}
                  />
                </Card>
              </Column>
            </Row>
          </Section>

          {this.renderBill()}

          {this.renderButton()}
        </Container>
      </Card>
    );
  }
}

export default withRouter(RentCard);
