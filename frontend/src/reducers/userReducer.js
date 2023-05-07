const initialState = {}

export function usersReducer(
    previousState,
    action
) {
    const state = previousState || initialState
    switch (action.type) {
        case '[user] sign-up':
            return {}
        default: 
            return state
    }
}