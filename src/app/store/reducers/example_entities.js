let defaultState = {
    entities: []
}

const example_entities = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_EXAMPLE_ENTITIES':
            return {
                ...state,
                entities: [...action.entities]
            };
        case 'ADD_ENTITY':
            return {
                ...state,
                entities: [...state.entities, action.newEntity]
            }
        case 'DELETE_ENTITY':
            return state;
        case 'EDIT_ENTITY':
            return state;
        default:
            return state;
            break;
    }
}

export default example_entities;