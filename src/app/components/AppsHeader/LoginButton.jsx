import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import 'font-awesome/css/font-awesome.css';

class LoginButton extends React.Component {
    render() {
        const style={color: "#FFF"}
        let buttons;
        if (window.user) {
            buttons = <FlatButton href={"/logout"} label="Logout" labelStyle={style}/>
        } else {
            buttons = <FlatButton href={"/login"} label="Login" labelStyle={style}/>
        }
        return buttons;
    }
}

export default muiThemeable()(LoginButton);
