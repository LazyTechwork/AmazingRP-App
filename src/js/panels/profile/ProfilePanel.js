import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Avatar, Banner, Button, Panel, PanelHeader, RichCell} from "@vkontakte/vkui"

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
        const userinfo = this.state.userinfo

        return (
            <Panel id={id}>
                <PanelHeader>Профиль</PanelHeader>
                {userinfo && <RichCell
                    disabled
                    multiline
                    text="Игрок проекта"
                    before={<Avatar size={72} src={userinfo.photo_100}/>}
                >
                    {`${userinfo.first_name} ${userinfo.last_name}`}
                </RichCell>}

                <Banner
                    mode="image"
                    size="m"
                    header="GREEN сервер"
                    subheader="Наша личная рекомендация для начала игры!"
                    background={
                        <div
                            style={{
                                backgroundColor: '#2af598',
                                background: 'linear-gradient(-30deg, #2af598 0%, #009efd 100%)',
                                backgroundPosition: 'left bottom',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" onClick={() => {
                        window.open("https://amazing-rp.ru/start")
                    }}>Начать игру</Button>}
                />

                <Banner
                    mode="image"
                    size="m"
                    header="Викторины"
                    subheader="Попробуйте наши викторины на знание игровой вселенной Криминальной России!"
                    background={
                        <div
                            style={{
                                backgroundColor: '#667eea',
                                background: 'linear-gradient(-30deg, #667eea 0%, #764ba2 100%)',
                                backgroundPosition: 'left bottom',
                                backgroundSize: 'cover',
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
                    subheader="Обратитесь к нашей команде поддержки!"
                    background={
                        <div
                            style={{
                                backgroundColor: '#d92f2f',
                                backgroundImage: 'url(https://amazing-rp.ru/assets/images/header-help.jpg)',
                                backgroundPosition: 'left bottom',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" onClick={() => {
                        setPage("profile", "faq")
                    }}>Помогите!</Button>}
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
