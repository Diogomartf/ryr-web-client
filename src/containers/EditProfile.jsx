import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

import Page, { Sidebar, Body } from '../components/ui/Page';
import Row from '../components/ui/Row';
import Section from '../components/ui/Section';
import { Title, MediumText } from '../components/ui/Typography';
import Link from '../components/ui/Link';
import { Card } from '../components/ui/Cards';
import EditUserProfile from '../components/EditUserProfile';
import { BackgroundImage } from 'rebass';
import Loading from '../components/ui/Loading';

import { editUser } from '../redux/actions/user-actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreview: '',
      image_path: this.props.currentUser ? this.props.currentUser.image_path : ''
    };
  }

  onSubmit = data => {
    if (this.state.image_path) data.image_path = this.state.image_path;
    this.props.editUser(this.props.currentUser.id, data);
    this.props.history.push(`/users/${this.props.currentUser.id}`);
  };

  handleClick = () => {
    this.refs.fileUploader.click();
  };

  handleFile = e => {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    let reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        var data = reader.result;
        this.setState({ imagePreview: data });
      };
      reader.readAsDataURL(file);
      /*
      it needs to be implemented in back-end to upload a new image
      this.setState({ image_path: file });
      */
    }
  };

  render() {
    if (!this.props.currentUser) return <Loading />;
    const user = this.props.currentUser;
    const image = this.state.imagePreview
      ? this.state.imagePreview
      : user.image_path
        ? user.image_path
        : 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';
    return (
      <Page>
        <Title>Public Profile</Title>
        <Row>
          <Sidebar width="240px">
            <Section height="240px">
              <Card border="none" py={3}>
                <BackgroundImage src={image} />
              </Card>
              <MediumText align="center" py={2}>
                <Link secondary="true" onClick={this.handleClick}>
                  Change Photo
                  <input
                    accept="image/*"
                    type="file"
                    name="image_path"
                    id="image_path"
                    multiple={false}
                    ref="fileUploader"
                    style={{ display: 'none' }}
                    onChange={this.handleFile.bind(this)}
                  />
                </Link>
              </MediumText>
            </Section>
          </Sidebar>

          <Body>
            <EditUserProfile user={user} onSubmit={this.onSubmit} />
          </Body>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = reduxState => ({
  currentUser: selectCurrentUser(reduxState),
  loading: reduxState.users.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
