import csrfFetch from './csrf';

export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = (user) => {
    return {
        type: SET_SESSION,
        user
    };
};

export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}

// thunk action creator
export const loginUser = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(setSession(data.user));
    } else {
        throw res;
        // const errorMessage = 'Custom error message goes here';
        // throw new Error(errorMessage);
    }
}

export const logoutUser = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    sessionStorage.setItem('currentUser', null);
    dispatch(removeSession())

}






const sessionReducer = (initialState = { user: null }, action) => {
    Object.freeze(initialState);
    const nextState = { ...initialState };

    switch (action.type) {
        case SET_SESSION:
            return { ...nextState, user: action.user }
        // nextState['user'] = action.user;
        case REMOVE_SESSION:
            return { ...nextState, user: null }
        default:
            return initialState;
    }
}

export default sessionReducer;