let defaultState = [];

const users = (state = defaultState, action) => {
    switch (action.type) {
        case 'POPULATE_USERS':
            return action.users;
            
        case 'ADD_NEW_USER':
            return [ ...state, action.user ];

        case 'DELETE_USER':
            return state.filter(user => user.email !== action.userEmailToDelete);
            
        case 'UPDATE_USER':
            let filteredUsers = state.filter(
                user => user.email !== action.user.email
            );
            return [ ...filteredUsers, action.user ];

        default:
            return state;
            break;
    }
}

export default users;