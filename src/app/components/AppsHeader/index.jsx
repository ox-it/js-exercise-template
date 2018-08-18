import React from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import LoginButton from './LoginButton';
import UsersButton from './UsersButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

class AppsHeader extends React.Component {
  render() {
    return(
        <AppBar
            iconElementRight={<div><UsersButton/><LoginButton/></div>}
            showMenuIconButton={false}
            title={this.props.title}
        />
    )
  }
}

export default muiThemeable()(AppsHeader);
