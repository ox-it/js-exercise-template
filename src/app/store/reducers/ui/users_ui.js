let defaultState = {
    showAddUserDialog: false,
    userEmailToDelete: '',
    deleteUserDialogOpen: false,
    
}

const users_ui = (state = defaultState, action) => {
    switch (action.type) {
        case 'SHOW_ADD_USER_DIALOG':
            return {
                ...state,
                showAddUserDialog: true,
            }
            break;
        case 'HIDE_ADD_USER_DIALOG':
            return {
                ...state,
                showAddUserDialog: false,
            }
            break;
        case 'SHOW_DELETE_USER_DIALOG':
            return {
                ...state,
                deleteUserDialogOpen: true,
                userEmailToDelete: action.userEmailToDelete,
            }
            break;
        case 'HIDE_DELETE_USER_DIALOG':
            return {
                ...state,
                deleteUserDialogOpen: false,
            }
            break;

        default:
            return state;
            break;
    }
}

export default users_ui;