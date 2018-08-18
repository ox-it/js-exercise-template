import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import 'font-awesome/css/font-awesome.css';

class UsersButton extends React.Component {
    render() {
        const style={color: "#FFF"}
        let buttons;
        if (window.user && window.user.isAdmin) {
            buttons = <FlatButton onClick={() => this.props.dispatch(push('/users'))} label="Users" labelStyle={style}/>
        } else {
            buttons = null
        }
        return buttons;
    }
}

export default connect()(muiThemeable()(UsersButton))
