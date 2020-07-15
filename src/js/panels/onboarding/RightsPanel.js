import React from 'react';
import {connect} from 'react-redux';

import {setStory} from '../../store/router/actions';

import {Button, Checkbox, Div, Panel, PanelHeader, Text, Title} from "@vkontakte/vkui"
import {getAuthTokenManually, storageGet, storageSet} from "../../services/VK";
import {setAccessToken} from "../../store/vk/actions";

const actualRightsStorageVar = "acceptrights_1"

class RightsPanel extends React.Component {

    state = {
        accepted: false,
        storageLoaded: false
    }

    componentDidMount() {
        if (localStorage.getItem(actualRightsStorageVar) && localStorage.getItem(actualRightsStorageVar) === '1')
            this.autoGetToken()
        storageGet(actualRightsStorageVar).then((data) => {
            if (data.keys.length !== 0 && data.keys[0].value === '1') {
                localStorage.setItem(actualRightsStorageVar, "1")
                this.autoGetToken()
            } else {
                this.setState({storageLoaded: true})
            }
        })
    }

    autoGetToken() {
        const {setAccessToken, setStory} = this.props;
        getAuthTokenManually([]).then((result) => {
            setAccessToken(result.access_token)
            setStory("home", "base")
        }).catch(() => {
            setAccessToken(null)
        })
    }

    acceptConditions() {
        if (!this.state.accepted)
            return
        const {setAccessToken, setStory} = this.props;
        getAuthTokenManually([]).then((result) => {
            setAccessToken(result.access_token)
            storageSet(actualRightsStorageVar, "1")
            localStorage.setItem(actualRightsStorageVar, "1")

            setStory("home", "base")
        }).catch(() => {
            setAccessToken(null)
        })
    }

    render() {
        const {id} = this.props;

        if (!this.state.storageLoaded)
            return (<Panel id={id}/>)

        return (
            <Panel id={id}>
                <PanelHeader>Первый запуск</PanelHeader>
                <Div>
                    <Title level="1" weight="bold" style={{marginBottom: 16, textAlign: 'center'}}>Привет!</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>Добро пожаловать в приложение по игре &laquo;ГТА
                        Криминальная Россия&raquo;</Text>
                    <Text weight="regular" style={{marginBottom: 16}}>Перед использованием Вам нужно предоставить Общую
                        информацию приложению, чтобы Вы смогли читать комментарии и новости.</Text>
                    <Text weight="regular" style={{marginBottom: 32}}>Это окно будет показываться только один раз, но
                        если нам потребуются дополнительные права - мы покажем её снова.</Text>
                    <Checkbox checked={this.state.accepted} style={{marginBottom: 16}}
                              onChange={(e) => this.setState({accepted: e.target.checked})}>Я согласен предоставить
                        Общую информацию об аккаунте</Checkbox>
                    <div><Button disabled={!this.state.accepted} onClick={() => this.acceptConditions()} stretched>В
                        приложение</Button></div>
                </Div>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setStory, setAccessToken
};

export default connect(null, mapDispatchToProps)(RightsPanel);
