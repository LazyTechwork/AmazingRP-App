import {
    APP_VIEW_HIDE,
    APP_VIEW_RESTORE,
    SET_ACCESS_TOKEN,
    SET_ACTIVE_TAB,
    SET_COLOR_SCHEME,
    SET_SCROLL_POSITION,
    SET_SCROLL_POSITION_BY_ID
} from './actionTypes';

export const setColorScheme = (scheme) => (
    {
        type: SET_COLOR_SCHEME,
        payload: scheme
    }
);

export const updateAppViewState = (hidden = false) => (
    {
        type: hidden ? APP_VIEW_HIDE : APP_VIEW_RESTORE
    }
)

export const setAccessToken = (accessToken) => (
    {
        type: SET_ACCESS_TOKEN,
        payload: accessToken
    }
);

export const setActiveTab = (component, tab) => (
    {
        type: SET_ACTIVE_TAB,
        payload: {
            component,
            tab
        }
    }
);

export const setScrollPosition = (component, x = 0, y = 0) => (
    {
        type: SET_SCROLL_POSITION,
        payload: {
            component,
            x,
            y
        }
    }
);

export const setScrollPositionByID = (component) => (
    {
        type: SET_SCROLL_POSITION_BY_ID,
        payload: {
            component
        }
    }
);