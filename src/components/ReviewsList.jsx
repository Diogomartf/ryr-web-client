import React, { Component } from 'react';
import { SectionTitle, Text } from './ui/Typography';
import Review from './Review';

class ReviewsList extends Component {
  displayReviews = reviews => {
    if (reviews.length > 0) {
      return (
        <div>
          {this.props.reviews.map(review => {
            return <Review key={review.id} review={review} />;
          })}
        </div>
      );
    } else {
      return <Text> Doesn't have reviews yet! </Text>;
    }
  };

  render() {
    return (
      <div>
        <SectionTitle>Reviews</SectionTitle>
        {this.displayReviews(this.props.reviews)}
      </div>
    );
  }
}

export default ReviewsList;
