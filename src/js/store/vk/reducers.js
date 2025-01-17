import {
    APP_VIEW_HIDE, APP_VIEW_RESTORE,
    SET_ACCESS_TOKEN,
    SET_ACTIVE_TAB, SET_APP_PLATFORM,
    SET_COLOR_SCHEME,
    SET_SCROLL_POSITION,
    SET_SCROLL_POSITION_BY_ID
} from './actionTypes';
import {WEB} from "../../constants/platforms";

const initialState = {
    accessToken: undefined,
    colorScheme: 'client_light',
    isAppOpen: true,
    platform: WEB,

    activeTab: [],
    componentScroll: []
};

export const vkuiReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_COLOR_SCHEME: {
            return {
                ...state,
                colorScheme: action.payload,
            };
        }

        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.payload,
            };
        }

        case SET_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: {
                    ...state.activeTab,
                    [action.payload.component]: action.payload.tab
                },
            };
        }

        case SET_SCROLL_POSITION: {
            return {
                ...state,
                componentScroll: {
                    ...state.componentScroll,
                    [action.payload.component]: {
                        x: action.payload.x,
                        y: action.payload.y
                    }
                },
            };
        }

        case SET_SCROLL_POSITION_BY_ID: {
            let element = document.getElementById(action.payload.component).getElementsByClassName("HorizontalScroll__in")[0];

            let x = element.scrollLeft;
            let y = element.scrollTop;

            return {
                ...state,
                componentScroll: {
                    ...state.componentScroll,
                    [action.payload.component]: {
                        x: x,
                        y: y
                    }
                },
            };
        }

        case APP_VIEW_HIDE: {
            return {
                ...state,
                isAppOpen: false
            }
        }

        case APP_VIEW_RESTORE: {
            return {
                ...state,
                isAppOpen: true
            }
        }

        case SET_APP_PLATFORM: {
            return {
                ...state,
                platform: action.payload
            }
        }

        default: {
            return state;
        }
    }
};