import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';


class UsersListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            status: this.props.data.status ? this.props.data.status : 'pending',
            isAdmin: this.props.data.isAdmin,
        }
    };
    
    handleSelect (event, index, value) {
        this.setState({status: value})
    };
    handleCheckbox (event, isInputChecked) {
        this.setState({isAdmin: isInputChecked})
    };
    handleTextbox(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var data = {};
        data[name] = value;
        this.setState(data);
    }
    
    render() {
        let updatedUser = this.props.data;
        updatedUser.status = this.state.status;
        updatedUser.isAdmin = this.state.isAdmin;
        updatedUser.password = this.state.password;
        
        if (window.innerWidth > 800) {
            return (
                <TableRow>
                    <TableRowColumn>{this.props.data.name}</TableRowColumn>
                    <TableRowColumn>{this.props.data.email}</TableRowColumn>
                    <TableRowColumn>
                        <TextField
                            hintText="password"
                            name="password"
                            floatingLabelText="enter new password"
                            value={this.state.password}
                            onChange={this.handleTextbox.bind(this)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <Checkbox
                            label="Admin"
                            checked={this.state.isAdmin}
                            onCheck={this.handleCheckbox.bind(this)}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <SelectField
                            value={this.state.status}
                            onChange={this.handleSelect.bind(this)}
                            floatingLabelText="Status"
                            >
                            <MenuItem value={"pending"} primaryText="Pending" />
                            <MenuItem value={"approved"} primaryText="Approved" />
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            label="Save"
                            primary={true}
                            onTouchTap={ () => this.props.updateUser(updatedUser) }
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            label="Delete"
                            secondary={true}
                            onTouchTap={ () => this.props.onShowDeleteUserDialog(this.props.data.email) }
                        />
                    </TableRowColumn>
                 </TableRow>
            );
        } else {
            return (
                <TableRow>
                    <TableRowColumn style={{padding: 14}}>
                        <div>
                            <span style={{fontSize: 15}}>
                                {this.props.data.name + " "}
                            </span>
                            <span>
                                {this.props.data.email}
                            </span>
                        </div>
                        <div>
                            <TextField
                                hintText="password"
                                name="password"
                                floatingLabelText="Password"
                                value={this.state.password}
                                onChange={this.handleTextbox.bind(this)}
                            />
                            <Checkbox
                                style={{display:"block", float: "left", width: "auto", paddingTop: 15, paddingRight: 10}}
                                iconStyle={{marginRight: 0}}
                                label="Admin"
                                checked={this.state.isAdmin}
                                onCheck={this.handleCheckbox.bind(this)}
                            />
                            <SelectField
                                style={{fontSize: 14, float: "left", width: 120, paddingRight: 0}}
                                value={this.state.status}
                                onChange={this.handleSelect.bind(this)}
                                floatingLabelText=""
                                >
                                <MenuItem value={"pending"} primaryText="Pending" />
                                <MenuItem value={"approved"} primaryText="Approved" />
                            </SelectField>
                            <IconButton
                                style={{display:"block", float: "left", width: "auto", paddingTop: 15}}
                                tooltip="Save"
                                onTouchTap={ () => this.props.updateUser(updatedUser) }
                                >
                                <SaveIcon />
                            </IconButton>
                            <IconButton
                                style={{display:"block", float: "left", width: "auto", paddingTop: 15}}
                                tooltip="Delete"
                                onTouchTap={ () => this.props.onShowDeleteUserDialog(this.props.data.email) }
                                >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </TableRowColumn>
                </TableRow>
            );
        }
    }
}

export default UsersListItem;
