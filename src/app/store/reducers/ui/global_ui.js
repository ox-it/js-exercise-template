let defaultState = {
    snackBarText: '',
    snackBarOpen: false,
}

const global_ui = (state = defaultState, action) => {
    switch (action.type) {
        case 'SHOW_SNACK_BAR':
            return {
                ...state,
                snackBarOpen: true,
                snackBarText: action.text,
            }
            break;
        case 'HIDE_SNACK_BAR':
            return {
                ...state,
                snackBarOpen: false,
            }
            break;

        default:
            return state;
            break;
    }
}

export default global_ui;