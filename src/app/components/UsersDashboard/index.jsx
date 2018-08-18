import React from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import AddNewUser from './AddNewUser';
import Snackbar from 'material-ui/Snackbar';

class UsersDashboardController extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {
        this.props.fetchAllUsers();
    };

    render() {
        return (
            <div>
                <UsersList
                    users={this.props.users}
                    deleteUserDialogOpen={this.props.ui.users_ui.deleteUserDialogOpen}
                    userEmailToDelete={this.props.ui.users_ui.userEmailToDelete}
                    onHideDeleteUserDialog={this.props.onHideDeleteUserDialog}
                    onShowDeleteUserDialog={this.props.onShowDeleteUserDialog}
                    deleteUser={this.props.deleteUser}
                    updateUser={this.props.updateUser}
                    snackBarOpen={this.props.ui.global_ui.snackBarOpen}
                    snackBarText={this.props.ui.global_ui.snackBarText}
                    onHideSnackBar={this.props.onHideSnackBar}
                    onShowSnackBar={this.props.onShowSnackBar}
                />
                <AddNewUser
                    showAddUserDialog={this.props.ui.users_ui.showAddUserDialog}
                    onShowAddUserDialog={this.props.onShowAddUserDialog}
                    onHideAddUserDialog={this.props.onHideAddUserDialog}
                    onAddUser={this.props.onAddUser}
                />
                <Snackbar
                    open={this.props.ui.global_ui.snackBarOpen}
                    message={this.props.ui.global_ui.snackBarText}
                    autoHideDuration={4000}
                    onRequestClose={this.props.onHideSnackBar}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        ui: state.ui,
    }
}

const mapDispatchToprops = (dispatch, ownProps) => ({
    onShowSnackBar: (text) => {
        setTimeout(function () {
            dispatch({
                type: 'SHOW_SNACK_BAR',
                text: text,
            })
        }, 100);
    },
    onHideSnackBar: () => {
        setTimeout(function () {
            dispatch({
                type: 'HIDE_SNACK_BAR',
            })
        }, 100);
    },
    onShowAddUserDialog: () => {
        dispatch({
            type: 'SHOW_ADD_USER_DIALOG',
        })
    },
    onHideAddUserDialog: () => {
        dispatch({
            type: 'HIDE_ADD_USER_DIALOG',
        })
    },
    onShowDeleteUserDialog: (userEmailToDelete) => {
        dispatch({
            type: 'SHOW_DELETE_USER_DIALOG',
            userEmailToDelete: userEmailToDelete
        })
    },
    onHideDeleteUserDialog: () => {
        dispatch({
            type: 'HIDE_DELETE_USER_DIALOG',
        })
    },
    fetchAllUsers: () => {
        let url = "api/user/all"
        fetch(url, {
            credentials: 'include'
        })
            .then( (response) => {
                return response.json()
            }).then((json) => {
                if(json.status === 'success') {
                    dispatch({
                        type: 'POPULATE_USERS',
                        users: json.users
                    })
                } else {
                    if(json.error) {
                        dispatch({
                            type: 'SHOW_SNACK_BAR',
                            text: 'Error:' + json.error.message,
                        });
                    }
                }
            }).catch( (ex) => {
                console.log('parsing failed', ex)
            })
    },
    onAddUser: (user) => {
        let url = "/api/user/add";
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user),
            credentials: 'include'
        };

        fetch(url, options)
            .then( (response) => {
                return response.json();
            }).then( (json) => {
                if(json.status === 'success') {
                    dispatch({
                        type: 'ADD_NEW_USER',
                        user: json.user,
                    });
                    dispatch({
                        type: 'SHOW_SNACK_BAR',
                        text: 'User was succesfully added',
                    });
                    dispatch({
                        type: 'HIDE_ADD_USER_DIALOG',
                    });
                } else {
                    if(json.error) {
                        dispatch({
                            type: 'SHOW_SNACK_BAR',
                            text: 'Error:' + json.error.message,
                        });
                    }
                }
            });
    },
    deleteUser: (userEmailToDelete) => {
        let url = "api/user/delete/" + userEmailToDelete;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: 'DELETE',
            headers: headers,
            credentials: 'include'
        }
        fetch(url, options)
            .then( (response) => {
                return response.json();
            })
            .then( (json) => {
                if(json.status === 'success') {
                    dispatch({
                        type: 'DELETE_USER',
                        userEmailToDelete: userEmailToDelete,
                    });
                    dispatch({
                        type: 'SHOW_SNACK_BAR',
                        text: 'User was succesfully deleted',
                    });
                    dispatch({
                        type: 'HIDE_DELETE_USER_DIALOG',
                    });
                } else {
                    if(json.error) {
                        dispatch({
                            type: 'SHOW_SNACK_BAR',
                            text: 'Error:' + json.error.message,
                        });
                    }
                }
            });
    },
    updateUser: (data) => {
        let url = "api/user/update";
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            credentials: 'include'
        }
        
        fetch(url, options)
            .then( (response) => {
                return response.json();
            })
            .then( (json) => {
                if(json.status === 'success') {
                    dispatch({
                        type: 'UPDATE_USER',
                        user: data,
                    });
                    dispatch({
                        type: 'SHOW_SNACK_BAR',
                        text: 'User was succesfully updated',
                    });
                } else {
                    if(json.error) {
                        dispatch({
                            type: 'SHOW_SNACK_BAR',
                            text: 'Error:' + json.error.message,
                        });
                    }
                }
            });
    }
})

export default connect(mapStateToProps, mapDispatchToprops)(UsersDashboardController)