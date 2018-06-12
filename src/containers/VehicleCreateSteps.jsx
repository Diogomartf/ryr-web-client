import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Page, Row, Button } from '../components/ui';
import BasicInfo from '../components/Vehicle/Post/BasicInfo';
import Description from '../components/Vehicle/Post/Description';
import Photos from '../components/Vehicle/Post/Photos';
import StepsBar from '../components/Vehicle/Post/StepsBar';
import RentalInfo from '../components/Vehicle/Post/RentalInfo';
import PublishVehicle from '../components/Vehicle/Post/PublishVehicle';
import { StickyContainer, Sticky } from 'react-sticky';
import { getVehicleTypes } from '../redux/selectors/vehicle-type-selector';
import { fetchVehicleTypesList } from '../redux/actions/vehicle-type-actions';
import { postVehicle } from '../redux/actions/vehicle-actions';
import { isEmpty } from 'lodash';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

const previousStep = -1;
const nextStep = 1;
let vehicleType;

class VehicleCreateSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0
    };

    this.values = [];
  }

  componentDidMount() {
    if (isEmpty(this.props.vehicleTypes)) {
      this.props.fetchVehicleTypesList();
    }
  }

  renderPage = () => {
    const index = this.state.currentPage;
    const StepComponent = this.steps[index].component;
    const componentProps = this.steps[index].componentProps;

    return (
      <StepComponent
        values={this.values[index]}
        customProps={componentProps}
        onChangeStep={this.changeStep}
        next={nextStep}
        previous={previousStep}
      />
    );
  };

  handleSubmit = () => {
    if (this.props.currentUser) {
      this.values[0].user_id = this.props.currentUser.id;
    }
    this.props.postVehicle(this.values);
    const url = `/users/${this.props.currentUser.id}`;
    this.props.history.push(url);
  };

  updateNodeState = (index, newValues) => {
    const values = this.values;
    values[index] = newValues;
  };

  changeStep = (step, values) => {
    let newStep = this.state.currentPage + step;
    if (newStep < this.steps.length) this.changePage(newStep, values);
  };

  onStepsBarClick = step => {
    if (this.state.currentPage > step) this.changePage(step);
  };

  changePage = (newStep, values) => {
    if (values) this.updateNodeState(this.state.currentPage, values);
    this.setState({ currentPage: newStep });
  };

  displayStepsBar = () => {
    return (
      <Sticky>
        {({ style }) => {
          return (
            <HeaderContainer bg="cardBg" style={style}>
              <StepsBar
                steps={this.steps}
                number={this.state.currentPage}
                onClick={this.onStepsBarClick}
              />
            </HeaderContainer>
          );
        }}
      </Sticky>
    );
  };

  changeButtons = () => {
    if (this.steps.length - this.state.currentPage <= 1) {
      return <Button>Publish!</Button>;
    } else {
      return <Button onClick={this.nextStep}>Next</Button>;
    }
  };

  getVehicleType = type => {
    vehicleType = type;
    return vehicleType;
  };

  render() {
    this.steps = [
      {
        description: 'Vehicle',
        component: BasicInfo,
        componentProps: {
          vehicleTypes: this.props.vehicleTypes,
          onChangeVehicleType: this.getVehicleType
        }
      },
      {
        description: 'Details',
        component: Description,
        componentProps: {
          vehicleType: vehicleType
        }
      },
      { description: 'Photos', component: Photos },
      { description: 'Rental', component: RentalInfo },
      {
        description: 'Publish',
        component: PublishVehicle,
        componentProps: { onSubmit: this.handleSubmit }
      }
    ];
    const showPage = this.renderPage();
    return (
      <div>
        <StickyContainer>
          <Container className={`hidden show-lg show-xl`}>
            {this.displayStepsBar()}
          </Container>
          <div className={`hidden show-xs show-sm show-md`}>{this.displayStepsBar()}</div>
          <Page>
            <Row>
              <Container width={1} mx={0}>
                {showPage}
              </Container>
            </Row>
          </Page>
        </StickyContainer>
      </div>
    );
  }
}

const HeaderContainer = Container.extend`
  z-index: 3;
`;

const mapStateToProps = reduxState => ({
  vehicleTypes: getVehicleTypes(reduxState),
  currentUser: selectCurrentUser(reduxState)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchVehicleTypesList,
      postVehicle
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCreateSteps);
