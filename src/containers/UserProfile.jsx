import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserProfileSidebar from '../components/UserProfileSidebar';
import UserProfileBody from '../components/UserProfileBody';
import Row from '../components/ui/Row';
import Loading from '../components/ui/Loading';
import Page, { Sidebar, Body } from '../components/ui/Page';

import { MediumText, Link } from '../components/ui';
import { Link as RouterLink } from 'react-router-dom';

import { fetchUserById } from '../redux/actions/user-actions';
import { getUserById } from '../redux/selectors/user-selectors';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

import { reviews } from '../api/fake-data';
import { verifications } from '../api/fake-data';

class UserProfile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchUserById(this.props.match.params.id);
  }

  render() {
    if (!this.props.user) return <Loading />;
    const user = this.props.user;
    user.reviews = reviews;
    user.image_path = user.image_path
      ? user.image_path
      : 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';
    const currentId = this.props.currentUser ? this.props.currentUser.id : 0;
    return (
      <Page>
        <Row>
          <Sidebar width="240px">
            <UserProfileSidebar user={user} verifications={verifications} />
            {user.id === currentId && (
              <MediumText align="center" py={0}>
                <Link secondary="true" is={RouterLink} to={`/users/edit`}>
                  Edit Profile
                </Link>
              </MediumText>
            )}
          </Sidebar>
          <Body>
            <UserProfileBody user={user} vehicles={user.vehicle_ids} />
          </Body>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = (reduxState, props) => ({
  user: getUserById(reduxState, props.match.params),
  currentUser: selectCurrentUser(reduxState),
  loading: reduxState.users.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserById
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
