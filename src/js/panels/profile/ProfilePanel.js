import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Banner, Button, Panel, PanelHeader} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";

class ProfilePanel extends React.Component {

    state = {
        userinfo: null
    }

    componentDidMount() {
        this.setState({userinfo: this.props.userinfo})
    }

    render() {
        const {id, setPage, setStory} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Профиль</PanelHeader>
                {/*{userinfo && <RichCell
                    disabled
                    multiline
                    text="Игрок проекта"
                    before={<Avatar size={72} src={userinfo.photo_100}/>}
                >
                    {`${userinfo.first_name} ${userinfo.last_name}`}
                </RichCell>}*/}

                <Banner
                    mode="image"
                    size="m"
                    header="GREEN сервер"
                    subheader="Мы рекомендуем"
                    background={
                        <div
                            style={{
                                backgroundColor: '#0ba360',
                                background: 'url(https://amazing-rp.ru/assets/images/index-char-4.png), linear-gradient(-30deg, #3cba92 0%, #0ba360 100%)',
                                backgroundPosition: 'right 10px top 5px, center center',
                                backgroundSize: '150px, contain',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" href="https://amazing-rp.ru/start" target="_blank">Начать
                        игру</Button>}
                />

                <Banner
                    mode="image"
                    size="m"
                    header="Викторины"
                    subheader="&nbsp;"
                    background={
                        <div
                            style={{
                                backgroundColor: '#667eea',
                                background: 'url(https://amazing-rp.ru/assets/images/index-char-3.png), linear-gradient(-30deg, #667eea 0%, #764ba2 100%)',
                                backgroundPosition: 'right 10px top 5px, center center',
                                backgroundSize: '150px, contain',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" onClick={() => {
                        setStory("quiz", "list")
                    }}>Проверить свои знания</Button>}
                />

                <Banner
                    mode="image"
                    size="m"
                    header="Нужна помощь?"
                    subheader="&nbsp;"
                    background={
                        <div
                            style={{
                                backgroundColor: '#d92f2f',
                                background: 'url(https://amazing-rp.ru/assets/images/index-char-5.png), url(https://amazing-rp.ru/assets/images/header-help.jpg)',
                                backgroundPosition: 'right 10px top 5px, center center',
                                backgroundSize: '150px, cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" onClick={() => {
                        setPage("profile", "faq")
                    }}>Напишите нам</Button>}
                />
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

export default connect(null, mapDispatchToProps)(ProfilePanel);
