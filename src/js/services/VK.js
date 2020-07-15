import bridge from "@vkontakte/vk-bridge";

import {store} from "../../index";

import {setAccessToken, setColorScheme, updateAppViewState} from "../store/vk/actions";

export const APP_ID = 7528915;
const API_VERSION = '5.92';

export const initApp = () => (dispatch) => {
    const VKConnectCallback = (e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            dispatch(setColorScheme(e.detail.data.scheme));
        } else if (e.detail.type === 'VKWebAppViewHide') {
            dispatch(updateAppViewState(true))
        } else if (e.detail.type === 'VKWebAppViewRestore') {
            dispatch(updateAppViewState(false))
        }
    };

    bridge.subscribe(VKConnectCallback);
    return bridge.send('VKWebAppInit', {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const getAuthToken = (scope) => (dispatch) => {
    bridge.send("VKWebAppGetAuthToken", {
        "app_id": APP_ID,
        "scope": scope.join(',')
    }).then(data => {
        dispatch(setAccessToken(data.access_token));
    }).catch(() => {
        dispatch(setAccessToken(null));
    });
};


export const getAuthTokenManually = (scope) => {
    return bridge.send("VKWebAppGetAuthToken", {
        "app_id": APP_ID,
        "scope": scope.join(',')
    });
};

export const storageSet = (key, value) => {
    return bridge.send("VKWebAppStorageSet", {"key": key, "value": value})
}

export const storageGet = (...keys) => {
    return bridge.send("VKWebAppStorageGet", {"keys": [...keys]});
}

export const closeApp = () => {
    return bridge.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return bridge.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return bridge.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const groupsGet = () => {
    return APICall('groups.get', {
        "extended": "1",
        "fields": "description",
        "count": "100"
    });
};

export const shareOnWall = (params) => {
    return bridge.send("VKWebAppShowWallPostBox", params);
}

export const APICall = (method, params) => {
    params['access_token'] = store.getState().vkui.accessToken;
    params['v'] = params['v'] === undefined ? API_VERSION : params['v'];

    return bridge.send("VKWebAppCallAPIMethod", {
        "method": method,
        "params": params
    }).then(data => {
        return data.response;
    }).catch(error => {
        return error;
    });
};
