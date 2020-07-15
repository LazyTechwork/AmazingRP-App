import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Button, Checkbox, Div, Panel, PanelHeader, Text, Title} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import {storageSet} from "../../services/VK";

class RightsPanel extends React.Component {

    state = {
        accepted: false
    }

    acceptConditions() {
        if (!this.state.accepted)
            return
        storageSet("acceptrights_1", "1").then((data) => {
            console.log(data);
        })
    }

    render() {
        const {id, setStory} = this.props;

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
    setPage,
    setStory,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(null, mapDispatchToProps)(RightsPanel);
