import {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header.jsx';
import Sidebar from './sidebar.jsx';
import {connectSocket, disconnectSocket, getUserInfo} from 'actions';
import {withRouter} from 'react-router';


class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.accessToken) this.props.router.push('/login');
    else this.props.connectSocket('authorized');
  }
  componentWillUnmount() {
    this.props.disconnectSocket('authorized');
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.accessToken) this.props.router.push('/login');
    if (Object.keys(nextProps.user).length === 0 && nextProps.authorizedSocket) this.props.getUserInfo();
  }
  render() {
    return <div id='dashboard'>
      <Header />
      <Grid fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

export default connect(
  ({authorization: {accessToken}, sockets: {authorized: authorizedSocket}, user}) => ({accessToken, authorizedSocket, user}),
  {connectSocket, disconnectSocket, getUserInfo}
)(withRouter(Dashboard));
