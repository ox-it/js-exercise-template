import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password: '', email: ''};
    }
    
    componentWillReceiveProps(nextProps) {
        // if showing a new add-user dialog reset text fields
        if (nextProps.showAddUserDialog && !this.props.showAddUserDialog) {
            this.state = {name: '', password: '', email: ''};
        }
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var data = {};
        data[name] = value;
        this.setState(data);
    }

    onAddUser() {
        this.props.onAddUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        })
    }
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onHideAddUserDialog}
                />,
            <FlatButton
                label="Add user"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onAddUser.bind(this)}
                />,
        ];
        return (
            <div>
                <RaisedButton
                    label="Add new user"
                    onTouchTap={this.props.onShowAddUserDialog}
                    style={{margin: '10px 20px'}}
                />
                <Dialog
                  title="New user"
                  actions={actions}
                  modal={false}
                  open={this.props.showAddUserDialog}
                  onRequestClose={this.props.onHideAddUserDialog}
                  >
                  <TextField
                      hintText="name"
                      name="name"
                      floatingLabelText="Name"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                      hintText="email"
                      name="email"
                      floatingLabelText="Email"
                      value={this.state.email}
                      onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                      hintText="password"
                      name="password"
                      floatingLabelText="Password"
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                  />
                </Dialog>
            </div>
        )
    }
}

export default AddNewUser;
