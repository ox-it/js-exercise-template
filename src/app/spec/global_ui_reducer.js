const MAX_PHONE_WIDTH = 500;
const MIN_DESKTOP_WIDTH = 1025;

let defaultState = {
    snackBarText: '',
    snackBarOpen: false,
    isPortrait: true,
    isPhone: window.innerWidth <= MAX_PHONE_WIDTH,
    isDesktop: window.innerWidth >= MIN_DESKTOP_WIDTH,
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
        case 'SET_IS_PHONE':
            return {
                ...state,
                isPhone: true
            }
        case 'SET_IS_TABLET':
            return {
                ...state,
                isPhone: false
            }
        case 'SET_OXFORD_DATE':
            return {
                ...state,
                oxfordDate: action.data
            }
        default:
            return state;
            break;
    }
}

export default global_ui;