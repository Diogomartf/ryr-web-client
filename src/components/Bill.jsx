import React, { Component } from 'react';
import moment from 'moment';
import { MediumText, Divider, Row, Column } from '../components/ui';

const paymentInfo = (price, from, to) => {
  const numberOfDays = moment.duration(moment(to).diff(from)).asDays() + 1;

  const totalPrice = Number(price * numberOfDays, 2);
  const ryrFee = (Math.round(totalPrice * 0.1 * 100) / 100).toFixed(2);
  return [
    {
      id: 1,
      description: `${price}€ x ${numberOfDays} days`,
      price: totalPrice
    },
    { id: 2, description: 'Rental fee', price: ryrFee },
    { id: 3, description: 'Insurance', price: 25 }
  ];
};

class Bill extends Component {
  billRow = (description, price) => {
    return (
      <Row>
        <Column>
          <MediumText>{description}</MediumText>
        </Column>

        <Column>
          <MediumText textAlign="right">{price} €</MediumText>
        </Column>
      </Row>
    );
  };

  insertDivider = (index, id) => {
    if (index > 0) {
      return <Divider key={id} my={2} />;
    }
  };

  render() {
    let total = Number(0);
    const { price, from, to } = this.props;
    return (
      <div>
        {paymentInfo(price, from, to).map((paymentItem, index) => {
          total += Number(paymentItem.price);
          return (
            <div key={paymentItem.id}>
              {this.insertDivider(index, paymentItem.id)}
              {this.billRow(paymentItem.description, paymentItem.price)}
            </div>
          );
        })}
        <Divider my={2} />
        <MediumText fontWeight="bold">
          {this.billRow('Total', Number(total).toFixed(2))}
        </MediumText>
      </div>
    );
  }
}

export default Bill;
