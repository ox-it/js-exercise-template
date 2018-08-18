import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import UsersListItem from './UsersListItem';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onHideDeleteUserDialog}
                />,
            <FlatButton
                label="Delete"
                primary={true}
                keyboardFocused={true}
                onTouchTap={ () => this.props.deleteUser(this.props.userEmailToDelete) }
                />,
        ];
        let listItems = null;
        if (this.props.users.length) {
            listItems = this.props.users.map((user) =>
                <UsersListItem
                    key={user.email}
                    data={user}
                    updateUser={this.props.updateUser}
                    onShowDeleteUserDialog={this.props.onShowDeleteUserDialog}
                />
            )
            
        } else {
            listItems = <TableRow>
                            <TableRowColumn>
                                <CircularProgress
                                    size={40}
                                    style={{
                                        left:-20,
                                        marginLeft: '50%',
                                        marginTop:'10%',
                                    }}
                                    />
                                </TableRowColumn>
                         </TableRow>
        }
        return (
            <div>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        {listItems}
                    </TableBody>
                </Table>
                <Snackbar
                    open={this.props.snackBarOpen}
                    message={this.props.snackBarText}
                    autoHideDuration={4000}
                    onRequestClose={this.props.onHideSnackBar}
                />
                <Dialog
                    title="Delete this User?"
                    actions={actions}
                    modal={false}
                    open={this.props.deleteUserDialogOpen}
                    onRequestClose={this.props.onHideAddUserDialog}
                    >
                    The user {this.props.userEmailToDelete} will be permanently deleted. Delete this user?
                </Dialog>
            </div>
        );
    }
}

export default UsersList;
